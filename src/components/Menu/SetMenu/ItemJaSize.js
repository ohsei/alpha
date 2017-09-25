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
  height: ${props=>props.large ? '60px' : '28px'};
  width: ${props=>props.large ? '125px' : '30px'};
  text-align: center;
`
const SelSize = styled.select`
  height:29px;
  font-size:15px;
  border: 1px solid black;
`

const jaSizeList = [
  {
    id: 0,
    value: '24pt',
  },
  {
    id: 1,
    value: '26pt',
  },
  {
    id: 2,
    value: 'オフ',
  },
]

class ItemJaSize extends Component{
  constructor (props){
    super(props)
    this.setUpJaSize = this.setUpJaSize.bind(this)
    this.setDownJaSize = this.setDownJaSize.bind(this)
  }

  setUpJaSize (){
    let tmpJaPos
    let tmpDownJaSize
    if (this.upJaSizeSelect.value != 'オフ'){
      tmpJaPos = 'up'
      tmpDownJaSize = 'オフ'
    }
    let param = {
      upJaSize:this.upJaSizeSelect.value,
      downJaSize:tmpDownJaSize,
      jaPos:tmpJaPos,
    }
    this.props.setUpJaSize(param)
  }

  setDownJaSize (){
    let tmpJaPos
    let tmpUpJaSize

    if (this.downJaSizeSelect.value != 'オフ'){
      tmpJaPos = 'down'
      tmpUpJaSize = 'オフ'
    }
    let param = {
      downJaSize:this.downJaSizeSelect.value,
      upJaSize:tmpUpJaSize,
      jaPos:tmpJaPos,
    }
    this.props.setDownJaSize(param)
  }

  render (){
    let jaSizeLst = jaSizeList.map((list)=>
      <option key={list.id} value={list.value}>{list.value}</option>
    )
    return (
      <DivSetMenu>
        <ItemSetting large  >
          {this.props.name}
        </ItemSetting>
        <DivSetMenuPart column>
          <DivSetMenuPart>
            <ItemSetting>上</ItemSetting>
            <SelSize
              innerRef={(ref)=>{this.upJaSizeSelect = ref}}
              value={this.props.setting.upJaSize}
              onChange={this.setUpJaSize}>
              {jaSizeLst}
            </SelSize>
          </DivSetMenuPart>
          <DivSetMenuPart >
            <ItemSetting>下</ItemSetting>
            <SelSize
              innerRef={(ref)=>{this.downJaSizeSelect = ref}}
              value={this.props.setting.downJaSize}
              onChange={this.setDownJaSize}>
              {jaSizeLst}
            </SelSize>
          </DivSetMenuPart>
        </DivSetMenuPart>
      </DivSetMenu>
    )}
}

ItemJaSize.propTypes = {
  setting: PropTypes.any,
  name: PropTypes.any,
  setUpJaSize: PropTypes.any,
  setDownJaSize: PropTypes.any,
}

export default ItemJaSize
