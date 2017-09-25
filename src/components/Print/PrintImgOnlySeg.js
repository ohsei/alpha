import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LabNum from '../Segment/LabNum'

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
const DivCanvas = styled.div`
  width: 100%;
  display: flex;
  direction: row;
  justify-content: space-around;
  margin: 0px auto;
  text-align: center;
`

class PrintImgOnlySeg extends Component{
  constructor (props){
    super(props)

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

      if (img.width > canvas.width){
        picWidth = canvas.width
        scale = img.width / picWidth
        picHeight = picHeight / scale
      }
      canvas.width = picWidth
      canvas.height = picHeight

      ctx.drawImage(img, 0, 0, picWidth, picHeight)
      this.props.setLoadedStatus()
    }.bind(this)
    img.src = this.props.dataUrl
  }

  getWordWidth (){
    return 0
  }
  componentDidMount (){
    this.loadImage ()
  }
  componentWillReceiveProps (nextProps){

  }
  componentDidUpdate (){
    
  }


  render (){
    return (
      <DivContent>
        <LabNum
          curSegmentNo={this.props.id}
          setting={this.props.setting}>
        </LabNum>
        <DivCanvas innerRef={(ref) => this.divCanvas = ref}>
          <canvas width='300px' height='110px' ref={(ref) => {this.imgCanvas = ref}} />
        </DivCanvas>
      </DivContent>
    )
  }
}

PrintImgOnlySeg.propTypes = {
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
export default PrintImgOnlySeg