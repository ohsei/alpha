import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PrintLabNum from './PrintLabNum'


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
`

class PrintImgOnlySeg extends Component{
  constructor (props){
    super(props)

    this.loadImage = this.loadImage.bind(this)
  }

  static propTypes = {
    segContent: PropTypes.any,
    editSegments: PropTypes.any,
    jaSentence: PropTypes.any,
    setting: PropTypes.any,
    setCurSegment: PropTypes.any,
    id: PropTypes.any,
    curSegmentNo: PropTypes.any,
    offsetHeight: PropTypes.any,
    isPageBreak: PropTypes.any,
    dataUrl: PropTypes.any,
    setLoadedStatus: PropTypes.func,
  }

  loadImage (){
    let img = new Image()
    let canvas = this.imgCanvas
    let ctx = canvas.getContext('2d')

    img.onload = function (){
      canvas.height = this.props.segContent.imgHeight + 40
      ctx.drawImage(img, 0, 0, img.width, img.height, this.props.segContent.posX, this.props.segContent.posY, this.props.segContent.imgWidth, this.props.segContent.imgHeight)
      this.props.setLoadedStatus()
    }.bind(this)
    img.src = this.props.dataUrl
  }

  componentDidMount (){
    this.loadImage ()
  }

  render (){
    return (
      <SentenceArea
        onClick={this.setCurSegment} >
        <PrintLabNum {...this.props} />
        <DivCanvas innerRef={(ref) => this.divCanvas = ref}>
          <canvas width={`${this.props.width-50}px`} height='110px' ref={(ref) => {this.imgCanvas = ref}} />
        </DivCanvas>
      </SentenceArea>
    )
  }
}

export default PrintImgOnlySeg