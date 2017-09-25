import React, {Component} from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import Item from '../../../styledcomponents/Item'

const DivSetMenu = styled.div`
  display: flex;
  flex-direction: row;
  -ms-flex-direction: row;
  justify-content: flex-start;
`
const DivSetMenuPart = styled.div`
  display: ${props=>props.column ? 'block' : 'flex'};
  flex-direction: ${props=>props.column ? 'column' : 'row'};
  -ms-flex-direction: ${props=>props.column ? 'column' : 'row'};
`
const ItemSetting = Item.extend`
  height: 28px;
  width: 156px;
  text-align: center;
`
const SelSize = styled.select`
  height:29px;
  font-size:15px;
  border: 1px solid black;
`
const intervalList = [
  {
    id: 0,
    value: '24pt',
  },
  {
    id: 1,
    value: '26pt',
  },
]

class ItemInterval extends Component{
  constructor (props){
    super(props)
    this.setInterval = this.setInterval.bind(this)
  }

  setInterval (){
    this.props.setInterval({interval:this.intervalSelect.value})
  }

  render (){
    let intervalLst = intervalList.map((list)=>
      <option key={list.id} value={list.value}>{list.value}</option>
    )
    return (
      <DivSetMenu>
        <ItemSetting >
          {this.props.name}
        </ItemSetting>
        <DivSetMenuPart column>
          <DivSetMenuPart>
            <SelSize
              innerRef={(ref)=>{this.intervalSelect = ref}}
              value={this.props.setting.interval}
              onChange={this.setInterval}>
              {intervalLst}
            </SelSize>
          </DivSetMenuPart>
        </DivSetMenuPart>
      </DivSetMenu>
    )}
}

ItemInterval.propTypes = {
  setting: PropTypes.any,
  name: PropTypes.any,
  setInterval: PropTypes.any,
}

export default ItemInterval
