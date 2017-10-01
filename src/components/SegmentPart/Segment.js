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
    setType: PropTypes.func,
    setImg: PropTypes.func,
    isPrint: PropTypes.bool,
  }

  render (){
    const {
      width, addSegment, id, setting, segContent, title, name, curSegmentNo, isPrint,
      updateHtml, updateJaHtml, setCurSegment, delSegment, addSentence, delSentence, addPageBreak,
      setType, setImg,
    } = this.props

    const dataUrl = segContent.dataUrl
    const isPageBreak = segContent.isPageBreak
    const type = segContent.type

    const content = (()  => {
      if (type == 'imgOnly'){
        return <ImgOnlySeg
          curSegmentNo={curSegmentNo}
          isPrint={isPrint}
          width={width}
          ref={(ref) => {this.imgOnlySeg = ref}}
          id={id}
          dataUrl={dataUrl}
          segContent={segContent}
          setting={setting}
          setCurSegment={setCurSegment}
        />
      } else if (type == 'imgTxt'){
        return <ImgTxtSeg
          curSegmentNo={curSegmentNo}
          isPrint={isPrint}
          width={width}
          ref={(ref) => {this.imgTxtSeg = ref}}
          id={id}
          dataUrl={dataUrl}
          segContent={segContent}
          setting={setting}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          setCurSegment={setCurSegment}
          addSentence={addSentence}
          delSentence={delSentence}
          addSegment={addSegment}
        />
      } else if (type == 'txtImg'){
        return <TxtImgSeg
          curSegmentNo={curSegmentNo}
          isPrint={isPrint}
          width={width}
          ref={(ref) => {this.txtImgSeg = ref}}
          id={id}
          dataUrl={dataUrl}
          segContent={segContent}
          setting={setting}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          setCurSegment={setCurSegment}
          addSentence={addSentence}
          delSentence={delSentence}
          addSegment={addSegment}
        />
      } else {
        return <TxtOnlySeg
          curSegmentNo={curSegmentNo}
          isPrint={isPrint}
          width={width}
          ref={(ref) => {this.txtOnlySeg = ref}}
          id={id}
          dataUrl={dataUrl}
          setting={setting}
          segContent={segContent}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          setCurSegment={setCurSegment}
          addSentence={addSentence}
          delSentence={delSentence}
          addSegment={addSegment}
        />
      }
    })()

    return (
      <div>
        <SegArea width={width}>
          {content}
          <Actions
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