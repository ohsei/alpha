import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Sentences from '../SentencePart/Sentences'

import LabNum from './LabNum'


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
  text-align: center;
`

class ImgTxtSeg extends Component{
  constructor (props){
    super(props)

    this.setCurSegment = this.setCurSegment.bind(this)
    this.loadImage = this.loadImage.bind(this)
  }
  setCurSegment (){
    this.props.setCurSegment(this.props.id)
  }

  loadImage (){
    var img = new Image()
    var canvas = this.imgCanvas
    var ctx = canvas.getContext('2d')

    img.onload = function (){

      let picWidth = img.width
      let picHeight = img.height
      let scale = 1.0

      if (picWidth > this.divCanvas.offsetWidth * 0.95){
        picWidth = this.divCanvas.offsetWidth * 0.95
        scale = img.width / picWidth
        picHeight =  img.height / scale
      }

      let wordHeight = this.divSegWithJan.getHeight()

      canvas.width = picWidth

      if (picHeight >= wordHeight){
        canvas.height = picHeight
      }
      else {
        canvas.height = wordHeight
      }

      let x = 0
      let y = 0

      if (picHeight < canvas.height){
        y = (canvas.height - picHeight) / 2
      }

      ctx.drawImage(img, x, y, picWidth, picHeight)
    }.bind(this)
    img.src = this.props.dataUrl
  }

  componentDidMount (){
    this.loadImage ()
  }
  componentDidUpdate (){
    this.loadImage ()
  }

  render (){
    const {id, isPrint, width, segContent, setting, addSegment, curSegmentNo, tabNodeList,
      updateHtml, updateJaHtml, addTabNode, delTabNode, setCurSegment, updateTabNode} = this.props
    return (
      <SentenceArea
        width={width}
        onClick={this.setCurSegment} >
        <LabNum {...this.props} />
        <DivCanvas
          width={(width - 50) * 0.4}
          innerRef={(ref) => this.divCanvas = ref}>
          <canvas height='110px' ref={(ref) => {this.imgCanvas = ref}} />
        </DivCanvas>
        <Sentences
          curSegmentNo={curSegmentNo}
          isPrint={isPrint}
          senWidth={(width - 50) * 0.6}
          segContent={segContent}
          setting={setting}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          addSegment={addSegment}
          ref={(ref) => {this.divSegWithJan = ref}}
          addTabNode={addTabNode}
          delTabNode={delTabNode}
          setCurSegment={setCurSegment}
          tabNodeList={tabNodeList}
          updateTabNode={updateTabNode}
          id={id}
        />
      </SentenceArea>
    )
  }
}

ImgTxtSeg.propTypes = {
  isPrint: PropTypes.bool,
  width: PropTypes.number,
  segContent: PropTypes.object,
  setting: PropTypes.any,
  setCurSegment: PropTypes.any,
  id: PropTypes.any,
  curSegmentNo: PropTypes.any,
  offsetHeight: PropTypes.any,
  isPageBreak: PropTypes.any,
  dataUrl: PropTypes.any,
  updateHtml: PropTypes.func,
  updateJaHtml: PropTypes.func,
  addSegment: PropTypes.func,
  tabNodeList: PropTypes.array,
  addTabNode: PropTypes.func,
  delTabNode: PropTypes.func,
  updateTabNode: PropTypes.func,
}

export default ImgTxtSeg