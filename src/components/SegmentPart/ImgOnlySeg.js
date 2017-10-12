import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LabNum from './LabNum'
import Canvas from './Canvas'


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

class ImgOnlySeg extends Component{
  constructor (props){
    super(props)
    this.setCurSegment = this.setCurSegment.bind(this)
  }

  static propTypes = {
    setting: PropTypes.any,
    setCurSegment: PropTypes.any,
    id: PropTypes.any,
    segContent: PropTypes.object,
    updateImage: PropTypes.func
  }

  setCurSegment (){
    this.props.setCurSegment(this.props.id)
  }

  render (){
    const { setting, id, width, segContent, updateImage } = this.props
    return (
      <SentenceArea
        innerRef={(ref) => this.divArea = ref}
        onClick={this.setCurSegment} >
        <LabNum setting={setting} id={id} />
        <DivCanvas>
          <Canvas
            width={width-50}
            dataUrl={segContent.dataUrl}
            imgWidth={segContent.imgWidth}
            imgHeight={segContent.imgHeight}
            objX={segContent.posX}
            objY={segContent.posY}
            updateImage={updateImage}
          />
        </DivCanvas>
      </SentenceArea>
    )
  }
}

export default ImgOnlySeg