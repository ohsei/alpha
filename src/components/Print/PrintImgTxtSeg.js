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
`

class PrintImgTxtSeg extends Component{
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
    const { id, segContent, width, setting, updateHtml, updateJaHtml, addSentence, delSentence} = this.props
    return (
      <SentenceArea
        width={width}
        onClick={this.setCurSegment} >
        <PrintLabNum setting={setting} id={id} />
        <DivCanvas
          innerRef={(ref) => this.divCanvas = ref}>
          <canvas
            width={(width - 50) * 0.4}
            height='110px'
            ref={(ref) => {this.imgCanvas = ref}}
          />
        </DivCanvas>
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
      </SentenceArea>
    )
  }
}

PrintImgTxtSeg.propTypes = {
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

export default PrintImgTxtSeg