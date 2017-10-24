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
    this.setBold = this.setBold.bind(this)
    this.setColor = this.setColor.bind(this)
    this.setItalic = this.setItalic.bind(this)
    this.setUnderline =  this.setUnderline.bind(this)
  }
  static propTypes = {
    id: PropTypes.number,
    curSegmentNo: PropTypes.number,
    width: PropTypes.number,
    isPrint: PropTypes.bool,
    segContent: PropTypes.object,
    setCurSegment: PropTypes.func,
    setCurComponent: PropTypes.func,
    setting: PropTypes.object,
    updateHtml: PropTypes.func,
    updateJaHtml: PropTypes.func,
    addSegment: PropTypes.func,
    tabNodeList: PropTypes.array,
    addTabNode: PropTypes.func,
    delTabNode: PropTypes.func,
    updateTabNode: PropTypes.func,
  }

  setBold (){
    this.sentences.setBold()
  }
  setColor (color){
    this.sentences.setColor(color)
  }
  setItalic (){
    this.sentences.setItalic()
  }
  setUnderline (){
    this.sentences.setUnderline()
  }
  setCurSegment (){
    this.props.setCurSegment(this.props.id)
  }

  render (){
    const {id, segContent, width, setting, isPrint, curSegmentNo, tabNodeList, setCurComponent,
      updateHtml, updateJaHtml, addSegment, addTabNode, delTabNode, updateTabNode, setCurSegment} = this.props
    return (
      <SentenceArea
        innerRef={ref => this.sentencearea = ref}
        width={width}
        onClick={this.setCurSegment} >
        <LabNum setting={setting} id={id} />
        <Sentences
          ref={ref => this.sentences = ref}
          curSegmentNo={curSegmentNo}
          isPrint={isPrint}
          id={id}
          senWidth={width - 50}
          segContent={segContent}
          setting={setting}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          addSegment={addSegment}
          addTabNode={addTabNode}
          delTabNode={delTabNode}
          updateTabNode={updateTabNode}
          setCurSegment={setCurSegment}
          setCurComponent={setCurComponent}
          tabNodeList={tabNodeList} />
      </SentenceArea>
    )
  }
}

export default TxtOnlySeg
