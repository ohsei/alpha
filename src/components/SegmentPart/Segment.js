import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Actions from './Actions'
import TxtOnlySeg from './TxtOnlySeg'
import ImgOnlySeg from './ImgOnlySeg'
import ImgTxtSeg from './ImgTxtSeg'
import TxtImgSeg from './TxtImgSeg'

const SegArea = styled.div`
  width: ${props => `${props.width}px`};
  background-color: white;
  border: 2px solid orange;
`
const DivInterval = styled.div`
  height: ${props => props.interval};
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

const DrawPageBreakLine = (object) => {
  if (object.isPageBreak == true){
    return (
      <div>
        <PageBreakLine />
      </div>
    )
  }
  else {
    return false
  }
}

class Segment extends Component{
  constructor (props){
    super(props)
    this.state = {
      imeMode: 'inactive'
    }
    this.setBold = this.setBold.bind(this)
    this.setColor = this.setColor.bind(this)
    this.setItalic = this.setItalic.bind(this)
    this.setUnderline =  this.setUnderline.bind(this)
  }
  static propTypes = {
    id: PropTypes.number,
    width: PropTypes.number,
    setting: PropTypes.object,
    curSegmentNo: PropTypes.number,
    addSegment: PropTypes.func,
    delSegment: PropTypes.func,
    addSentence: PropTypes.func,
    delSentence: PropTypes.func,
    addPageBreak: PropTypes.func,
    title: PropTypes.string,
    name: PropTypes.string,
    segContent: PropTypes.object,
    updateHtml: PropTypes.func,
    updateJaHtml: PropTypes.func,
    setCurSegment: PropTypes.func,
    setCurComponent: PropTypes.func,
    setType: PropTypes.func,
    setImg: PropTypes.func,
    isPrint: PropTypes.bool,
    tabNodeList: PropTypes.array,
    addTabNode: PropTypes.func,
    delTabNode: PropTypes.func,
    updateTabNode: PropTypes.func,
    updateImage: PropTypes.func,
  }

  setBold (){
    if (this.props.curSegmentNo != this.props.id){
      return
    }
    if (this.props.segContent.type == 'imgOnly'){
      return
    }
    
    if (this.props.segContent.type == 'imgTxt' ){
      this.imgTxtSeg.setBold()
    }
    else if (this.props.segContent.type == 'txtImg'){
      this.txtImgSeg.setBold()
    }
    else{
      this.txtOnlySeg.setBold()
    }
  }
  setColor (color){
    if (this.props.curSegmentNo != this.props.id){
      return
    }
    if (this.props.segContent.type == 'imgOnly'){
      return
    }

    if (this.props.segContent.type == 'imgTxt' ){
      this.imgTxtSeg.setColor(color)
    }
    else if (this.props.segContent.type == 'txtImg'){
      this.txtImgSeg.setColor(color)
    }
    else{
      this.txtOnlySeg.setColor(color)
    }
  }
  setItalic (){
    if (this.props.curSegmentNo != this.props.id){
      return
    }
    if (this.props.segContent.type == 'imgOnly'){
      return
    }

    if (this.props.segContent.type == 'imgTxt' ){
      this.imgTxtSeg.setItalic()
    }
    else if (this.props.segContent.type == 'txtImg'){
      this.txtImgSeg.setItalic()
    }
    else{
      this.txtOnlySeg.setItalic()
    }
  }
  setUnderline (){
    if (this.props.curSegmentNo != this.props.id){
      return
    }
    if (this.props.segContent.type == 'imgOnly'){
      return
    }

    if (this.props.segContent.type == 'imgTxt' ){
      this.imgTxtSeg.setUnderline()
    }
    else if (this.props.segContent.type == 'txtImg'){
      this.txtImgSeg.setUnderline()
    }
    else{
      this.txtOnlySeg.setUnderline()
    }
  }
  render (){
    const {
      width, addSegment, id, setting, segContent, title, name, curSegmentNo, tabNodeList,
      updateHtml, updateJaHtml, setCurSegment, delSegment, addSentence, delSentence, addPageBreak,
      setType, setImg, addTabNode, delTabNode, updateTabNode, updateImage, setCurComponent
    } = this.props

    const dataUrl = segContent.dataUrl
    const isPageBreak = segContent.isPageBreak
    const type = segContent.type

    const content = (()  => {
      if (type == 'imgOnly'){
        return <ImgOnlySeg
          id={id}
          width={width}
          ref={(ref) => {this.imgOnlySeg = ref}}
          segContent={segContent}
          setting={setting}
          setCurSegment={setCurSegment}
          setCurComponent={setCurComponent}
          updateImage={updateImage}
        />
      } else if (type == 'imgTxt'){
        return <ImgTxtSeg
          curSegmentNo={curSegmentNo}
          width={width}
          ref={(ref) => {this.imgTxtSeg = ref}}
          id={id}
          dataUrl={dataUrl}
          segContent={segContent}
          setting={setting}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          setCurSegment={setCurSegment}
          setCurComponent={setCurComponent}
          addSentence={addSentence}
          delSentence={delSentence}
          addSegment={addSegment}
          addTabNode={addTabNode}
          delTabNode={delTabNode}
          updateTabNode={updateTabNode}
          tabNodeList={tabNodeList}
          updateImage={updateImage}
        />
      } else if (type == 'txtImg'){
        return <TxtImgSeg
          curSegmentNo={curSegmentNo}
          width={width}
          ref={(ref) => {this.txtImgSeg = ref}}
          id={id}
          dataUrl={dataUrl}
          segContent={segContent}
          setting={setting}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          setCurSegment={setCurSegment}
          setCurComponent={setCurComponent}
          addSentence={addSentence}
          delSentence={delSentence}
          addSegment={addSegment
          }addTabNode={addTabNode}
          delTabNode={delTabNode}
          updateTabNode={updateTabNode}
          tabNodeList={tabNodeList}
          updateImage={updateImage}
        />
      } else {
        return <TxtOnlySeg
          curSegmentNo={curSegmentNo}
          width={width}
          ref={(ref) => {this.txtOnlySeg = ref}}
          id={id}
          dataUrl={dataUrl}
          setting={setting}
          segContent={segContent}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          setCurSegment={setCurSegment}
          setCurComponent={setCurComponent}
          addSentence={addSentence}
          delSentence={delSentence}
          addSegment={addSegment}
          addTabNode={addTabNode}
          delTabNode={delTabNode}
          updateTabNode={updateTabNode}
          tabNodeList={tabNodeList}
          updateImage={updateImage}
        />
      }
    })()

    return (
      <div>
        <SegArea width={width}>
          {content}
          <Actions
            setCurSegment={setCurSegment}
            curSegmentNo={curSegmentNo}
            addSegment={addSegment}
            delSegment={delSegment}
            addPageBreak={addPageBreak}
            setType={setType}
            setImg={setImg}
            id={id}
            type={type} />
        </SegArea>
        <DivInterval interval={setting.interval} />
        <DrawPageBreakLine
          isPageBreak={isPageBreak}
          title={title}
          name={name} />
      </div>
    )
  }
}

export default Segment