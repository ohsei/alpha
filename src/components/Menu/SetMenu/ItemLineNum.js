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
    value: 4,
  },
  {
    id: 1,
    value: 2,
  },
]

class ItemLineNum extends Component{
  constructor (props){
    super(props)
    this.setLineNum = this.setLineNum.bind(this)
  }

  setLineNum (){
    this.props.setLineNum({lineNum:this.lineNumSelect.value})
  }

  render (){
    let lineNumLst = lineNumList.map((list)=>
      <option key={list.id} value={list.value}>{list.value + '  本'}</option>
    )
    return (
      <DivSetMenu>
        <ItemSetting >
          {this.props.name}
        </ItemSetting>
        <DivSetMenuPart column>
          <DivSetMenuPart>
            <SelSize
              innerRef={(ref)=>{this.lineNumSelect = ref}}
              value={this.props.setting.lineNum}
              onChange={this.setLineNum}>
              {lineNumLst}
            </SelSize>
          </DivSetMenuPart>
        </DivSetMenuPart>
      </DivSetMenu>
    )}
}

ItemLineNum.propTypes = {
  setting: PropTypes.any,
  name: PropTypes.any,
  setLineNum: PropTypes.any,
}

export default ItemLineNum
