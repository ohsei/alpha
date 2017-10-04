import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import html2canvas from 'html2canvas'
import {getBrowserType} from '../utils/browserType'
import Flines_block_Regular_chrome from '../resources/font/4lines_block-Regular.otf'
import Flines_block_Regular_ie from '../resources/font/4lines_block-regular-webfont.eot'

import Menu from './Menu/Menu'
import Segments from './SegmentPart/Segments'
import PrintNote from './Print/PrintNote'

injectGlobal`
@font-face {
   font-family: 'MyFamilyIE';
   src: url('${Flines_block_Regular_ie}');
}
@font-face {
  font-family: 'MyFamilyCHROME';
  src: url('${Flines_block_Regular_chrome}');
}
`
const defaultWidth = 1200
const strDefaultWidth = defaultWidth.toString() + 'px'

/* define layout start*/

const DivBg = styled.div.attrs({
  tabIndex: -1,
})`
  display: ${props => props.isPrint ? 'none' : 'block'};
  position: relative;
  background-color: lightgreen;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
`
const DivFixed = styled.div.attrs({
  tabIndex: -1,
})`
  position:fixed;
  width:100%;
  z-index:9;
  top:0;
  left:0;
`
const DivTitle = styled.div.attrs({
  tabIndex: -1,
})`
  position: fixed;
  
  z-index: 99;
  top: 0px;
  left: 0px;

  display: flex;
  display: -ms-flex;
  flex-direction: row;
  -ms-flex-direction: row;
  text-align: center;
  justify-content: flex-start;
  height: 40px;

  width: ${props => props.width};
`
const DivMenu = styled.div.attrs({
  tabIndex: -1,
})`
  position: fixed;
  z-index: 999;
  top: 50px;
  left: 5px;
`
const StyleEditArea = styled.div.attrs({
  tabIndex: -1,
})`
  position: fixed;
  display: flex;
  top: 40px;
  left: 50px;
  width: 90%;
  padding: 10px 0px 20px 0px;
  height: 50px;
  background-color: lightgreen;
  z-index: 99
`
const DivSegments = styled.div`
  z-index: 0;
  margin: 150px 0 0 50px;
  width: ${props => `${props.width}px`};

  @media print{
    margin: 0;
    padding: 0;
  }
`
const InSetColor = styled.input.attrs({
  tabIndex: -1,
})`
  height: 50px;
`
const Button = styled.button.attrs({
  tabIndex: -1,
})`
  width: 50px;
  height: 50px;
  border: ${props => {if (props.active == true) {return '2px solid black'} else {return '1px solid lightgray'}}};
  font-size: 1.5em;
  color: #aaa;
  text-align: center;
  text-decoration: ${props => {if (props.active == true) {return 'underline'} else {return 'none'}}};
  background-color: white;
`
const DivFixedTitle = styled.div.attrs({
  tabIndex: -1,
})`
  background-color: lightgreen;
  width: 20%;
  font-size: 30px;
  color: white;
`
const TitleBorder = styled.div.attrs({
  tabIndex: -1,
})`
  margin: 4px 0 0 0;
  width: 80%;
  border: 2px solid orange;
  background-color: white;
`
const InFileTitle = styled.input.attrs({
  tabIndex: -1,
})`
  margin: 0;
  width: 100%;
  height: auto;
  font-size:24px;
  border: none;
`
/* define layout end*/


const enWordSize = 27
const bigWordEnSize = 40
const spaceWordEnSize = 48
const otherWordEnSize = 20

const enWordSizeBigger = enWordSize * 1.5
const bigWordEnSizeBigger = bigWordEnSize * 1.5
const spaceWordEnSizeBigger = spaceWordEnSize * 1.5
const otherWordEnSizeBigger = otherWordEnSize * 1.5

const landscapeWidth = defaultWidth * 1.5
const portraitWidth = defaultWidth
const defaultSetting = {
  layout: 'portrait',
  jaPos: 'up',
  enSize: '60pt',
  upJaSize: '24pt',
  downJaSize: 'オフ',
  lineColor: 'lightgray',
  lineNum: 4,
  interval: '24pt',
  lineNos: 0,
}
const browserType = getBrowserType()

const PrintOrientation = (object) => {
  if (object.layout == 'landscape'){
    return (
      <style type='text/css'>
        {'@media print{@page {size: A4 landscape; margin: 0}}'}
      </style>
    )
  }
  else {
    return (
      <style type='text/css'>
        {'@media print{@page {size: A4 portrait; margin: 0}}'}
      </style>
    )
  }
}

