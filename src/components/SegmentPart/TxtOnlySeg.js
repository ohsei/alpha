import React, {Component} from 'react'
import styled from 'styled-components'

import Sentences from '../SentencePart/Sentences'

import LabNum from './LabNum'


const SentenceArea = styled.div`
  display: flex;
  width: 100%;
`

class TxtOnlySeg extends Component{

  render (){
    return (
      <SentenceArea
        onClick={this.setCurSegment} >
        <LabNum {...this.props} />
        <Sentences {...this.props} />
      </SentenceArea>
    )
  }
}

export default TxtOnlySeg
