import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LabNum from '../Segment/LabNum'
import PrintSegWithJan from './PrintSegWithJan'

const DivContent = styled.div`
  background-color: white;
  display: flex;
  direction: row;
  justify-content: space-around;
  width: 95%;
  border: none;
  margin: 0 0 0 0;
  padding: 10px;
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
  flex-direction: row;
  -ms-flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

const DivCanvas = styled.div`
  width: 40%;
  text-align: center;
  margin: 0px auto;
`
class PrintImgTxtSeg extends Component{
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

      if (picWidth > canvas * 0.95){
        picWidth = canvas * 0.95
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
      this.props.setLoadedStatus()
    }.bind(this)
    img.src = this.props.dataUrl
  }
  componentDidMount (){
    this.loadImage ()
  }
  componentDidUpdate (){

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
        <DivImgTxt>
          <DivCanvas
            innerRef={(ref)=> {this.divCanvas = ref}}>
            <canvas width='300px' height='110px' style={{display: 'block'}} ref={(ref) => {this.imgCanvas = ref}} />
          </DivCanvas>
          <PrintSegWithJan
            ref={(ref)=> {this.divSegWithJan = ref}}
            jaSentence={this.props.jaSentence}
            setting={this.props.setting}
            content={this.props.content}
          />
        </DivImgTxt>
      </DivContent>
    )
  }
}

PrintImgTxtSeg.propTypes = {
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
  setLoadedStatus: PropTypes.any,
}
export default PrintImgTxtSeg