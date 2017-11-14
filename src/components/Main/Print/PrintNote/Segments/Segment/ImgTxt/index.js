import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import Sentences from '../Sentences'
import LabNum from '../common/LabNum'
import Canvas from '../common/Canvas'

const SentenceArea = styled.div`
  display: flex;
  width: 100%;
`

class ImgTxt extends Component{
  render (){
    const { segmentId, note, width, setting} = this.props
    return (
      <SentenceArea
        width={width}
        onClick={this.setCurSegment} >
        <LabNum setting={setting} id={segmentId} />
        <Canvas
          id={segmentId}
          canvasWidth={(width - 50) * 0.4}
          {...pick(this.props, keys(Canvas.propTypes))}
        />
        <Sentences
          senWidth={(width - 50) * 0.6}
          note={note}
          segmentId={segmentId}
          ref={(ref) => {this.divSegWithJan = ref}}
          setting={setting}
        />
      </SentenceArea>
    )
  }
}

ImgTxt.propTypes = {
  note: PropTypes.array,
  width: PropTypes.number,
  setting: PropTypes.any,
  offsetHeight: PropTypes.any,
  segmentId: PropTypes.number,
  ...Canvas.propTypes,
}

export default ImgTxt