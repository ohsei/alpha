import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


import Sentences from '../SentencePart/Sentences'

import LabNum from './LabNum'
import Canvas from './Canvas'


const SentenceArea = styled.div`
  display: flex;
  width: 100%;
`

const DivCanvas = styled.div`
  width: ${props => `${props.width}px`};
  display: flex;
  direction: row;
  justify-content: space-around;
  margin: 0px auto;
`

class TxtImgSeg extends Component{
  constructor (props){
    super(props)

    this.setCurSegment = this.setCurSegment.bind(this)
    this.setBold = this.setBold.bind(this)
    this.setColor = this.setColor.bind(this)
    this.setItalic = this.setItalic.bind(this)
    this.setUnderline =  this.setUnderline.bind(this)
  }
  setCurSegment (){
    this.props.setCurSegment(this.props.id)
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

  render (){
    const {id, isPrint, width, segContent, curSegmentNo, setting, tabNodeList, setCurComponent,
      updateHtml, updateJaHtml, addSegment, setCurSegment, updateTabNode, updateImage,
      addTabNode, delTabNode} = this.props
    return (
      <SentenceArea
        width={width}
        onClick={this.setCurSegment} >
        <LabNum setting={setting} id={id} />
        <Sentences
          setting={setting}
          curSegmentNo={curSegmentNo}
          senWidth={(width - 50) * 0.6}
          segContent={segContent}
          ref={(ref) => {this.sentences = ref}}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          addSegment={addSegment}
          addTabNode={addTabNode}
          delTabNode={delTabNode}
          setCurSegment={setCurSegment}
          setCurComponent={setCurComponent}
          tabNodeList={tabNodeList}
          updateTabNode={updateTabNode}
          id={id}
        />
        <Canvas
          width={(width - 50) * 0.4}
          dataUrl={segContent.dataUrl}
          imgWidth={segContent.imgWidth}
          imgHeight={segContent.imgHeight}
          objX={segContent.posX}
          objY={segContent.posY}
          updateImage={updateImage}
        />
      </SentenceArea>
    )
  }
}

TxtImgSeg.propTypes = {
  segContent: PropTypes.object,
  width: PropTypes.number,
  setting: PropTypes.any,
  setCurSegment: PropTypes.any,
  id: PropTypes.any,
  curSegmentNo: PropTypes.any,
  updateHtml: PropTypes.func,
  updateJaHtml: PropTypes.func,
  addSegment: PropTypes.func,
  tabNodeList: PropTypes.array,
  addTabNode: PropTypes.func,
  delTabNode: PropTypes.func,
  updateTabNode: PropTypes.func,
  updateImage: PropTypes.func,
  setCurComponent: PropTypes.func,
}

export default TxtImgSeg