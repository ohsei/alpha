import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import LabNum from '../common/LabNum'
import Canvas from '../common/Canvas'


const SentenceArea = styled.div`
  display: flex;
  width: 100%;
`

class ImgOnly extends Component{
  static propTypes = {
    setting: PropTypes.object,
    offsetHeight: PropTypes.any,
    note: PropTypes.array,
    segmentId: PropTypes.number,
    width: PropTypes.number,
    ...Canvas.propTypes,
  }

  render (){
    const {width, segmentId, setting} = this.props
    return (
      <SentenceArea
        onClick={this.setCurSegment} >
        <LabNum setting={setting} id={segmentId} />
        <Canvas
          id={segmentId}
          canvasWidth={width - 50}
          {...pick(this.props, keys(Canvas.propTypes))}
        />
      </SentenceArea>
    )
  }
}

export default ImgOnly