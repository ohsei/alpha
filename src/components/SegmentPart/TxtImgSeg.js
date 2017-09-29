import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LabNum from './LabNum'
import Sentences from '../SentencePart/Sentences'


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

class TxtImgSeg extends Component{
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
    return (
      <SentenceArea
        width={this.props.width}
        onClick={this.setCurSegment} >
        <LabNum {...this.props} />
        <Sentences
          senWidth={(this.props.width-50) * 0.6}
          note={this.props.note}
          ref={(ref)=> {this.divSegWithJan = ref}} {...this.props}
        />
        <DivCanvas
          width={(this.props.width-50) * 0.4}
          innerRef={(ref) => this.divCanvas = ref}>
          <canvas height='110px' ref={(ref) => {this.imgCanvas = ref}} />
        </DivCanvas>
      </SentenceArea>
    )
  }
}

TxtImgSeg.propTypes = {
  content: PropTypes.any,
  editSegments: PropTypes.any,
  jaSentence: PropTypes.any,
  setting: PropTypes.any,
  setCurSegment: PropTypes.any,
  id: PropTypes.any,
  curSegmentNo: PropTypes.any,
  offsetHeight: PropTypes.any,
  isPageBreak: PropTypes.any,
  dataUrl: PropTypes.any,
}
export default TxtImgSeg