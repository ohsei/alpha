import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import ItemLayout from './ItemLayout'
import ItemJaSize from './ItemJaSize'
import ItemEnSize from './ItemEnSize'
import ItemLineColor from './ItemLineColor'
import ItemLineNum from './ItemLineNum'
import ItemInterval from './ItemInterval'
import ItemLineNos from './ItemLineNos'
import ItemInputName from './ItemInputName'


/* define layout start */
const Item = styled.div`
  width: 30px;
  background-color: orange;
  color: white;
  -webkit-writing-mode: ${props => props.vertical ? 'vertical-lr' : 'horizontal-tb'};
  -ms-writing-mode:  ${props => props.vertical ? 'tb-lr' : 'lr-tb'};
  writing-mode: ${props => props.vertical ? 'tb-lr' : 'lr-tb'};
  text-orientation: upright;
  height: 50px;
  border: 0.1px solid white;
  flex-direction:row;
  line-height: 30px;
`
const DivSetMenu = styled.div`
  display: flex;
  flex-direction: row;
  -ms-flex-direction: row;
  justify-content: flex-start;
`
const DivSetMenuDetail = styled.div`
  display: ${props => props.clicked ? 'block' : 'none'};
`

const ItemSetting = Item.extend`
  vertical: ${props => props.vertical};
  height: ${props => props.clicked ? '258px' : '50px'};
  margin: 0 0 10px 0;
  padding: 10px 0 5px 0;
`

class SetMenuItem extends Component{
  constructor (props){
    super(props)
    this.state = {
      isClicked: false,
    }
    this.onSettingClick = this.onSettingClick.bind(this)
  }

  onSettingClick (){
    this.setState(prevState => ({
      isClicked: !prevState.isClicked
    }))
  }

  componentDidUpdate () {
    const {onShowMenu} = this.props
    onShowMenu(this.state.isClicked)
  }
  render (){
    return (
      <DivSetMenu>
        <ItemSetting vertical
          ref={(ref) => {this.setting = ref}}
          clicked={this.state.isClicked}
          onClick={this.onSettingClick}>
          {this.props.setName}
        </ItemSetting>
        <DivSetMenuDetail clicked={this.state.isClicked}>
          <ItemLayout
            name='用紙設定'
            {...pick(this.props, keys(ItemLayout.propTypes))}>
          </ItemLayout>
          <ItemJaSize
            name='和文'
            {...pick(this.props, keys(ItemJaSize.propTypes))}>
          </ItemJaSize>
          <ItemEnSize
            name='英字'
            {...pick(this.props, keys(ItemEnSize.propTypes))}
          >
          </ItemEnSize>
          <ItemLineColor
            name='線の濃さ'
            {...pick(this.props, keys(ItemLineColor.propTypes))}
          >
          </ItemLineColor>
          <ItemLineNum
            name='線の本数'
            {...pick(this.props, keys(ItemLineNum.propTypes))}
          >
          </ItemLineNum>
          <ItemInterval
            name='行間'
            {...pick(this.props, keys(ItemInterval.propTypes))}
          >
          </ItemInterval>
          <ItemLineNos
            name='行番'
            {...pick(this.props, keys(ItemLineNos.propTypes))}
          >
          </ItemLineNos>
          <ItemInputName
            name='名前入力'
          >
          </ItemInputName>
        </DivSetMenuDetail>
      </DivSetMenu>
    )
  }
}

SetMenuItem.propTypes = {
  setName: PropTypes.string,
  setting: PropTypes.object,
  updateSetting: PropTypes.func.isRequired,
  updateWidth: PropTypes.func.isRequired,
  onShowMenu: PropTypes.func.isRequired,
}

export default SetMenuItem