import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {enSizeList} from '../../../../utils/const'

import MiddleItem from './common/MiddleItem'
import SmallItem from './common/SmallItem'
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

class ItemEnSize extends Component{
  setEnSize = () => {
    const {updateSetting, setting} = this.props
    let newSetting = Object.assign({}, setting)
    newSetting.enSize = this.enSizeSelect.value
    updateSetting(newSetting)
  }

  render (){
    const {setting} = this.props
    let enSizeLst = enSizeList.map((list) =>
      <option key={list.id} value={list.value}>{list.value}</option>
    )

    return (
      <DivSetMenu>
        <MiddleItem >
          {this.props.name}
        </MiddleItem>
        <DivSetMenuPart column>
          <DivSetMenuPart>
            <SmallItem>
              <SelectItem
                innerRef={(ref) => {this.enSizeSelect = ref}}
                value={setting.enSize}
                onChange={this.setEnSize}>
                {enSizeLst}
              </SelectItem>
            </SmallItem>
          </DivSetMenuPart>
        </DivSetMenuPart>
      </DivSetMenu>
    )}
}

ItemEnSize.propTypes = {
  setting: PropTypes.object,
  name: PropTypes.string,
  updateSetting: PropTypes.func.isRequired,
}

export default ItemEnSize
