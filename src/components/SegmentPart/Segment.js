import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Actions from './Actions'


const SegArea = styled.div`
  width: ${props => props.width};
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
    this.setCurSegment = this.setCurSegment.bind(this)
  }
  static propTypes = {
    id: PropTypes.number,
    isNewFile: PropTypes.bool,
    width: PropTypes.string,
    setting: PropTypes.object,
    note: PropTypes.arrayOf(PropTypes.object),
    addSegment: PropTypes.func,
    setCurSegment: PropTypes.func,
    isPageBreak: PropTypes.bool,
    title: PropTypes.string,
    name: PropTypes.string,
  }

  setCurSegment (){
    this.props.setCurSegment(this.props.id)
  }
  render (){
    const {
      width, addSegment, id, setting, isPageBreak, title, name
    } = this.props

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
      <div>
        <SegArea width={width}>
          {content}
          <Actions
            addSegment={addSegment}
            id={id}
            {...this.props}
            type={'txtOnly'} />
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