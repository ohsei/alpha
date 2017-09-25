import React, {Component} from 'react'
import PropTypes from 'prop-types'

import ItemLayout from './ItemLayout'
import ItemJaSize from './ItemJaSize'
import ItemEnSize from './ItemEnSize'
import ItemLineColor from './ItemLineColor'
import ItemLineNum from './ItemLineNum'
import ItemInterval from './ItemInterval'
import ItemLineNos from './ItemLineNos'
import ItemInputName from './ItemInputName'

import styled from 'styled-components'

/* define layout start */
const Item = styled.div`
  width: 30px;
  background-color: orange;
  color: white;
  -webkit-writing-mode: ${props=>props.vertical ? 'vertical-lr' : 'horizontal-tb'};
  -ms-writing-mode:  ${props=>props.vertical ? 'tb-lr' : 'lr-tb'};
  writing-mode: ${props=>props.vertical ? 'tb-lr' : 'lr-tb'};
  text-orientation:upright;
  height: 40px;
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
  display: ${props=>props.clicked ? 'block' : 'none'};
`

const ItemSetting = Item.extend`
  vertical: ${props=>props.vertical};
  height: ${props => props.clicked ? '262px' : '35px'};
  margin: 0 0 10px 0;
  padding: 10px 0 5px 0;
`
const defaultSetting = {
  layout:'portrait',
  jaPos:'up',
  enSize:'60pt',
  upJaSize:'24pt',
  downJaSize:'オフ',
  lineColor:'lightgray',
  lineNum:4,
  interval:'24pt',
  lineNos: 0,
}

class SetMenuItem extends Component{
  constructor (props){
    super(props)
    this.state = {
      isClicked:false,
      setting: defaultSetting,
    }
    this.setLayout = this.setLayout.bind(this)
    this.setUpJaSize = this.setUpJaSize.bind(this)
    this.setDownJaSize = this.setDownJaSize.bind(this)
    this.setEnSize = this.setEnSize.bind(this)
    this.onSettingClick = this.onSettingClick.bind(this)
    this.setLineColor = this.setLineColor.bind(this)
    this.setLineNum = this.setLineNum.bind(this)
    this.setInterval = this.setInterval.bind(this)
    this.setLineNos = this.setLineNos.bind(this)
  }

  setUpJaSize (param){
    let newSetting = this.state.setting
    newSetting.upJaSize = param.upJaSize
    newSetting.downJaSize = param.downJaSize
    newSetting.jaPos = param.jaPos
    this.setState({setting:newSetting})
    this.props.setSetting({setting:this.state.setting})
  }

  setDownJaSize (param){
    let newSetting = this.state.setting
    newSetting.upJaSize = param.upJaSize
    newSetting.downJaSize = param.downJaSize
    newSetting.jaPos = param.jaPos

    this.setState({setting:newSetting})
    this.props.setSetting({setting:this.state.setting})
  }

  setEnSize (param){
    let newSetting = this.state.setting
    newSetting.enSize = param.enSize

    this.setState({setting:newSetting})
    this.props.setSetting({setting:this.state.setting})
  }

  setLineColor (param){
    let newSetting = this.state.setting
    newSetting.lineColor = param.lineColor

    this.setState({setting:newSetting})
    this.props.setSetting({setting:this.state.setting})
  }

  setInterval (param){
    let newSetting = this.state.setting
    newSetting.interval = param.interval

    this.setState({setting:newSetting})
    this.props.setSetting({setting:this.state.setting})
  }

  setLineNum (param){
    let newSetting = this.state.setting
    newSetting.lineNum = param.lineNum

    this.setState({setting:newSetting})
    this.props.setSetting({setting:this.state.setting})
  }

  setLineNos (param){
    let newSetting = this.state.setting
    newSetting.lineNos = param.lineNos

    this.setState({setting:newSetting})
    this.props.setSetting({setting:this.state.setting})
  }

  setLayout (param){
    let newSetting = this.state.setting
    newSetting.layout = param.layout
    this.setState({setting:newSetting})
    this.props.setSetting({setting:this.state.setting})
  }

  onSettingClick (){
    this.setState(prevState => ({
      isClicked: !prevState.isClicked
    }))
  }

  render (){
    return (
      <DivSetMenu>
        <ItemSetting vertical
          ref={(ref) => {this.setting = ref}}
          clicked={this.state.isClicked}
          onClick={this.onSettingClick}>
          {this.props.name}
        </ItemSetting>
        <DivSetMenuDetail clicked={this.state.isClicked}>
          <ItemLayout
            name="用紙設定"
            setLayout={this.setLayout}>
          </ItemLayout>
          <ItemJaSize
            name="和文"
            setting={this.state.setting}
            setUpJaSize={this.setUpJaSize}
            setDownJaSize={this.setDownJaSize}>
          </ItemJaSize>
          <ItemEnSize
            name="英字"
            setting={this.state.setting}
            setEnSize={this.setEnSize}
          >
          </ItemEnSize>
          <ItemLineColor
            name="線の濃さ"
            setting={this.state.setting}
            setLineColor={this.setLineColor}
          >
          </ItemLineColor>
          <ItemLineNum
            name="線の本数"
            setting={this.state.setting}
            setLineNum={this.setLineNum}
          >
          </ItemLineNum>
          <ItemInterval
            name="行間"
            setting={this.state.setting}
            setInterval={this.setInterval}
          >
          </ItemInterval>
          <ItemLineNos
            name="行番"
            setting={this.state.setting}
            setLineNos={this.setLineNos}
          >
          </ItemLineNos>
          <ItemInputName
            name="名前入力"
          >
          </ItemInputName>
        </DivSetMenuDetail>
      </DivSetMenu>
    )
  }
}

SetMenuItem.propTypes = {
  name: PropTypes.any,
  setSetting: PropTypes.any,
}

export default SetMenuItem