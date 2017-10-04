import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'

import {getBrowserType} from '../../utils/browserType'

import FourLine from './FourLine'
const browserType = getBrowserType()

const TextArea = styled(ContentEditable)`
  margin: 0 0 0 1px;
  width: 85%;
  border: none;
  outline-style: none;
  white-space: pre-line;
  word-wrap: break-word;
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  z-index: 9;
  position: absolute;
  top:0;
  left:0;
`

const DivSen = styled.div`
  width: 100%;
  z-index: 0;
  display: block;
  position: relative;
`

class Sentence extends Component{
  constructor (props){
    super(props)
    this.state = {
      imeMode: 'inactive',
      textAreaHeight: 0,
    }
  }

  static propTypes = {
    segContent: PropTypes.object,
    id: PropTypes.number,
    offsetHeight: PropTypes.number,
    addSentence: PropTypes.func,
    delSentence: PropTypes.func,
    updateHtml: PropTypes.func,
  }

  componentDidMount (){

/*    if (browserType == 'ie'){
      this.inputText.htmlEl.style.backgroundImage = `url(${require('../../resources/img/4line_ie.png')})`    
    }
    else{
      this.inputText.htmlEl.style.backgroundImage = `url(${require('../../resources/img/4line.png')})` 
    }*/
  }
  render (){
    const { segContent } = this.props
    let height = 0
    console.log('height : %d', segContent.offsetHeight)
    if (browserType == 'ie'){
      height = segContent.offsetHeight / 96
    }
    else{
      height = segContent.offsetHeight / 96
    }
    let i = 0
    let marginTopArray = []
    for (i=0;i<height;i++){
      marginTopArray.push(0)
    }
    let senList = null
    if (marginTopArray){
      senList = marginTopArray.map((obj, i) => {
        return <FourLine key={i} marginTop={marginTopArray[i].marginTop} />
      })
    }

    return (
      <div style={{display: 'flex'}}>
      <DivSen>
        <div ref={ref => this.senList = ref}>{senList}</div>
        <TextArea
            html={segContent.html}
            spellCheck={false}
            style={{imeMode: this.state.imeMode}}
            innerRef={(ref) => {this.inputText = ref}}
            fontFamily={browserType == 'ie' ? 'MyFamilyIE' : 'MyFamilyCHROME'}
            fontSize={browserType == 'ie' ? '96px': '80px'}
          />
        </DivSen>
        </div>
    )
  }
}

export default Sentence