class Main extends Component {
  constructor (props){
    super(props)
    this.state = {
      note: [
        {
          id: 0,
          type: 'txtOnly',
          html: '',
          jaHtml: '',
          dataUrl: '',
          isPageBreak: false,
          offsetHeight: 0,
        }
      ],
      saveFileTitle: '',
      curSegmentNo: 0,
      width: defaultWidth,
      setting: defaultSetting,
      name: '',
      isPrint: false,
      imeMode: 'inactive',
      isBoldBtnActive: false,
      isItalicBtnActive: false,
      isUnderLineBtnActive: false,
      isCtrlKeyPressed: false,
      isEnterKeyPressed: false,
      tabNodeList: [],
    }
    /* 編集中セグメントの選択 */
    this.setCurSegment = this.setCurSegment.bind(this)
    /* セグメントの追加 */
    this.addSegment = this.addSegment.bind(this)
    /* セグメントの削除 */
    this.delSegment = this.delSegment.bind(this)
    /* 文章タイトルの設定 */
    this.setFileTitle = this.setFileTitle.bind(this)
    /* 文章ロード処理 */
    this.loadFile = this.loadFile.bind(this)
    /* 設定メニュー処理 */
    this.setSetting = this.setSetting.bind(this)
    /* 色設定 */
    this.setColor = this.setColor.bind(this)
    /* Bold設定 */
    this.setBold = this.setBold.bind(this)
    /* italic設定 */
    this.setItalic = this.setItalic.bind(this)
    /* underline設定 */
    this.setUnderline = this.setUnderline.bind(this)
    /* 新規ファイル作成 */
    this.createNewFile = this.createNewFile.bind(this)
    /* 画像設定 */
    this.setImg = this.setImg.bind(this)
    /* type設定 */
    this.setType = this.setType.bind(this)

    /* 改ページ追加 */
    this.addPageBreak = this.addPageBreak.bind(this)
    /* 印刷 */
    this.print = this.print.bind(this)
    /* 印刷完了処理 */
    this.printFinish = this.printFinish.bind(this)

    this.onInputChange = this.onInputChange.bind(this)

    this.updateHtml = this.updateHtml.bind(this)
    this.updateJaHtml = this.updateJaHtml.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.addTabNode = this.addTabNode.bind(this)
    this.delTabNode = this.delTabNode.bind(this)
    this.updateTabNode = this.updateTabNode.bind(this)
  }

  createNewFile (){
    let note =  [
      {
        id: 0,
        type: 'txtOnly',
        html: '',
        jaHtml: '',
        dataUrl: '',
        isPageBreak: false,
        offsetHeight: 0,
      }
    ]
    this.saveFileTitle.value = ''
    this.colorChange.value = '#000'
    this.setState({note: note})
    this.setState({saveFileTitle: ''})
    this.setState({curSegmentNo: 0})
    this.setState({nowLanguage: 'english'})
    this.setState({imeMode: 'inactive'})
    this.setState({isBoldBtnActive: false})
    this.setState({isItalicBtnActive: false})
    this.setState({isUnderLineBtnActive: false})
  }


  setSetting (param){
    this.setState({setting: param.setting})

    switch (param.setting.layout){
    case 'portrait':
      this.setState({width: portraitWidth})
      break

    case 'landscape':
      this.setState({width: landscapeWidth})
      break
    }

    switch (param.setting.enSize){
    case '60pt':
      this.setState({enWordSize: enWordSize})
      this.setState({bigWordEnSize: bigWordEnSize})
      this.setState({spaceWordEnSize: spaceWordEnSize})
      this.setState({otherWordEnSize: otherWordEnSize})
      break

    case '80pt':
      this.setState({enWordSize: enWordSizeBigger})
      this.setState({bigWordEnSize: bigWordEnSizeBigger})
      this.setState({spaceWordEnSize: spaceWordEnSizeBigger})
      this.setState({otherWordEnSize: otherWordEnSizeBigger})
      break
    }
  }

  loadFile (file){
    const curSegmentNo = file.note.length - 1
    this.setState({setting: file.setting})
    this.setState({note: file.note})
    this.setState({curSegmentNo: curSegmentNo})
    this.setState({saveFileTitle: file.saveFileTitle})
    this.saveFileTitle.value = file.saveFileTitle
  }

  setFileTitle (event){
    const saveFileTitle = event.target.value

    this.setState({saveFileTitle: saveFileTitle})
  }

  addSegment (id){
    let note = this.state.note
    let curNo = id

    for (let i = curNo + 1;i < note.length;i++){
      note[i].id++
    }
    curNo++
    note.splice(curNo, 0, {id: curNo, type: 'txtOnly', html: '', jaHtml: '', dataUrl: '', isPageBreak: false, offsetHeight: 0,})

    this.setState({note: note})
    this.setCurSegment(curNo)
  }

  delSegment (id){
    let note = this.state.note
    let curNo = id

    for (let i = curNo + 1;i < note.length;i++){
      note[i].id--
    }
    note.splice(curNo, 1)
    this.setState({note: note})
    this.setCurSegment(curNo - 1)
  }

  updateHtml (object){
    const note = this.state.note 
    note[this.state.curSegmentNo].html = object.html
    note[this.state.curSegmentNo].offsetHeight = object.offsetHeight
    this.setState({note: note})
  }

  updateJaHtml (object){
    const note = this.state.note
    note[this.state.curSegmentNo].jaHtml = object.jaHtml
    this.setState({note: note})
  }

  setCurSegment (curNo) {
    this.setState({curSegmentNo: curNo})
    
    this.colorChange.value = '#000000'
  }

