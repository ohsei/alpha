import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PrintTxtOnlySeg from './PrintTxtOnlySeg'
import PrintImgOnlySeg from './PrintImgOnlySeg'
import PrintImgTxtSeg from './PrintImgTxtSeg'
import PrintTxtImgSeg from './PrintTxtImgSeg'
import styled from 'styled-components'
import PrintHeader from '../Print/PrintHeader'

/* defin layout start */
const DivSegs = styled.section`
  background-color: white;
  display: block;
  width: 100%;
  border: none;
  margin: 0 0 0 0;
  justify-content: center;
  position: relative;
`
const DivInterval = styled.div`
  height: ${props=>props.interval};
  background-color: white;
`
const PageBreakLine = styled.div`
  width: 100%;
  height: 2;
  border: 2px dotted black;
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
        <PrintHeader title={object.title} name={object.name} />
      </div>
    )
  }
  else{
    return false
  }
}

class PrintSegment extends Component {
  constructor (props){
    super(props)
    this.state = {
      isPageBreak: false,
    }
    this.setLoadedStatus = this.setLoadedStatus.bind(this)
  }

  setLoadedStatus (){
    this.props.setLoadedStatus({id: this.props.id})
  }
  componentDidMount (){
  }

  componentWillUnmout (){
  }

  render (){
    const content = (()  => {
      if (this.props.type == 'imgOnly'){
        return <PrintImgOnlySeg
          ref={(ref)=>{this.imgOnlySeg = ref}}
          id={this.props.id}
          jaSentence={this.props.jaSentence}
          content={this.props.content}
          setting={this.props.setting}
          dataUrl={this.props.dataUrl}
          setLoadedStatus={this.setLoadedStatus}
        />
      } else if (this.props.type == 'imgTxt'){
        return <PrintImgTxtSeg
          ref={(ref)=>{this.imgTxtSeg = ref}}
          id={this.props.id}
          jaSentence={this.props.jaSentence}
          content={this.props.content}
          setting={this.props.setting}
          dataUrl={this.props.dataUrl}
          setLoadedStatus={this.setLoadedStatus}
        />
      } else if (this.props.type == 'txtImg'){
        return <PrintTxtImgSeg
          ref={(ref)=>{this.txtImgSeg = ref}}
          id={this.props.id}
          jaSentence={this.props.jaSentence}
          content={this.props.content}
          setting={this.props.setting}
          dataUrl={this.props.dataUrl}
          setLoadedStatus={this.setLoadedStatus}
        />
      } else {
        return <PrintTxtOnlySeg
          ref={(ref)=>{this.txtOnlySeg = ref}}
          id={this.props.id}
          jaSentence={this.props.jaSentence}
          content={this.props.content}
          setting={this.props.setting}
        />
      }
    })()
    return (
      <div>
        <DivSegs innerRef={(ref) => {this.segment = ref}}>
          { content }
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

PrintSegment.propTypes = {
  type:PropTypes.any,
  content: PropTypes.any,
  jaSentence: PropTypes.any,
  setting: PropTypes.any,
  id: PropTypes.any,
  offsetHeight: PropTypes.any,
  isPageBreak: PropTypes.any,
  title: PropTypes.any,
  name: PropTypes.any,
  dataUrl: PropTypes.any,
  setLoadedStatus: PropTypes.any,
}

export default PrintSegment

