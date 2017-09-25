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

const enSizeList = [
  {
    id: 0,
    value: '60pt',
  },
  {
    id: 1,
    value: '84pt',
  },
]

class ItemEnSize extends Component{
  constructor (props){
    super(props)
    this.setEnSize = this.setEnSize.bind(this)
  }

  setEnSize (){
    this.props.setEnSize({enSize:this.enSizeSelect.value})
  }

  render (){
    let enSizeLst = enSizeList.map((list)=>
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
              innerRef={(ref)=>{this.enSizeSelect = ref}}
              value={this.props.setting.enSize}
              onChange={this.setEnSize}>
              {enSizeLst}
            </SelSize>

          </DivSetMenuPart>
        </DivSetMenuPart>
      </DivSetMenu>
    )}
}

ItemEnSize.propTypes = {
  setting: PropTypes.any,
  name: PropTypes.any,
  setEnSize: PropTypes.any,
}

export default ItemEnSize
