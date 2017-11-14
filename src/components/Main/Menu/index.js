import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import {dbOperate} from '../../../utils/database'
import {
  GET_ONE_FILE,
  SAVE_ONE_FILE,
} from '../../../utils/const.js'

import SetMenuItem from './SetMenuItem'

const DivOverlap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  background-color: rgba(222,222,222,0.5);
  display: ${props => props.show ? 'block' : 'none'}
`
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
  cursor: pointer;
`
const DivMenu = styled.div`
  position: fixed;
  display: block;
  z-index: 999;
  margin: 5px 0 0 0;
  width: 50px;
  height: 350px;
`
const ItemSetting = Item.extend`
  vertical : ${props => props.vertical};
  margin: 0 0 10px 0;
  padding: 10px 0 5px 0;
  >a {
    color: white;
    text-decoration: none;
    :hover {
      color: white;
    }
  }
`

class Menu extends Component {
  constructor (props){
    super(props)
    this.onShowFileDialog = this.onShowFileDialog.bind(this)
    this.onSaveFile = this.onSaveFile.bind(this)
    this.onPrint = this.onPrint.bind(this)
    this.onCreateNewFile = this.onCreateNewFile.bind(this)
  }

  onShowFileDialog (){
    const {onShowFileDialog} = this.props
    onShowFileDialog()
  }

  onSaveFileOver = () => {
    alert('ファイルを保存しました。')
  }
  confirmOverWrite = (e) => {
    const {onIsFilelistUpdate, note, setting, saveFileTitle} = this.props
    let objContent = {}

    objContent.note = note
    objContent.setting = setting
    objContent.saveFileTitle = saveFileTitle
    let content = JSON.stringify(objContent)
    const fileObj = {
      filename: this.props.saveFileTitle,
      data: content
    }

    const operateJson = {
      callback: this.onSaveFileOver,
      fileObj: fileObj
    }

    if (e) {
      if (window.confirm('ファイルが存在します。上書きしますか？')) {
        dbOperate(SAVE_ONE_FILE, operateJson)
        onIsFilelistUpdate()
      }
      else {
        console.log('cancel')
      }
    }
    else {
      dbOperate(SAVE_ONE_FILE, operateJson)
      onIsFilelistUpdate()
    }
  }

  onSaveFile (){
    const {saveFileTitle} = this.props

    if (saveFileTitle == ''){
      alert('Please input the file name')
      return
    }
    const operateJson = {
      callback: this.confirmOverWrite,
      filename: saveFileTitle,
    }
    dbOperate(GET_ONE_FILE, operateJson)
  }

  onPrint (){
    const {onPrint} = this.props
    onPrint()
  }

  onCreateNewFile (){
    const {initalNote} = this.props
    initalNote()
  }

  render (){
    const {isShowMenu} = this.props
    return (
      <div>
        <DivMenu>
          <SetMenuItem
            setName='設定'
            {...pick(this.props, keys(SetMenuItem.propTypes))}
          ></SetMenuItem>
          <ItemSetting vertical><a
            ref={(ref) => this.print = ref}
            onClick={this.onPrint}>印刷</a></ItemSetting>
          <ItemSetting vertical><a
            ref={(ref) => {this.save = ref}}
            onClick={this.onSaveFile}>保存</a></ItemSetting>
          <ItemSetting vertical><a
            ref={(ref) => {this.newFile = ref}}
            onClick={this.onCreateNewFile}>新規</a></ItemSetting>
          <ItemSetting vertical><a
            ref={(ref) => {this.open = ref}}
            onClick={this.onShowFileDialog}>開く</a></ItemSetting>
        </DivMenu>
        <DivOverlap show={isShowMenu} />
      </div>
    )
  }
}
Menu.propTypes = {
  saveFileTitle: PropTypes.string,
  loadFile: PropTypes.any,
  note: PropTypes.any,
  setting: PropTypes.object,
  setSetting: PropTypes.any,
  createNewFile: PropTypes.any,
  print: PropTypes.any,
  setShowFileDialog: PropTypes.func,
  onShowFileDialog: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
  onIsFilelistUpdate: PropTypes.func.isRequired,
  updateSetting: PropTypes.func.isRequired,
  initalNote: PropTypes.func.isRequired,
  updateWidth: PropTypes.func.isRequired,
  isShowMenu: PropTypes.bool,
}

export default Menu