import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'

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
let pressed = false

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
  }

  onKeyUp (){
    pressed = false
  }
  onKeyDown (){
    if (!pressed){
      pressed = true
    }
    else {
      alert('Do not long press!')

      pressed = false
    }
  }
  onTextAreaChange (){
    const newHeight = this.inputText.htmlEl.offsetHeight
    this.setState({textAreaHeight: newHeight})
    this.props.updateNote(this.inputText.htmlEl.innerHTML)
  }
  onTextAreaClick (){
    this.inputText.htmlEl.focus()
    const height = this.inputText.htmlEl.offsetHeight
    this.setState({textAreaHeight: height})
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
            onKeyPress={this.onKeyPress}
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