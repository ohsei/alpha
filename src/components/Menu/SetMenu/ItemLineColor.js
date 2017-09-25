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
const lineColorList = [
  {
    id: 0,
    value: 'lightgray',
  },
  {
    id: 1,
    value: 'gray',
  },
  {
    id: 2,
    value: 'black',
  },
]

class ItemLineColor extends Component{
  constructor (props){
    super(props)
    this.setLineColor = this.setLineColor.bind(this)
  }

  setLineColor (){
    this.props.setLineColor({lineColor:this.lineColorSelect.value})
  }

  render (){
    let lineColorLst = lineColorList.map((list)=>
      <option style={{color: list.value}} key={list.id} >{list.value}</option>
    )
    return (
      <DivSetMenu>
        <ItemSetting >
          {this.props.name}
        </ItemSetting>
        <DivSetMenuPart column>
          <DivSetMenuPart>
            <SelSize
              innerRef={(ref)=>{this.lineColorSelect = ref}}
              value={this.props.setting.lineColor}
              onChange={this.setLineColor}>
              {lineColorLst}
            </SelSize>
          </DivSetMenuPart>
        </DivSetMenuPart>
      </DivSetMenu>
    )}
}

ItemLineColor.propTypes = {
  setting: PropTypes.any,
  name: PropTypes.any,
  setLineColor: PropTypes.any,
}

export default ItemLineColor
