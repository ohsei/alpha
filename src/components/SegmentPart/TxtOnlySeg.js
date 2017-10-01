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
    curSegmentNo: PropTypes.number,
    width: PropTypes.number,
    isPrint: PropTypes.bool,
    segContent: PropTypes.object,
    setCurSegment: PropTypes.func,
    setting: PropTypes.object,
    updateHtml: PropTypes.func,
    updateJaHtml: PropTypes.func,
    addSentence: PropTypes.func,
    delSentence: PropTypes.func,
    addSegment: PropTypes.func,
  }

  setCurSegment (){
    this.props.setCurSegment(this.props.id)
  }
  render (){
    const {id, segContent, width, setting, isPrint, curSegmentNo,
      updateHtml, updateJaHtml, addSentence, delSentence, addSegment} = this.props
    return (
      <SentenceArea
        width={width}
        onClick={this.setCurSegment} >
        <LabNum setting={setting} id={id} />
        <Sentences
          curSegmentNo={curSegmentNo}
          isPrint={isPrint}
          id={id}
          senWidth={width - 50}
          segContent={segContent}
          setting={setting}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          addSentence={addSentence}
          delSentence={delSentence}
          addSegment={addSegment} />
      </SentenceArea>
    )
  }
}

export default TxtOnlySeg
