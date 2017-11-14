import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {lineNumList} from '../../../../utils/const'

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

class ItemLineNum extends Component{
  setLineNum = () => {
    const {updateSetting, setting} = this.props
    const newSetting = Object.assign({}, setting)
    newSetting.lineNum = this.lineNumSelect.value
    updateSetting(newSetting)
  }

  render (){
    const {setting} = this.props
    let lineNumLst = lineNumList.map((list) =>
      <option key={list.id} value={list.value}>{list.value + '  本'}</option>
    )
    return (
      <DivSetMenu>
        <MiddleItem >
          {this.props.name}
        </MiddleItem>
        <DivSetMenuPart column>
          <DivSetMenuPart>
            <SelectItem
              innerRef={(ref) => {this.lineNumSelect = ref}}
              value={setting.lineNum}
              onChange={this.setLineNum}>
              {lineNumLst}
            </SelectItem>
          </DivSetMenuPart>
        </DivSetMenuPart>
      </DivSetMenu>
    )}
}

ItemLineNum.propTypes = {
  setting: PropTypes.object,
  name: PropTypes.string,
  updateSetting: PropTypes.func.isRequired,
}

export default ItemLineNum
