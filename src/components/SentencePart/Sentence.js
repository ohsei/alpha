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
    this.getSenList = this.getSenList.bind(this)
  }


  onTextAreaChange (){
    const height = this.inputText.htmlEl.offsetHeight
    this.setState({textAreaHeight: height})
  }
  onTextAreaClick (){
    this.inputText.htmlEl.focus()
  }

  componentWillUpdate (nextProps, nextState){
    const {sentenceNum} = this.props
    const height = this.state.textAreaHeight
    let marginTopArray = this.props.marginTopArray
    console.log('height',height)
    console.log('nextState.textAreaHeight',nextState.textAreaHeight)
    console.log('this.inputText.htmlEl.innerHTML',this.inputText.htmlEl.innerHTML)

    if (height > 0 && nextState.textAreaHeight > height ){
      id++
      const marginTop = 96.875 - (nextState.textAreaHeight - height)
      marginTopArray.push({
        id: id,
        marginTop: -marginTop
      })
      this.props.setSentenceNum(sentenceNum + 1)
      this.props.setMarginTopArray(marginTopArray)
    }
    else if (nextState.textAreaHeight < height){
      id--
      marginTopArray.pop()
      this.props.setSentenceNum(sentenceNum - 1)
      this.props.setMarginTopArray(marginTopArray)
    }


  }

  static propTypes = {
    sentenceNum: PropTypes.number,
    marginTopArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        marginTop: PropTypes.number,
      })
    ),
    setSentenceNum: PropTypes.func,
    setMarginTopArray: PropTypes.func,
  }

  getSenList (){
    let tmpSenList = []

    for (let i = 0;i <= this.props.sentenceNum;i++){
      if (i == 0){
        tmpSenList.push(
          <DivSen key={i}>
            <DivSen2>
              <DivLineTwo borderColor='gray' />
              <DivLine borderColor='gray' />
              <DivLine borderColor='orange' />
              <DivLineTwo borderColor='gray' />
              <TextArea
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
        tmpSenList.push(<FourLine key={i} marginTop={this.props.marginTopArray[i].marginTop} />)
      }
    }

    return tmpSenList
  }

  render (){

    const senList = this.getSenList()

    return (

      <div style={{ width: '95%'}} innerRef={(ref) => {this.sentenceArea = ref}}>
        {senList}
      </div>
    )
  }
}

export default Sentence