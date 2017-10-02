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
  position: relative;
  z-index: 9;
  background-repeadt: repeat-x;
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
            fontFamily={browserType == 'ie' ? 'MyFamilyIE' : 'MyFamilyCHROME'}
            fontSize={browserType == 'ie' ? '96px': '80px'}
          />
        </DivSen>
    )
  }
}

export default Sentence