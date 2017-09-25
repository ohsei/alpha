import React, {Component} from 'react'
import PropTypes from 'prop-types'

import styled, { injectGlobal } from 'styled-components'
import {getBrowserType} from '../../utils/browserType'
import Flines_block_Regular_chrome from '../../resources/font/4lines_block-Regular.otf'
import Flines_block_Regular_ie from '../../resources/font/4lines_block-regular-webfont.eot'

injectGlobal`
  @font-face {
     font-family: 'MyFamilyIE';
     src: url('${Flines_block_Regular_ie}');
  }
  @font-face {
    font-family: 'MyFamilyCHROME';
    src: url('${Flines_block_Regular_chrome}');
 }
`
const PreWord = styled.pre`
  font-family: ${props => props.browserType == 'chrome' ? 'MyFamilyCHROME' : 'MyFamilyIE'} ;
  font-size: ${props => props.fontSize};
  margin:0px 0px 0px 0px ;
  text-align:${props => props.textAlign};
  color:${props => props.color};
  font-weight:${props=>props.fontWeight};
  font-style:${props=>props.fontStyle};
  text-decoration:${props=>props.textDecoration};
`

const DivOutput = styled.div`
  top:0;
  left:0;
  display:flex;
  flex-direction:row;
  -ms-flex-direction:row;
  position:absolute;
  height:100px
`

class Words extends Component{
  constructor (props){
    super(props)
    this.state ={
      browserType: 'IE'
    }
  }

  componentDidMount (){
    this.setState({browserType: getBrowserType()})
  }

  render (){
    let value = this.props.content
    let enSize = this.props.fontSize
    let content = []
    this.word = []
    for (let i = 0;i < value.length;i++){
      if (value[i].content != '\n'){
        content.push(
          <PreWord
            browserType={this.state.browserType}
            key={i}
            innerRef={(ref) => this.word[i] = ref}
            color={value[i].color}
            textDecoration={value[i].textDecoration}
            fontWeight={value[i].fontWeight}
            fontStyle={value[i].fontStyle}
            fontSize={enSize}>
            {value[i].content}
          </PreWord>)
      }
    }
    return(
      <DivOutput>{content}</DivOutput>
    )
  }
}

Words.propTypes = {
  content: PropTypes.any,
  fontSize: PropTypes.any,
}

export default Words
