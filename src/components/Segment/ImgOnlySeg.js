import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LabNum from './LabNum'

const DivContent = styled.div`
  background-color: white;
  display: flex;
  direction: row;
  justify-content: space-around;
  width: 100%;
  border: 1px solid gray;
  margin: 0 0 0 0;

  @media print{
    border: none;
    padding: 10px;
    width: 95%
  }
`
const DivSel = styled.div`
  width: 10%;
  text-align: center;
  font-size: 30px;
  color: #222;
  background-color: ${props =>
  {if (props.id == props.curNo){
    return 'darkgray'
  }else{
    return 'lightgray'
  }}};

  @media print{
    display: none;
  }
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

    this.selectSegment = this.selectSegment.bind(this)
    this.loadImage = this.loadImage.bind(this)
    this.getWordWidth = this.getWordWidth.bind(this)
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

  getWordWidth (){
    return 0
  }
  componentDidMount (){
    this.loadImage ()
  }
  componentDidUpdate (){
    this.loadImage ()
  }

  selectSegment (){
    this.props.setCurSegment({curNo:this.props.id})
  }

  render (){
    return (
      <DivContent>
        <LabNum
          curSegmentNo={this.props.id}
          setting={this.props.setting}>
        </LabNum>
        <DivCanvas innerRef={(ref) => this.divCanvas = ref}>
          <canvas height='110px' ref={(ref) => {this.imgCanvas = ref}} />
        </DivCanvas>
        <DivSel id={this.props.id} curNo={this.props.curSegmentNo}
          innerRef={(ref) => {this.selSegment = ref}}
          onClick={this.selectSegment}>
        選択
        </DivSel>
      </DivContent>
    )
  }
}

ImgOnlySeg.propTypes = {
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
export default ImgOnlySeg