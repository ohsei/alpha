import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'
import FileSaver from 'file-saver'

import {getBrowserType} from '../../utils/browserType'

import FourLine from './FourLine'
const browserType = getBrowserType()

const TextArea = styled(ContentEditable)`
  margin: 0 0 1px 1px;
  width: 85%;
  border: none;
  outline-style: none;
  white-space: pre-line;
  word-wrap: break-word;
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  position: relative;
  z-index: 9;

`
const DivSen = styled.div`
  width: 100%;
  height: auto;
  z-index: 0;
  display: block;
  position: relative;
`
let keyPressed = false
let isKey229 = false
let isShiftKeyPressed = false
let isCtrlKeyPressed = false
let isNewLine = false



class Sentence extends Component{
  constructor (props){
    super(props)
    this.state = {
      imeMode: 'inactive',
    }
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
    this.onTextAreaBlur = this.onTextAreaBlur.bind(this)
    this.onTextAreaClick = this.onTextAreaClick.bind(this)
    this.onPaste = this.onPaste.bind(this)
    this.focus = this.focus.bind(this)
  }

  static propTypes = {
    segContent: PropTypes.object,
    curSegmentNo: PropTypes.number,
    id: PropTypes.number,
    isPrint: PropTypes.bool,
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
        isNewLine = false
      }
    }
    updateHtml(
    {
      html: this.inputText.htmlEl.innerHTML,
      offsetHeight: this.inputText.htmlEl.offsetHeight,
    })
  }

  focus (){
    this.inputText.htmlEl.focus()
  }
  onKeyDown (event){

    if (event.ctrlKey){
      isCtrlKeyPressed = true
    }

    if (event.keyCode == 16){
      isShiftKeyPressed = true
    }

    if (browserType == 'ie'){
      if (event.keyCode == 13){
        if (isShiftKeyPressed == true){
          isNewLine = true
        }
        else {
          event.preventDefault()
        }
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

  onTextAreaBlur (){
    console.log('onTextAreaBlur',this.inputText.htmlEl.innerHTML)
    if (this.inputText.htmlEl.innerHTML.match(/[^\x01-\x7E]/)){
      alert('英字のみでお願いいします。')
      let i = 0
      let newText = ''
      while (i < this.inputText.htmlEl.innerText.length){
        if (this.inputText.htmlEl.innerText[i].match(/[^\x01-\x7E]/)){
          newText = newText + ''
        }
        else {
          newText = newText + this.inputText.htmlEl.innerText[i]
        }
        i ++
      }
      this.inputText.htmlEl.innerText = newText
    }
  }

  onTextAreaChange (){
    const {updateHtml} = this.props

    updateHtml(
      {
        html: this.inputText.htmlEl.innerHTML,  
        offsetHeight: this.inputText.htmlEl.offsetHeight,
      })
  }

  onTextAreaClick (){
    
  }

  componentDidMount (){
    if (browserType == 'ie'){
      this.inputText.htmlEl.style.backgroundImage = `url(${require('../../resources/img/4line_ie.png')})`    
    }
    else{
      this.inputText.htmlEl.style.backgroundImage = `url(${require('../../resources/img/4line.png')})` 
    }
  }

  render (){

    const { segContent } = this.props

    return (

        <DivSen>
           <TextArea
            html={segContent.html}
            spellCheck={false}
            style={{imeMode: this.state.imeMode}}
            innerRef={(ref) => {this.inputText = ref}}
            onChange={this.onTextAreaChange}
            onBlur={this.onTextAreaBlur}
            onClick={this.onTextAreaClick}
            onKeyUp={this.onKeyUp}
            onKeyDown={this.onKeyDown}
            onPaste={this.onPaste}
            fontFamily={browserType == 'ie' ? 'MyFamilyIE' : 'MyFamilyCHROME'}
            fontSize={browserType == 'ie' ? '96px': '80px'}
          />
        </DivSen>
    )
  }
}

export default Sentence