  setBold (){
     this.segments.setBold()
  }
  setItalic (){
    this.segments.setItalic()
  }

  setUnderline (){
    this.segments.setUnderline()
  }

  setColor (){
    this.segments.setColor(this.colorChange.value)

  }

  onInputChange (event){

   // this.inputText.value = this.inputText.value.replace(/[^\x01-\x7E]/, '')

  }
  setImg (object){
    let note = this.state.note
    note[this.state.curSegmentNo].dataUrl = object.img

    this.setState({note: note})
  }

  setType (object){
    let note = this.state.note
    note[object.id].type = object.type
    this.setState({note: note})
    if (object.id != this.state.curSegmentNo){
      this.setState({curSegmentNo: object.id})
    }
  }

  addPageBreak (id){
    let note = this.state.note
    note[id].isPageBreak = true
    this.addSegment(id)

    this.setState({note: note})
    
  }

  print (){

    if (this.state.isPrint == true){
      this.PrintNote.onClearLoadstateArray()
    } else {
      this.setState({isPrint: true})
    }

  }

  printFinish (){
    this.setState({isPrint: false})
  }

  onKeyDown (event){
    if (event.keyCode==9){
      console.log('child count: %d', this.div.childElementCount)
    }
  }

  addTabNode (object){
    let tabNodeList = this.state.tabNodeList
    tabNodeList.splice(object.id, 0, object)
    this.setState({tabNodeList: tabNodeList})
  }

  delTabNode (id){
    let tabNodeList = this.state.tabNodeList
    let i = 0
    while (tabNodeList[i].id != id){
      i++
    }
    tabNodeList.splice(i, 1)
    this.setState({tabNodeList: tabNodeList})
  }

  updateTabNode (object){
    let tabNodeList = this.state.tabNodeList
    tabNodeList[object.id] = object
    this.setState({tabNodeList: tabNodeList})
  }

  render () {
    return (
      <div onKeyDown={this.onKeyDown} ref={ref=>this.div=ref} >
        <PrintOrientation layout={this.state.setting.layout} />
        <DivBg innerRef={ref => this.bg = ref} isPrint={this.state.isPrint}>
          <DivFixed>
            <DivTitle width={`${this.state.width}px`}>
              <DivFixedTitle> 4線マスター</DivFixedTitle>
              <TitleBorder>
                <InFileTitle
                  type='text'
                  placeholder='新規ファイル'
                  innerRef={(ref) => {this.saveFileTitle = ref}}
                  onChange={this.setFileTitle} />
              </TitleBorder>
            </DivTitle>

            <DivMenu>
              <Menu
                ref={ref => this.Menu = ref}
                saveFileTitle={this.state.saveFileTitle}
                note={this.state.note}
                setting={this.state.setting}
                loadFile={this.loadFile}
                setSetting={this.setSetting}
                createNewFile={this.createNewFile}
                print={this.print}
              />
            </DivMenu>
            <StyleEditArea>
              <InSetColor
                type='color'
                list
                innerRef={ref => this.colorChange = ref}
                onChange={this.setColor}
              />
              <Button
                active={this.state.isBoldBtnActive}
                innerRef={ref => this.boldChange = ref}
                onClick={this.setBold}>
                B
              </Button>
              <Button
                active={this.state.isItalicBtnActive}
                innerRef={ref => this.italicChange = ref}
                onClick={this.setItalic}>
                /
              </Button>
              <Button
                active={this.state.isUnderLineBtnActive}
                ref={ref => this.underlineChange = ref}
                onClick={this.setUnderline}>
                U
              </Button>
            </StyleEditArea>
          </DivFixed>
          <DivSegments
            innerRef={(ref) => {this.allSegs = ref}}
            width={this.state.width}>
            <Segments
              ref={ref => this.segments = ref}
              isPrint={this.state.isPrint}
              title={this.state.saveFileTitle}
              width={this.state.width}
              curSegmentNo={this.state.curSegmentNo}
              setting={this.state.setting}
              note={this.state.note}
              addSegment={this.addSegment}
              delSegment={this.delSegment}
              addPageBreak={this.addPageBreak}
              setCurSegment={this.setCurSegment}
              updateHtml={this.updateHtml}
              updateJaHtml={this.updateJaHtml}
              setType={this.setType}
              setImg={this.setImg}
              tabNodeList={this.state.tabNodeList}
              addTabNode={this.addTabNode}
              delTabNode={this.delTabNode}
              updateTabNode={this.updateTabNode}
              isJaSizeChanged={this.isJaSizeChanged} />
          </DivSegments>
        </DivBg>
        <PrintNote
          width={this.state.width}
          isPrint={this.state.isPrint}
          ref={(ref) => {this.PrintNote = ref}}
          title={this.state.saveFileTitle}
          note={this.state.note}
          setting={this.state.setting}
          printFinish={this.printFinish}
          updateHtml={this.updateHtml}
          updateJaHtml={this.updateJaHtml}
          addSentence={this.addSentence}
          delSentence={this.delSentence}
          namelist={[{id: 0, name: '四線太郎'}]} />
        
      </div>
    )
  }
}

export default Main

