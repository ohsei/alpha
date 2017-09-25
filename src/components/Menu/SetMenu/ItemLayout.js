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
  height: 30px;
  width: ${props=>props.large ? '125px' : '30px'};
  text-align: center;
`
class ItemLayout extends Component{
  constructor (props){
    super(props)
    this.state = {isClicked:false}
    this.setLandscape = this.setLandscape.bind(this)
    this.setPortrait = this.setPortrait.bind(this)
  }

  setPortrait (){
    this.props.setLayout({layout:'portrait'})
  }

  setLandscape (){
    this.props.setLayout({layout:'landscape'})
  }

  render (){
    return (
      <DivSetMenu>
        <ItemSetting large>
          {this.props.name}
        </ItemSetting>
        <ItemSetting
          ref={(ref) => {this.portrait = ref}}
          onClick={this.setPortrait}>縦</ItemSetting>
        <ItemSetting
          ref={(ref) => {this.landscape = ref}}
          onClick={this.setLandscape}>横</ItemSetting>
      </DivSetMenu>
    )}
}

ItemLayout.propTypes = {
  name: PropTypes.any,
  setLayout: PropTypes.any,
}
export default ItemLayout