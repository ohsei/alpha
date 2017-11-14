import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {defaultWidth, landscapeWidth} from '../../../../utils/const'

import MiddleItem from './common/MiddleItem'
import SmallItem from './common/SmallItem'

const DivSetMenu = styled.div`
  display: flex;
  flex-direction: row;
  -ms-flex-direction: row;
  justify-content: flex-start;
`

class ItemLayout extends Component{
  constructor (props){
    super(props)
    this.state = {isClicked: false}
    this.setLandscape = this.setLandscape.bind(this)
    this.setPortrait = this.setPortrait.bind(this)
  }

  setPortrait = () => {
    const {updateSetting, updateWidth, setting} = this.props

    let newSetting = Object.assign({}, setting)
    newSetting.layout = 'portrait'

    updateSetting(newSetting)
    updateWidth(defaultWidth)
  }

  setLandscape (){
    const {updateSetting, updateWidth, setting} = this.props

    let newSetting = Object.assign({}, setting)
    newSetting.layout = 'landscape'

    updateSetting(newSetting)
    updateWidth(landscapeWidth)
  }

  render (){
    return (
      <DivSetMenu>
        <MiddleItem>
          {this.props.name}
        </MiddleItem>
        <SmallItem
          onClick={this.setPortrait}>縦</SmallItem>
        <SmallItem
          onClick={this.setLandscape}>横</SmallItem>
      </DivSetMenu>
    )}
}

ItemLayout.propTypes = {
  name: PropTypes.any,
  updateSetting: PropTypes.func.isRequired,
  setting: PropTypes.object,
  updateWidth: PropTypes.func.isRequired,
}

export default ItemLayout