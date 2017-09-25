import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LabNum from './LabNum'
import SegWithJan from './SegWithJan'

const DivContent = styled.div`
  background-color: white;
  display: flex;
  direction: row;
  justify-content: space-around;
  width: ${props => `${props.width}px`};
  border: 1px solid gray;
  margin: 0 0 0 0;

  @media print{
    border: none;
    width: 95%;
    padding: 10px;
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
    padding: 10px;
  }
`
const DivImgTxt = styled.div`
  display: flex;
  direction: row;
  justify-content: space-around;
  width: ${props => `${props.width}px`};
`

const DivCanvas = styled.div`
  width: ${props => `${props.width}px`};
  text-align: center;
  margin: 0px auto;
`
class TxtImgSeg extends Component{
  constructor (props){
    super(props)
    this.state = {
      imageLoaded: false,
    }
    this.selectSegment = this.selectSegment.bind(this)
    this.loadImage = this.loadImage.bind(this)
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

  selectSegment (){
    this.props.setCurSegment({curNo:this.props.id})
  }

  render (){
    return (
      <DivContent with={this.props.width}>
        <LabNum
          curSegmentNo={this.props.id}
          setting={this.props.setting}>
        </LabNum>
        <DivImgTxt width={this.props.width - 150}>
          <SegWithJan
            width={(this.props.width-150)*0.6}
            ref={(ref)=> {this.divSegWithJan = ref}}
            jaSentence={this.props.jaSentence}
            setting={this.props.setting}
            content={this.props.content}
          />
          <DivCanvas
            innerRef={(ref)=> {this.divCanvas = ref}}
            width={(this.props.width-150)*0.4}>
            <canvas style={{display: 'block'}} ref={(ref) => {this.imgCanvas = ref}} />
          </DivCanvas>
        </DivImgTxt>
        <DivSel id={this.props.id} curNo={this.props.curSegmentNo}
          innerRef={(ref) => {this.selSegment = ref}}
          onClick={this.selectSegment}>
        選択
        </DivSel>
      </DivContent>
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