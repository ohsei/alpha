import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Sentences from '../SentencePart/Sentences'

import LabNum from './LabNum'


const SentenceArea = styled.div`
  display: flex;
  width: ${props => `${props.width}px`};
`

class TxtOnlySeg extends Component{
  constructor (props){
    super(props)
    this.setCurSegment = this.setCurSegment.bind(this)
  }
  static propTypes = {
    id: PropTypes.number,
    setCurSegment: PropTypes.func,
  }

  setCurSegment (){
    this.props.setCurSegment(this.props.id)
  }
  render (){
     return (
      <SentenceArea
        width={this.props.width}
        onClick={this.setCurSegment} >
        <LabNum {...this.props} />
        <Sentences
          senWidth={this.props.width-50}
          note={this.props.note}
          {...this.props} />
      </SentenceArea>
    )
  }
}

export default TxtOnlySeg
