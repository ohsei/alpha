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
  position:absolute;
  top:0;
  left:0;
`
const DivSen = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
const DivSen2 = styled.div`
  width: 100%;
  z-index: 0;
  display: block;
  position: relative;
`
const DivLine = styled.div`
  width: 100%;
  display: flex;
  margin: 22px 0 0 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.borderColor}
`
const DivLineTwo = styled.div`
  width: 100%;
  display: flex;
  margin: 22px 0 0 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.lineNum == 2 ? 'white' : props.borderColor};
`

let id = 0

class Sentence extends Component{
  constructor (props){
    super(props)
    this.state = {
      imeMode: 'inactive',
      textAreaHeight: 0,
    }
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
    this.onTextAreaClick = this.onTextAreaClick.bind(this)
  }

  static propTypes = {
    sentenceNum: PropTypes.number,
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

  onTextAreaChange (){
    const height = this.inputText.htmlEl.offsetHeight
    this.setState({textAreaHeight: height})
    this.props.updateNote(this.inputText.htmlEl.innerHTML)
  }
  onTextAreaClick (){
    this.inputText.htmlEl.focus()
  }

  componentWillUpdate (nextProps, nextState){
    const {sentenceNum} = this.props

    const height = this.state.textAreaHeight

    if (height > 0 && nextState.textAreaHeight > height ){
      id++
      const marginTop = 96.875 - (nextState.textAreaHeight - height)
      const pushObj = {
        id: id,
        marginTop: -marginTop
      }

      this.props.addSentence(sentenceNum + 1, pushObj)
    }
    else if (nextState.textAreaHeight < height){
      id--
      this.props.delSentence(sentenceNum - 1)
    }
  }

  render (){

    const { marginTopArray, note, id } = this.props
    const senList = marginTopArray.map((obj, i) => {
      if (i == 0){
        return (
          <DivSen key={i}>
            <DivSen2>
              <DivLineTwo borderColor='gray' />
              <DivLine borderColor='gray' />
              <DivLine borderColor='orange' />
              <DivLineTwo borderColor='gray' />
              <TextArea
                html={note[id].html}
                spellCheck={false}
                style={{imeMode: this.state.imeMode}}
                innerRef={(ref) => {this.inputText = ref}}
                onChange={this.onTextAreaChange}
                onClick={this.onTextAreaClick}
              />
            </DivSen2>
          </DivSen>
        )
      }
      else {
        return <FourLine key={i} marginTop={this.props.marginTopArray[i].marginTop} />
      }
    })


    return (

      <div style={{ width: '95%'}}>
        {senList}
      </div>
    )
  }
}

export default Sentence