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
let isShiftKeyPressed = false
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
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
    this.onTextAreaClick = this.onTextAreaClick.bind(this)
  }

  static propTypes = {
    note: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number,
    marginTopArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        marginTop: PropTypes.number,
      })
    ),
    addSentence: PropTypes.func,
    delSentence: PropTypes.func,
    updateNote: PropTypes.func,
    finishNewFile: PropTypes.func,
  }

  onKeyUp (event){
    if (event.keyCode == 16){
      isShiftKeyPressed = false
    }
    if (browserType == 'ie' && isNewLine) {
      this.inputText.htmlEl.innerHTML = this.inputText.htmlEl.innerHTML + ' '
      isNewLine = false
    }
    keyPressed = false
    /* IEの場合、ohChang()コールされないため、ここで高さ変化を検知 */
    this.setState({textAreaHeight: this.inputText.htmlEl.offsetHeight})
    console.log('onKeyUp html: %s', this.inputText.htmlEl.innerHTML)
  }

  onKeyDown (event){
    console.log('onKeyDown html: %s', this.inputText.htmlEl.innerHTML)
      if (event.keyCode == 16){
        isShiftKeyPressed = true
      }
      if (event.keyCode == 13){
        if (isShiftKeyPressed != true){
          event.preventDefault()
        }
        else{
          isNewLine = true
        }
      }

      if (event.keyCode != 13){
        if (!keyPressed) {
          keyPressed = true
        }
        else {
          console.log('long press')
          if (!(String.fromCharCode(event.keyCode)).match(/^[a-zA-Z0-9]+$/)) {
            event.preventDefault()
            alert('Do not long press!')
          }
          keyPressed = false
        }
    }
  }

  onTextAreaChange (event){
    console.log('onTextAreaChange html: %s', this.inputText.htmlEl.innerHTML)
    this.setState({textAreaHeight: this.inputText.htmlEl.offsetHeight})
    this.props.updateNote(this.inputText.htmlEl.innerHTML)
  }

  onTextAreaClick (){
    this.inputText.htmlEl.focus()
  }

  componentWillUpdate (){
    const newHeight = this.inputText.htmlEl.offsetHeight
    const oldHeight = this.state.textAreaHeight

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

    const { marginTopArray, note, id } = this.props

    const senList = marginTopArray.map((obj, i) => {
      return <FourLine key={i} marginTop={this.props.marginTopArray[i].marginTop} />
    })

    return (

      <div style={{ width: '95%', display: 'flex'}}>
        <DivSen>
          {senList}
          <TextArea
            html={note[id].html}
            spellCheck={false}
            style={{imeMode: this.state.imeMode}}
            innerRef={(ref) => {this.inputText = ref}}
            onChange={this.onTextAreaChange}
            onClick={this.onTextAreaClick}
            onKeyUp={this.onKeyUp}
            onKeyDown={this.onKeyDown}
          />
        </DivSen>
      </div>
    )
  }
}

export default Sentence