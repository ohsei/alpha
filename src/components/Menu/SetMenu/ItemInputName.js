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

const ItemSetting = Item.extend`
  height: 28px;
  width: 156px;
  text-align: center;
`

class ItemInputName extends Component{
  constructor (props){
    super(props)
    this.setLineNum = this.setLineNum.bind(this)
  }

  setLineNum (){
    this.props.setLineNum({lineNum:this.lineNumSelect.value})
  }

  render (){

    return (
      <DivSetMenu>
        <ItemSetting >
          {this.props.name}
        </ItemSetting>
      </DivSetMenu>
    )}
}

ItemInputName.propTypes = {
  setting: PropTypes.any,
  name: PropTypes.any,
  setLineNum: PropTypes.any,
}

export default ItemInputName
