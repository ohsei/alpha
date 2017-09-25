import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Sentences from '../Sentence/Sentences'
import styled from 'styled-components'

/* defin layout start */
const DivSens = styled.div`
  width: 100%;
`
const JaTextBorder = styled.div`
  margin: 3px;
  border: none;
`
const PreJan = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: auto;
  font-size: ${props=>props.fontSize};
`
/* define layout end */

class SegWithJan extends Component{
  constructor (props){
    super(props)
    this.getHeight = this.getHeight.bind(this)
  }

  getHeight (){
    if (this.divPreJan) {
      return this.sentences.getHeight() + this.divPreJan.offsetHeight
    }
    else {
      return this.sentences.getHeight()
    }
  }

  render (){
    if (this.props.jaSentence != '' && this.props.setting.jaPos == 'up'){
      return (
        <DivSens>
          <JaTextBorder borderColor={this.props.setting.lineColor}>
            <PreJan 
              innerRef={(ref) => this.divPreJan = ref}
              fontSize={this.props.setting.upJaSize}>
              {this.props.jaSentence}
            </PreJan>
          </JaTextBorder>
          <Sentences
            content={this.props.content}
            ref={(ref) => {this.sentences = ref}}
            setting={this.props.setting}
          />
        </DivSens>
      )
    }else if (this.props.jaSentence != '' && this.props.setting.jaPos == 'down'){
      return (
        <DivSens innerRef={(ref) => this.divSens = ref}>
          <Sentences
            content={this.props.content}
            ref={(ref) => {this.sentences = ref}}
            setting={this.props.setting}
          />
          <PreJan
            innerRef={(ref) => this.divPreJan = ref}
            fontSize={this.props.setting.upJaSize}
            borderColor={this.props.setting.lineColor}>
            {this.props.jaSentence}
          </PreJan>
        </DivSens>
      )
    }
    else{
      return (
        <DivSens innerRef={(ref) => this.divSens = ref}>
          <Sentences
            content={this.props.content}
            ref={(ref) => {this.sentences = ref}}
            setting={this.props.setting}
          />
        </DivSens>
      )
    }
  }
}

SegWithJan.propTypes = {
  content: PropTypes.any,
  jaSentence: PropTypes.any,
  setting: PropTypes.any,
}

export default SegWithJan