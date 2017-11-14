import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import Sentences from '../Sentences'
import LabNum from '../common/LabNum'
import Canvas from '../common/Canvas'


const SentenceArea = styled.div`
  display: flex;
  direction: row;
  width: 100%;
`

class ImgTxt extends Component{
  render (){
    const {id, width, setting} = this.props
    return (
      <SentenceArea
        width={width}
        onClick={this.setCurSegment} >
        <LabNum lineNoType={setting.lineNos} id={id} />
        <Canvas
          canvasWidth={(width - 50) * 0.4}
          {...pick(this.props, keys(Canvas.propTypes))}
        />
        <Sentences
          senWidth={(width - 50) * 0.6}
          ref={(ref) => {this.sentences = ref}}
          {...pick(this.props, keys(Sentences.propTypes))}
        />
      </SentenceArea>
    )
  }
}

ImgTxt.propTypes = {
  width: PropTypes.number,
  note: PropTypes.array,
  setting: PropTypes.object,
  setCurSegment: PropTypes.func,
  setCurComponent: PropTypes.func,
  id: PropTypes.any,
  curSegmentNo: PropTypes.any,
  updateNote: PropTypes.func.isRequired,
  tabNodeList: PropTypes.array,
  updateTabNodeList: PropTypes.func.isRequired,
  isBold: PropTypes.bool,
  isItalic: PropTypes.bool,
  isUnderline: PropTypes.bool,
  updateIsBold: PropTypes.func.isRequired,
  updateIsItalic: PropTypes.func.isRequired,
  updateIsUnderline: PropTypes.func.isRequired,
  updateCurColor: PropTypes.func.isRequired,
  ...Sentences.propTypes,
}

export default ImgTxt