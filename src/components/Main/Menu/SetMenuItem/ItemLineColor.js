import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {lineColorList} from '../../../../utils/const'

import MiddleItem from './common/MiddleItem'
import SelectItem from './common/SelectItem'

const DivSetMenu = styled.div`
  display: flex;
  flex-direction: row;
  -ms-flex-direction: row;
  justify-content: flex-start;
`
const DivSetMenuPart = styled.div`
  display: ${props => props.column ? 'block' : 'flex'};
  flex-direction: ${props => props.column ? 'column' : 'row'};
  -ms-flex-direction: ${props => props.column ? 'column' : 'row'};
`

class ItemLineColor extends Component{
  setLineColor = () => {
    const {updateSetting, setting} = this.props
    let newSetting = Object.assign({}, setting)
    newSetting.lineColor = this.lineColorSelect.value
    updateSetting(newSetting)
  }

  render (){
    const {setting} = this.props
    let lineColorLst = lineColorList.map((list) =>
      <option style={{color: list.value}} key={list.id} >{list.value}</option>
    )
    return (
      <DivSetMenu>
        <MiddleItem >
          {this.props.name}
        </MiddleItem>
        <DivSetMenuPart column>
          <DivSetMenuPart>
            <SelectItem
              innerRef={(ref) => {this.lineColorSelect = ref}}
              value={setting.lineColor}
              onChange={this.setLineColor}>
              {lineColorLst}
            </SelectItem>
          </DivSetMenuPart>
        </DivSetMenuPart>
      </DivSetMenu>
    )}
}

ItemLineColor.propTypes = {
  setting: PropTypes.object,
  name: PropTypes.string,
  updateSetting: PropTypes.func.isRequired,
}

export default ItemLineColor
