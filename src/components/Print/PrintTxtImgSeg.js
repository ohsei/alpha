import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Sentences from './Sentences'
import PrintLabNum from './PrintLabNum'


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

class PrintTxtImgSeg extends Component{
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

      if (picWidth > canvas.width * 0.95){
        picWidth = canvas.width * 0.95
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

  render (){
    const { segContent, width, setting, updateHtml, updateJaHtml, addSentence, delSentence} = this.props
    return (
      <SentenceArea
        width={width}
        onClick={this.setCurSegment} >
        <PrintLabNum {...this.props} />
        <Sentences
          senWidth={(width - 50) * 0.6}
          segContent={segContent}
          ref={(ref) => {this.divSegWithJan = ref}}
          setting={setting}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          addSentence={addSentence}
          delSentence={delSentence}
        />
        <DivCanvas
          width={(width - 50) * 0.4}
          innerRef={(ref) => this.divCanvas = ref}>
          <canvas height='110px' ref={(ref) => {this.imgCanvas = ref}} />
        </DivCanvas>
      </SentenceArea>
    )
  }
}

PrintTxtImgSeg.propTypes = {
  segContent: PropTypes.object,
  width: PropTypes.number,
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
  updateHtml: PropTypes.func,
  updateJaHtml: PropTypes.func,
  addSentence: PropTypes.func,
  delSentence: PropTypes.func,
}

export default PrintTxtImgSeg