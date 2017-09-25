import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Sentences from '../SentencePart/Sentences'

import Actions from './Actions'
import LabNum from './LabNum'

const SegArea = styled.div`
  width: ${props => props.width};
  background-color: white;
  border: 2px solid orange;
`
const SentenceArea = styled.div`
  display: flex;
  width: 100%;
`
const DivInterval = styled.div`
  height: ${props => props.interval};
  background-color: lightgreen;
`

class Segment extends Component{
  constructor (props){
    super(props)
    this.state = {
      imeMode: 'inactive'
    }
    this.setCurSegment = this.setCurSegment.bind(this)
  }
  static propTypes = {
    id: PropTypes.number,
    width: PropTypes.string,
    setting: PropTypes.object,
    note: PropTypes.object,
    addSegment: PropTypes.func,
    setCurSegment: PropTypes.func,
    setMarginTopArray: PropTypes.func,
  }

  setCurSegment (){
    this.props.setCurSegment(this.props.id)
  }
  render (){

    return (
      <div>
        <SegArea width={this.props.width}>
          <SentenceArea
            onClick={this.setCurSegment} >
            <LabNum {...this.props} />
            <Sentences {...this.props} />
          </SentenceArea>
          <Actions
            addSegment={this.props.addSegment}
            id={this.props.id}
            {...this.props}
            type={'txtOnly'} />
        </SegArea>
        <DivInterval interval={this.props.setting.interval} />
      </div>
    )
  }
}

export default Segment