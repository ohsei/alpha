import React, { Component } from 'react'
import PropTypes from 'prop-types'


import SegmentAction from './SegmentAction'
import TxtOnlySeg from './TxtOnlySeg'
import ImgOnlySeg from './ImgOnlySeg'
import ImgTxtSeg from './ImgTxtSeg'
import TxtImgSeg from './TxtImgSeg'
import styled from 'styled-components'

/* define layout start */
const DivSegs = styled.section`
  background-color: white;
  display: block;
  width: ${props => `${props.width}px`};
  border: 1px solid gray;
  margin: 0 0 0 0;
  justify-content: center;
  position: relative;

  @media print{
    border: none;
  }
`
const DivSetting = styled.div`
  display: block;
  direction: row;
  width: 100%;
  margin: 5px 0 20px 0;
  justify-content: center;

  @media print{
    display: none;
  }
`
const DivInterval = styled.div`
  height: ${props=>props.interval};
  background-color: lightgreen;
`
const PageBreakLine = styled.div`
  width: 100%;
  height: 2;
  border:1px dotted blue;
  page-break-after: always;

  @media print{
    border-color: white;
  }
`
/* define layout end */

const DrawPageBreakLine = (object) => {
  if (object.isPageBreak == true){
    return (
      <div>
        <PageBreakLine />
      </div>
    )
  }
  else{
    return false
  }
}

class Segment extends Component {
  constructor (props){
    super(props)
    this.state = {
      isPageBreak: false,
    }
    this.delSegment = this.delSegment.bind(this)
    this.addSegment = this.addSegment.bind(this)
    this.setCurSegment = this.setCurSegment.bind(this)
    this.addPageBreak = this.addPageBreak.bind(this)
    this.setType = this.setType.bind(this)
    this.setImg = this.setImg.bind(this)
    this.addPageBreak = this.addPageBreak.bind(this)
  }

  delSegment (){
    this.props.editSegments({pattern:'del', type: ''})
  }

  addSegment (object){
    this.props.editSegments(object)
  }

  setCurSegment (){
    this.props.setCurSegment({curNo:this.props.id})
  }

  addPageBreak (){
    this.props.addPageBreak()
  }

  setType (object){
    this.props.setType(object)
  }

  setImg (object){
    this.props.setImg(object)
  }
  componentDidMount (){
  }

  componentWillUnmout (){
  }

  render (){
    const content = (()  => {
      if (this.props.type == 'imgOnly'){
        return <ImgOnlySeg
          ref={(ref)=>{this.imgOnlySeg = ref}}
          id={this.props.id}
          jaSentence={this.props.jaSentence}
          content={this.props.content}
          setting={this.props.setting}
          curSegmentNo={this.props.curSegmentNo}
          setCurSegment={this.setCurSegment}
          dataUrl={this.props.dataUrl}
          width={this.props.width}
        />
      } else if (this.props.type == 'imgTxt'){
        return <ImgTxtSeg
          ref={(ref)=>{this.imgTxtSeg = ref}}
          id={this.props.id}
          jaSentence={this.props.jaSentence}
          content={this.props.content}
          setting={this.props.setting}
          curSegmentNo={this.props.curSegmentNo}
          setCurSegment={this.setCurSegment}
          dataUrl={this.props.dataUrl}
          width={this.props.width}
        />
      } else if (this.props.type == 'txtImg'){
        return <TxtImgSeg
          ref={(ref)=>{this.imgTxtSeg = ref}}
          id={this.props.id}
          jaSentence={this.props.jaSentence}
          content={this.props.content}
          setting={this.props.setting}
          curSegmentNo={this.props.curSegmentNo}
          setCurSegment={this.setCurSegment}
          dataUrl={this.props.dataUrl}
          width={this.props.width}
        />
      } else {
          return <TxtOnlySeg
            ref={(ref)=>{this.txtOnlySeg = ref}}
            id={this.props.id}
            jaSentence={this.props.jaSentence}
            content={this.props.content}
            setting={this.props.setting}
            curSegmentNo={this.props.curSegmentNo}
            setCurSegment={this.setCurSegment}
            width={this.props.width}
          />
        }
      })()
    return (
      <div style={{width: this.props.width}}>
        <DivSegs innerRef={(ref) => {this.segment = ref}} width={this.props.width}>
          { content }
          <DivSetting>
            <SegmentAction
              id={this.props.id}
              addSegment={this.addSegment}
              delSegment={this.delSegment}
              addPageBreak={this.addPageBreak}
              setType={this.setType}
              setImg={this.setImg}
              curSegmentNo={this.props.curSegmentNo}
              type={this.props.type}
            />
          </DivSetting>
        </DivSegs>
        <DivInterval interval={this.props.setting.interval} />
        <DrawPageBreakLine
          isPageBreak={this.props.isPageBreak}
          title={this.props.title}
          name={this.props.name} />
      </div>
    )
  }
}

Segment.propTypes = {
  type:PropTypes.any,
  content: PropTypes.any,
  editSegments: PropTypes.any,
  jaSentence: PropTypes.any,
  setting: PropTypes.any,
  setCurSegment: PropTypes.any,
  id: PropTypes.any,
  curSegmentNo: PropTypes.any,
  offsetHeight: PropTypes.any,
  isPageBreak: PropTypes.any,
  title: PropTypes.any,
  name: PropTypes.any,
  dataUrl: PropTypes.any,
  setType: PropTypes.any,
  setImg: PropTypes.any,
  addPageBreak: PropTypes.any,
  width: PropTypes.number,
}

export default Segment

