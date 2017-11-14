import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {pick, keys} from 'lodash'

import Sentences from '../Sentences'
import LabNum from '../common/LabNum'

const SentenceArea = styled.div`
  display: flex;
  width: ${props => `${props.width}px`};
`

class TxtOnly extends Component{
  constructor (props){
    super(props)
  }
  static propTypes = {
    note: PropTypes.array,
    noteId: PropTypes.number,
    segmentId: PropTypes.number,
    width: PropTypes.number,
    setting: PropTypes.object,
  }

  render (){
    const {width, setting, segmentId} = this.props

    return (
      <SentenceArea width={width}>
        <LabNum setting={setting} id={segmentId} />
        <Sentences
          senWidth={width - 50}
          {...pick(this.props, keys(Sentences.propTypes))} />
      </SentenceArea>
    )
  }
}

export default TxtOnly
