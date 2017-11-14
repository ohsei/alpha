import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {intervalList} from '../../../../utils/const'

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

class ItemInterval extends Component{
  constructor (props){
    super(props)
  }

  setInterval = () => {
    const {updateSetting, setting} = this.props
    let newSetting = Object.assign({}, setting)
    newSetting.interval = this.intervalSelect.value
    updateSetting(newSetting)
  }

  render (){
    const {setting} = this.props
    let intervalLst = intervalList.map((list) =>
      <option key={list.id} value={list.value}>{list.value}</option>
    )
    return (
      <DivSetMenu>
        <MiddleItem >
          {this.props.name}
        </MiddleItem>
        <DivSetMenuPart column>
          <DivSetMenuPart>
            <SelectItem
              innerRef={(ref) => {this.intervalSelect = ref}}
              value={setting.interval}
              onChange={this.setInterval}>
              {intervalLst}
            </SelectItem>
          </DivSetMenuPart>
        </DivSetMenuPart>
      </DivSetMenu>
    )}
}

ItemInterval.propTypes = {
  setting: PropTypes.object,
  name: PropTypes.string,
  updateSetting: PropTypes.func.isRequired,
}

export default ItemInterval
