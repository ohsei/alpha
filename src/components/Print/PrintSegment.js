import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PrintHeader from '../Print/PrintHeader'

import PrintTxtOnlySeg from './PrintTxtOnlySeg'
import PrintImgOnlySeg from './PrintImgOnlySeg'
import PrintImgTxtSeg from './PrintImgTxtSeg'
import PrintTxtImgSeg from './PrintTxtImgSeg'

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
  height: ${props => props.interval};
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
  else {
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

  render (){
    const {note, id, setting, title, width, name,
      updateHtml, updateJaHtml, addSentence, delSentence} = this.props
    const type = note[id].type

    const content = (()  => {
      if (type == 'imgOnly'){
        return <PrintImgOnlySeg
          ref={(ref) => {this.imgOnlySeg = ref}}
          id={id}
          width={width}
          segContent={note[id]}
          setting={setting}
          setLoadedStatus={this.setLoadedStatus}
          dataUrl={note[id].dataUrl}
        />
      } else if (type == 'imgTxt'){
        return <PrintImgTxtSeg
          ref={(ref) => {this.imgTxtSeg = ref}}
          id={id}
          width={width}
          segContent={note[id]}
          setting={setting}
          setLoadedStatus={this.setLoadedStatus}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          addSentence={addSentence}
          delSentence={delSentence}
          dataUrl={note[id].dataUrl}
        />
      } else if (type == 'txtImg'){
        return <PrintTxtImgSeg
          ref={(ref) => {this.txtImgSeg = ref}}
          id={id}
          width={width}
          segContent={note[id]}
          setting={setting}
          setLoadedStatus={this.setLoadedStatus}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          addSentence={addSentence}
          delSentence={delSentence}
          dataUrl={note[id].dataUrl}
        />
      } else {
        return <PrintTxtOnlySeg
          ref={(ref) => {this.txtOnlySeg = ref}}
          id={id}
          segContent={note[id]}
          setting={setting}
          width={width}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          addSentence={addSentence}
          delSentence={delSentence}
        />
      }
    })()
    return (
      <div>
        <DivSegs innerRef={(ref) => {this.segment = ref}}>
          { content }
        </DivSegs>
        <DivInterval interval={setting.interval} />
        <DrawPageBreakLine
          isPageBreak={note[id].isPageBreak}
          title={title}
          name={name} />
      </div>
    )
  }
}

PrintSegment.propTypes = {
  note: PropTypes.array,
  setting: PropTypes.any,
  id: PropTypes.any,
  title: PropTypes.string,
  name: PropTypes.any,
  width: PropTypes.number,
  updateHtml: PropTypes.func,
  updateJaHtml: PropTypes.func,
  addSentence: PropTypes.func,
  delSentence: PropTypes.func,
  setLoadedStatus: PropTypes.func,
}

export default PrintSegment

