import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {lineNumStyleList} from '../../../../utils/const'

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

class ItemLineNos extends Component{
  setLineNos = () => {
    const {updateSetting, setting} = this.props
    let newSetting = Object.assign({}, setting)
    newSetting.lineNos = this.lineNosSelect.value
    updateSetting(newSetting)
  }

  render (){
    const {setting} = this.props
    let lineNosLst = lineNumStyleList.map((list) =>
      <option key={list.id} value={list.id}>{list.value}</option>
    )
    return (
      <DivSetMenu>
        <MiddleItem >
          {this.props.name}
        </MiddleItem>
        <DivSetMenuPart column>
          <DivSetMenuPart>
            <SelectItem
              innerRef={(ref) => {this.lineNosSelect = ref}}
              value={setting.lineNos}
              onChange={this.setLineNos}>
              {lineNosLst}
            </SelectItem>
          </DivSetMenuPart>
        </DivSetMenuPart>
      </DivSetMenu>
    )}
}

ItemLineNos.propTypes = {
  setting: PropTypes.object,
  name: PropTypes.string,
  updateSetting: PropTypes.func.isRequired,
}

export default ItemLineNos
