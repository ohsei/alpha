import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {dbOperate} from '../../utils/database'

import SetMenuItem from './SetMenu/SetMenuItem'

const Item = styled.div`
  width: 30px;
  background-color: orange;
  color:white;
  -webkit-writing-mode: ${props => props.vertical ? 'vertical-lr' : 'horizontal-tb'};
  -ms-writing-mode:  ${props => props.vertical ? 'tb-lr' : 'lr-tb'};
  writing-mode: ${props => props.vertical ? 'tb-lr' : 'lr-tb'};
  text-orientation:upright;
  height: 40px;
  border: 0.1px solid white;
  flex-direction:row;
  line-height: 30px;
`

const DivMenu = styled.div`
  display: block;
  z-Index: 99;
  margin: 5px 0 0 0;
  width: 50px;
  height: 350px;
`
const ItemSetting = Item.extend`
  vertical : ${props => props.vertical};
  margin: 0 0 10px 0;
  padding: 10px 0 5px 0;
`
const InputFileOpen = styled.input`
  display: none;
`
const ItemSave = ItemSetting.withComponent('a')
const ItemOpen = ItemSetting.withComponent('label')
const ItemPrint = ItemSetting.withComponent('a')
const ItemNew = ItemSetting.withComponent('a')

class Menu extends Component {
  constructor (props){
    super(props)
    this.setSetting = this.setSetting.bind(this)
    this.openFile = this.openFile.bind(this)
    this.saveFile = this.saveFile.bind(this)
    this.onPrint = this.onPrint.bind(this)
    this.createNewFile = this.createNewFile.bind(this)
    this.printSegments = this.printSegments.bind(this)
  }

  setSetting (param){
    this.props.setSetting(param)
  }

  openFile (){
    this.props.setShowFileDialog(true)

  }

  confirmOverWrite = (e) => {
    let objContent = {}

    objContent.note = this.props.note
    objContent.setting = this.props.setting
    objContent.saveFileTitle = this.props.saveFileTitle
    let content = JSON.stringify(objContent)
    const fileObj = {
      filename: this.props.saveFileTitle,
      data: content
    }

    if (e) {
      if (window.confirm('ファイルが存在します。上書きしますか？')) {
        dbOperate(1, null, fileObj)
        this.props.updateFilelist(true)
      }
      else {
        console.log('cancel')
      }
    }
    else {
      dbOperate(1, null, fileObj)
      this.props.updateFilelist(true)
    }
  }

  saveFile (){
    if (this.props.saveFileTitle == ''){
      alert('Please input the file name')
      return
    }
    dbOperate(4, null, null, this.props.saveFileTitle, null, this.confirmOverWrite)
  }

  onPrint (){
    this.props.print()
  }
  createNewFile (){
    this.props.createNewFile()
  }
  printSegments (){
    this.props.printSegments()
  }


  render (){
    return (
      <DivMenu>
        <SetMenuItem name='設定'
          setSetting={this.setSetting}
        ></SetMenuItem>
        <ItemSetting vertical><a
          ref={(ref) => this.print = ref}
          onClick={this.onPrint}>印刷</a></ItemSetting>
        <ItemSetting vertical><a
          ref={(ref) => {this.save = ref}}
          onClick={this.saveFile}>保存</a></ItemSetting>
        <ItemSetting vertical><a
          ref={(ref) => {this.newFile = ref}}
          onClick={this.createNewFile}>新規</a></ItemSetting>
        <ItemSetting vertical><a
          ref={(ref) => {this.open = ref}}
          onClick={this.openFile}>開く</a></ItemSetting>
      </DivMenu>
    )
  }
}
Menu.propTypes = {
  saveFileTitle: PropTypes.any,
  loadFile: PropTypes.any,
  note: PropTypes.any,
  setting: PropTypes.any,
  setSetting: PropTypes.any,
  createNewFile: PropTypes.any,
  printSegments: PropTypes.any,
  print: PropTypes.any,
  setShowFileDialog: PropTypes.func,
  updateFilelist: PropTypes.func,
}

export default Menu