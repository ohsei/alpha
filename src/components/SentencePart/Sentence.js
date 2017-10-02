import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'

import {getBrowserType} from '../../utils/browserType'

import FourLine from './FourLine'

const TextArea = styled(ContentEditable)`
  margin: 0 0 0 1px;
  width: 85%;
  font-size: 24px;
  border: none;
  outline-style: none;
  white-space: pre-line;
  word-wrap: break-word;
  font-family: 'MyFamilyCHROME';
  font-size: 80px;
  position: absolute;
  top:0;
  left:0;
  z-index: 9;
`
const DivSen = styled.div`
  width: 100%;
  z-index: 0;
  display: block;
  position: relative;
`
let keyPressed = false
let isKey229 = false
let isShiftKeyPressed = false
let isCtrlKeyPressed = false
let isNewLine = false

const browserType = getBrowserType()

class Sentence extends Component{
  constructor (props){
    super(props)
    this.state = {
      imeMode: 'inactive',
      textAreaHeight: 0,
    }
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
    this.onTextAreaClick = this.onTextAreaClick.bind(this)
    this.onPaste = this.onPaste.bind(this)
  }

  static propTypes = {
    segContent: PropTypes.object,
    curSegmentNo: PropTypes.number,
    id: PropTypes.number,
    isPrint: PropTypes.bool,
    offsetHeight: PropTypes.number,
    addSentence: PropTypes.func,
    delSentence: PropTypes.func,
    updateHtml: PropTypes.func,
    addSegment: PropTypes.func,
  }

  onKeyUp (event){
    const {updateHtml} = this.props

    if (event.keyCode == 16){
      isShiftKeyPressed = false
    }

    if (browserType == 'ie' ){
      if (isNewLine) {
        // this.inputText.htmlEl.innerHTML = this.inputText.htmlEl.innerHTML + ' '
        isNewLine = false
      }
    }
    keyPressed = false
    /* IEの場合、ohChang()コールされないため、ここで高さ変化を検知 */
    //this.setState({textAreaHeight: this.inputText.htmlEl.offsetHeight})

    updateHtml(
      {
        html: this.inputText.htmlEl.innerHTML,
        offsetHeight: this.inputText.htmlEl.offsetHeight
      })
  }

  onKeyPress (event){

  }
  onKeyDown (event){
    console.log('down ', event.keyCode)
    console.log('html', this.inputText.htmlEl.innerHTML)

    if (event.keyCode == 229){
      isKey229 = true
    }

    if (event.ctrlKey){
      isCtrlKeyPressed = true
    }

    if (event.keyCode == 16){
      isShiftKeyPressed = true
    }

    if (event.keyCode == 13){
      if (isShiftKeyPressed == true){
        isNewLine = true
      }
      else {
        event.preventDefault()
      }
    }

    if (event.keyCode != 13){
      if (!keyPressed) {
        keyPressed = true
      }
      else {
        if (!isKey229 && !(String.fromCharCode(event.keyCode)).match(/^[a-zA-Z0-9]+$/)) {
          event.preventDefault()
          alert('Do not long press!')
          isKey229 = false
        }
        keyPressed = false
      }
    }
  }

  onPaste (e){
    e.preventDefault()
    var text

    if (window.clipboardData) {
      text = window.clipboardData.getData('text')
    } else {
      text = e.clipboardData.getData('text/plain')
    }

    if (document.selection) {
      // 〜Internet Explorer 10
      var range = document.selection.createRange()
      range.text = text
    } else {
      // Internet Explorer 11/Chrome/Firefox
      var selection = window.getSelection()
      var range = selection.getRangeAt(0)
      var node = document.createTextNode(text)
      range.insertNode(node)
      range.setStartAfter(node)
      range.setEndAfter(node)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  onTextAreaChange (){
    const {updateHtml} = this.props

    if (this.inputText.htmlEl.innerHTML.match(/[^\x01-\x7E]/)){
      this.inputText.htmlEl.focus()
      this.inputText.htmlEl.innerHTML = this.inputText.htmlEl.innerHTML.replace(/[^\x01-\x7E]/, ' ')
      var selection = window.getSelection()
      var range = document.createRange()
      range.setStart(this.inputText.htmlEl.firstChild, this.inputText.htmlEl.innerText.length)
      range.collapse(true)
      selection.removeAllRanges()
      selection.addRange(range)
    }

    updateHtml(
      {
        html: this.inputText.htmlEl.innerHTML,
        offsetHeight: this.inputText.htmlEl.offsetHeight
      })

  }

  onTextAreaClick (){
    this.inputText.htmlEl.focus()
  }

  componentWillReceiveProps (){
    const offsetHeight = this.inputText.htmlEl.offsetHeight
    this.setState({textAreaHeight: offsetHeight})
  }

  componentWillUpdate (nextProps){
    const newHeight = this.inputText.htmlEl.offsetHeight
    const oldHeight = this.state.textAreaHeight

    if (nextProps.isPrint ) return

    if (oldHeight > 0 && newHeight > oldHeight) {

      const marginTop = 0//96.875 - newHeight - oldHeight
      const pushObj = {
        marginTop: -marginTop
      }
      this.props.addSentence(pushObj)
    }
    else if (newHeight < oldHeight){
      this.props.delSentence()
    }
  }

  render (){

    const { segContent } = this.props
    const senList = segContent.marginTopArray.map((obj, i) => {
      return <FourLine key={i} marginTop={segContent.marginTopArray[i].marginTop} />
    })

    return (

      <div style={{ width: '95%', display: 'flex'}}>
        <DivSen>
          <div ref={ref => this.senList = ref}>{senList}</div>
          <TextArea
            html={segContent.html}
            spellCheck={false}
            style={{imeMode: this.state.imeMode}}
            innerRef={(ref) => {this.inputText = ref}}
            onChange={this.onTextAreaChange}
            onClick={this.onTextAreaClick}
            onKeyUp={this.onKeyUp}
            onKeyDown={this.onKeyDown}
            onKeyPress={this.onKeyPress}
            onPaste={this.onPaste}
          />
        </DivSen>
      </div>
    )
  }
}

export default Sentence