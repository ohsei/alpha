import React, {Component} from 'react'
import PropTypes from 'prop-types'

import SetMenuItem from './SetMenu/SetMenuItem'

import styled from 'styled-components'

const Item = styled.div`
  width: 30px;
  background-color: orange;
  color:white;
  -webkit-writing-mode: ${props=>props.vertical ? 'vertical-lr' : 'horizontal-tb'};
  -ms-writing-mode:  ${props=>props.vertical ? 'tb-lr' : 'lr-tb'};
  writing-mode: ${props=>props.vertical ? 'tb-lr' : 'lr-tb'};
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
  vertical : ${props=>props.vertical};
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

  openFile (event){
    let file = event.target.files[0] // FileList object

    if (file != null){
      // Loop through the FileList and render image files as thumbnails.
      // for (let i = 0, f; f = files[i]; i++) {
      var reader = new FileReader()

      reader.onload = function (){
        var fileStr = reader.result
        let tmpArticle = JSON.parse(fileStr)
        this.props.loadFile({article:tmpArticle})
      }.bind(this)

      reader.readAsText(file)
    }
  }

  saveFile (){
    if (this.props.saveFileTitle == ''){
      alert('Please input the file name')
      return
    }

    let objContent = this.props.article
    objContent.setting = this.props.setting
    let content = JSON.stringify(objContent)
    var blob = new Blob([content], {type: 'text/plain;charset=utf-8'})

    if(window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, this.props.saveFileTitle)
      //window.navigator.msSaveOrOpenBlob(blob,"test.txt");
    }else{
      this.save.download = this.props.saveFileTitle
      this.save.href = window.URL.createObjectURL(blob)
    }
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
        <SetMenuItem name="設定"
          setSetting={this.setSetting}
        ></SetMenuItem>
        <ItemSetting vertical><a
          ref={(ref) => this.print = ref}
          onClick={this.onPrint}>印刷</a></ItemSetting>
        <ItemSetting vertical><a
          ref={(ref) => {this.save = ref}}
          onClick={this.saveFile}>保存</a></ItemSetting>
        <ItemSetting vertical><a
          ref={(ref)=>{this.newFile = ref}}
          onClick={this.createNewFile}>新規</a></ItemSetting>
        <ItemSetting vertical><label htmlFor="fileopen">
          開く
        </label></ItemSetting>
        <InputFileOpen id="fileopen" type="file"
          innerRef={(ref) => {this.open = ref}}
          onChange={this.openFile} />
      </DivMenu>
    )
  }
}
Menu.propTypes = {
  saveFileTitle: PropTypes.any,
  loadFile: PropTypes.any,
  article: PropTypes.any,
  setting: PropTypes.any,
  setSetting: PropTypes.any,
  createNewFile: PropTypes.any,
  printSegments: PropTypes.any,
  print: PropTypes.any,
}

export default Menu