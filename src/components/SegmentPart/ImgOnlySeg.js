import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LabNum from './LabNum'


const SentenceArea = styled.div`
  display: flex;
  width: 100%;
`

const DivCanvas = styled.div`
  width: 100%;
  display: flex;
  direction: row;
  justify-content: space-around;
  margin: 0px auto;
  text-align: center;
`


class ImgOnlySeg extends Component{
  constructor (props){
    super(props)

    this.setCurSegment = this.setCurSegment.bind(this)
    this.loadImage = this.loadImage.bind(this)
  }

  static propTypes = {
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
    addTabNode: PropTypes.func,
    delTabNode: PropTypes.func,
    id: PropTypes.number,
    tabNodeList: PropTypes.array,
    updateTabNode: PropTypes.func,
  }

  setCurSegment (){
    this.props.setCurSegment(this.props.id)
  }

  loadImage (){
    let img = new Image()
    let canvas = this.imgCanvas
    let ctx = canvas.getContext('2d')

    img.onload = function (){
      let picWidth = img.width
      let picHeight = img.height
      let scale = 1.0

      if (img.width > this.divCanvas.offsetWidth){
        picWidth = this.divCanvas.offsetWidth
        scale = img.width / picWidth
        picHeight = picHeight / scale
      }
      canvas.width = picWidth
      canvas.height = picHeight

      ctx.drawImage(img, 0, 0, picWidth, picHeight)
      
    }.bind(this)
    img.src = this.props.dataUrl
  }


  componentDidMount (){
    this.loadImage ()
  }
  componentDidUpdate (){
    this.loadImage ()
  
  }

  componentWillUnmount (){
  }

  render (){
    return (
      <SentenceArea
        onClick={this.setCurSegment} >
        <LabNum {...this.props} />
        <DivCanvas innerRef={(ref) => this.divCanvas = ref}>
          <canvas height='110px' ref={(ref) => {this.imgCanvas = ref}} />
        </DivCanvas>
      </SentenceArea>
    )
  }
}

export default ImgOnlySeg