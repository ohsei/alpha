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
const DivCanvas = styled.div`
  width: 100%;
  display: flex;
  direction: row;
  justify-content: space-around;
  margin: 0px auto;
`

class ImgOnly extends Component{
  constructor (props){
    super(props)
  }

  static propTypes = {
    width: PropTypes.number,
    setting: PropTypes.object,
    setCurSegment: PropTypes.any,
    id: PropTypes.any,
    note: PropTypes.array,
    updateNote: PropTypes.func.isRequired,
  }

  render (){
    const { setting, id, width } = this.props
    return (
      <SentenceArea
        innerRef={(ref) => this.divArea = ref}
        onClick={this.setCurSegment} >
        <LabNum lineNoType={setting.lineNos} id={id} />
        <DivCanvas>
          <Canvas
            canvasWidth={width - 50}
            {...pick(this.props, keys(Canvas.propTypes))}
          />
        </DivCanvas>
      </SentenceArea>
    )
  }
}

export default ImgOnly