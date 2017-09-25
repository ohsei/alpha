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
const lineNumList = [
  {
    id: 0,
    value: '1,2,3,4......',
  },
  {
    id: 1,
    value: '(1),(2),(3),(4)......',
  },
]

class ItemLineNos extends Component{
  constructor (props){
    super(props)
    this.setLineNos = this.setLineNos.bind(this)
  }

  setLineNos (){
    this.props.setLineNos({lineNos:this.lineNosSelect.value})
  }

  render (){
    let lineNosLst = lineNumList.map((list)=>
      <option key={list.id} value={list.id}>{list.value}</option>
    )
    return (
      <DivSetMenu>
        <ItemSetting >
          {this.props.name}
        </ItemSetting>
        <DivSetMenuPart column>
          <DivSetMenuPart>
            <SelSize
              innerRef={(ref)=>{this.lineNosSelect = ref}}
              value={this.props.setting.lineNos}
              onChange={this.setLineNos}>
              {lineNosLst}
            </SelSize>
          </DivSetMenuPart>
        </DivSetMenuPart>
      </DivSetMenu>
    )}
}

ItemLineNos.propTypes = {
  setting: PropTypes.any,
  name: PropTypes.any,
  setLineNos: PropTypes.any,
}

export default ItemLineNos
