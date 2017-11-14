import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import Header from '../Header'

import TxtOnly from './TxtOnly'
import ImgOnly from './ImgOnly'
import ImgTxt from './ImgTxt'
import TxtImg from './TxtImg'

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
        <Header title={object.title} name={object.name} />
      </div>
    )
  }
  else {
    return false
  }
}

class Segment extends Component {
  static propTypes = {
    noteId: PropTypes.number,
    note: PropTypes.array,
    setting: PropTypes.any,
    segmentId: PropTypes.number,
    title: PropTypes.string,
    name: PropTypes.any,
    width: PropTypes.number,
    updateLoadedArray: PropTypes.func.isRequired,
    loadedArray: PropTypes.array,
  }
  render (){
    const {note, segmentId, setting, title, name} = this.props
    const type = note[segmentId].type

    const content = (()  => {
      if (type == 'imgOnly'){
        return <ImgOnly
          ref={(ref) => {this.imgOnlySeg = ref}}
          {...pick(this.props, keys(ImgOnly.propTypes))}
        />
      } else if (type == 'imgTxt'){
        return <ImgTxt
          ref={(ref) => {this.imgTxtSeg = ref}}
          {...pick(this.props, keys(ImgTxt.propTypes))}
        />
      } else if (type == 'txtImg'){
        return <TxtImg
          ref={(ref) => {this.txtImgSeg = ref}}
          {...pick(this.props, keys(TxtImg.propTypes))}
        />
      } else {
        return <TxtOnly
          ref={(ref) => {this.txtOnlySeg = ref}}
          {...pick(this.props, keys(TxtOnly.propTypes))}
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
          isPageBreak={note[segmentId].isPageBreak}
          title={title}
          name={name} />
      </div>
    )
  }
}

export default Segment

