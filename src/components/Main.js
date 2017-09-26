import React, { Component } from 'react'
import Menu from './Menu/Menu'
import Segments from './SegmentPart/Segments'

import PrintArticle from './Print/PrintArticle'
import styled, { injectGlobal } from 'styled-components'
import {getBrowserType} from '../utils/browserType'
import Flines_block_Regular_chrome from '../resources/font/4lines_block-Regular.otf'
import Flines_block_Regular_ie from '../resources/font/4lines_block-regular-webfont.eot'

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

const DivBg = styled.div`
  display: ${props => props.isPrint ? 'none' : 'block'};
  position: relative;
  background-color: lightgreen;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
`
const DivFixed = styled.div`
  position:fixed;
  width:100%;
  z-index:9;
  top:0;
  left:0;
`
const DivTitle = styled.div`
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
const DivMenu = styled.div`
  position: fixed;
  z-index: 999;
  top: 50px;
  left: 5px;
`
const StyleEditArea = styled.div`
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
  width: ${props => props.width};

  @media print{
    margin: 0;
    padding: 0;
  }
`
const InSetColor = styled.input`
  height: 50px;
`
const Button = styled.button`
  width: 50px;
  height: 50px;
  border: ${props => {if (props.active == true) {return '2px solid black'} else {return '1px solid lightgray'}}};
  font-size: 1.5em;
  color: #aaa;
  text-align: center;
  text-decoration: ${props => {if (props.active == true) {return 'underline'} else {return 'none'}}};
  background-color: white;
`
const DivFixedTitle = styled.div`
  background-color: lightgreen;
  width: 20%;
  font-size: 30px;
  color: white;
`
const TitleBorder = styled.div`
  margin: 4px 0 0 0;
  width: 80%;
  border: 2px solid orange;
  background-color: white;
`
const InFileTitle = styled.input`
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
          marginTopArray: [{
            marginTop: 0
          }]
        }
      ],
      article: {
        segments: [{id: 0, type: 'txtOnly', dataUrl: '', jaSentence: '', isPageBreak: false, sentences: [{id: 0, words: []}]}],
        setting: {},
        saveFileTitle: '',
      },
      curSegmentNo: 0,
      width: defaultWidth,
      enWordSize: enWordSize,
      bigWordEnSize: bigWordEnSize,
      otherWordEnSize: otherWordEnSize,
      spaceWordEnSize: spaceWordEnSize,
      setting: defaultSetting,
      nowLanguage: 'english',
      name: '',
      calWordWidth: 0,
      printSegments: '',
      isPrint: false,
      imeMode: 'inactive',
      isBoldBtnActive: false,
      isItalicBtnActive: false,
      isUnderLineBtnActive: false,
      isCtrlKeyPressed: false,
      isEnterKeyPressed: false,
    }
    /* セグメントの追加、削除 */
    this.editSegments = this.editSegments.bind(this)
    /* 編集中セグメントの選択 */
    this.setCurSegment = this.setCurSegment.bind(this)
    /* セグメントの追加、called by editSegments */
    this.addSegment = this.addSegment.bind(this)
    /* セグメントの削除、called by editSegments */
    this.delSegment = this.delSegment.bind(this)
    /* 文章タイトルの設定 */
    this.setFileTitle = this.setFileTitle.bind(this)
    /* 文章ロード処理 */
    this.loadFile = this.loadFile.bind(this)
    /* 設定メニュー処理 */
    this.setSetting = this.setSetting.bind(this)
    /* 入力欄処理 */
    this.onInputKeyup = this.onInputKeyup.bind(this)
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
    /* 英字文字サイズ取得 */
    this.getEnWordSize = this.getEnWordSize.bind(this)
    /* 改ページ追加 */
    this.addPageBreak = this.addPageBreak.bind(this)
    /* 印刷 */
    this.print = this.print.bind(this)
    /* 印刷完了処理 */
    this.printFinish = this.printFinish.bind(this)
    /* 入力キー制御 */
    this.keyDown = this.keyDown.bind(this)
    /* 入力エリアキー制御 */
    this.onInputKeyDown = this.onInputKeyDown.bind(this)

    this.onInputChange = this.onInputChange.bind(this)

    this.onPaste = this.onPaste.bind(this)

    this.addSentence = this.addSentence.bind(this)
    this.delSentence = this.delSentence.bind(this)
    this.updateNote = this.updateNote.bind(this)
  }

  onPaste (e){
    e.preventDefault()
    var text

    if (window.clipboardData) {
      text = window.clipboardData.getData('text')
    } else {
      text = e.clipboardData.getData('text/plain')
    }

    if (document.selection) {
      // 〜Internet Explorer 10
      var range = document.selection.createRange()
      range.text = text
    } else {
      // Internet Explorer 11/Chrome/Firefox
      var selection = window.getSelection()
      var range = selection.getRangeAt(0)
      var node = document.createTextNode(text)
      range.insertNode(node)
      range.setStartAfter(node)
      range.setEndAfter(node)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
  createNewFile (){
    let tmpSegments =  [{id: 0, type: 'txtOnly', dataUrl: '', jaSentence: '', isPageBreak: false, sentences: [{id: 0, words: []}]}]
    let tmpSetting = {}
    let tmpArticle = this.state.article
    tmpArticle.segments = tmpSegments
    tmpArticle.setting = tmpSetting
    tmpArticle.saveFileTitle = ''
    this.inputText.value = ''
    this.saveFileTitle.value = ''
    this.colorChange.value = '#000'
    this.setState({article: tmpArticle})
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
    this.setState({setting: file.setting})
    this.setState({note: file.note})
    this.setState({curSegmentNo: file.note.length - 1})
    this.saveFileTitle.value = file.saveFileTitle
  }

  setFileTitle (event){
    let tmpArticle = this.state.article
    tmpArticle.saveFileTitle = event.target.value

    this.setState({article: tmpArticle})
  }

  addSegment (){
    let tmpNote = this.state.note
    let curNo = this.state.curSegmentNo

    for (let i = curNo + 1;i < tmpNote.length;i++){
      tmpNote[i].id++
    }
    curNo++
    tmpNote.splice(curNo, 0, {id: curNo, type: 'txtOnly', html: '', marginTopArray: [{marginTop: 0}]})

    this.setState({note: tmpNote})
    this.setCurSegment({curNo: curNo})
  }

  delSegment (){
    let tmpArticle = this.state.article
    let tmpSegments = tmpArticle.segments
    let curNo = this.state.curSegmentNo

    for (let i = curNo + 1;i < tmpSegments.length;i++){
      tmpSegments[i].id--
    }
    tmpSegments.splice(curNo, 1)
    return tmpArticle
  }

  editSegments (object){
    switch (object.pattern){
    case 'add':{
      let tmpArticle = this.addSegment(object.type)

      let curNo = this.state.curSegmentNo + 1
      this.setState({article: tmpArticle})
      this.setCurSegment({curNo: curNo})
      break
    }

    case 'del':{
      let tmpArticle = this.delSegment()

      let curNo = this.state.curSegmentNo - 1
      this.setState({article: tmpArticle})
      this.setCurSegment({curNo: curNo})
      break
    }
    }
  }
  addSentence (pushObj){
    let note = this.state.note
    note[this.state.curSegmentNo].marginTopArray.push(pushObj)
    this.setState({note: note})
  }
  delSentence (){
    let note = this.state.note
    note[this.state.curSegmentNo].marginTopArray.pop()
    this.setState({note: note})
  }
  updateNote (html){
    let note = this.state.note
    note[this.state.curSegmentNo].html = html
    this.setState({note: note})
  }

  setCurSegment (curNo) {
    this.setState({curSegmentNo: curNo})
  }

  setBold (){
    document.execCommand('bold', false)
  }
  setItalic (){
    document.execCommand('italic', false)
  }

  setUnderline (){
    document.execCommand('underline', false)
  }

  setColor (){
    document.execCommand('ForeColor', false, this.colorChange.value)

  }

  getEnWordSize (word) {
    if (word == 'W'){
      return this.state.bigWordEnSize * 1.5
    }
    else if (word == 'w'){
      return this.state.enWordSize * 1.25
    }
    else if (word.match(/^[A-Z]+$/)){
      return this.state.bigWordEnSize
    }
    else if (word.match(/^[a-z]+$/)){
      return this.state.enWordSize
    }
    else if (word == ' '){
      return this.state.spaceWordEnSize
    }
    else {
      return this.state.otherWordEnSize
    }
  }


  onInputChange (event){

    this.inputText.value = this.inputText.value.replace(/[^\x01-\x7E]/, '')

  }
  onInputKeyDown (event){

    if (event.which == 13){
      this.setState({isEnterKeyPressed: true})
    }

    if (event.ctrlKey){
      this.setState({isCtrlKeyPressed: true})
    }
  }


  onInputKeyup (event){

    if (this.state.isCtrlKeyPressed && this.state.isEnterKeyPressed){
      this.editSegments({pattern: 'add', type: 'txtOnly'})
      this.setState({isCtrlKeyPressed: false})
      this.setState({isEnterKeyPressed: false})
      return
    }
    /* 入力チェック */

    let tmpSegment = {id: this.state.curSegmentNo, type: 'txtOnly', dataUrl: '', jaSentence: '', isPageBreak: false, sentences: [{id: 0, words: []}]}
    let tmpArticle = this.state.article
    let curSegmentNo = this.state.curSegmentNo
    let sentences = tmpArticle.segments[curSegmentNo].sentences
    let lineNo = 0

    tmpSegment.type = this.state.article.segments[this.state.curSegmentNo].type
    tmpSegment.dataUrl = this.state.article.segments[this.state.curSegmentNo].dataUrl
    tmpSegment.isPageBreak = this.state.article.segments[this.state.curSegmentNo].isPageBreak
    tmpSegment.jaSentence = tmpArticle.segments[curSegmentNo].jaSentence

    if (this.state.nowLanguage == 'japanese'){
      tmpSegment = this.state.article.segments[this.state.curSegmentNo]
      tmpSegment.jaSentence =  event.target.value

      tmpArticle.segments[curSegmentNo] = tmpSegment
      this.setState({article: tmpArticle})

      return
    }

    let tmpLength = 0
    const inStr = this.inputText.innerText

    for (let i = 0;i < inStr.length;i++){
      const word = inStr[i]

      tmpLength = tmpLength + this.getEnWordSize(word)

      /* 改行 */
      let maxWidth = this.state.width * 0.85

      if (tmpSegment.type == 'imgTxt'){
        maxWidth = maxWidth * 0.6
      }

      if ((tmpLength > maxWidth) || (word == '\n')){
        lineNo++
        tmpSegment.sentences.push({id: lineNo, words: []})
        tmpLength = 0
      }
      const insWord = {
        content: word,
        color: '#000',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none'
      }

      tmpSegment.sentences[lineNo].words.push(insWord)
    }
    let i = 0
    let curStyle = {
      color: '#000',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none'
    }
    const innerHtml = this.inputText.innerHTML
    console.log('innerHtml', innerHtml)
    /*for (let j=0;j < tmpSegment.sentences.length;j++){
      for(let k=0;k < tmpSegment.sentences[j].words.length;k++){

        let styleWord = tmpSegment.sentences[j].words[k].content
        if (innerHtml[i]=='<' && styleWord!='<'){
          let style = innerHtml[i].slice(i, innerHtml[i].indexOf('<'))
          if (innerHtml.slice(i,i+22).indexOf('<font color=') == 0){
            curStyle.color = innerHtml.slice(i+13, i+20)
            i = i+22
          }
          else if (innerHtml.slice(i,i+3).indexOf('<b>') == 0){
            curStyle.fontWeight='bold'
            i=i+3
          }
          else if (innerHtml.slice(i,i+12).indexOf('<b style="">') == 0) {
            curStyle.fontWeight='bold'
            i=i+12
          }
          else if (innerHtml.slice(i,i+3).indexOf('<u>') == 0){
            curStyle.textDecoration='underline'
            i=i+3
          }
          else if (innerHtml.slice(i,i+12).indexOf('<u style="">') == 0) {
            curStyle.textDecoration='underline'
            i=i+12
          }
          else if (innerHtml.slice(i,i+3).indexOf('<i>') == 0){
            curStyle.fontStyle='italic'
            i=i+3
          }
          else if (innerHtml.slice(i,i+12).indexOf('<i style="">') == 0) {
            curStyle.fontStyle='italic'
            i=i+12
          }
          else if (innerHtml.slice(i,i+4).indexOf('</b>') == 0){
            curStyle.fontWeight='normal'
            i = i+4
          }
          else if (innerHtml.slice(i,i+4).indexOf('</u>') == 0){
            curStyle.textDecoration='none'
            i = i+4
          }
          else if (innerHtml.slice(i,i+4).indexOf('</i>') == 0){
            curStyle.fontStyle='normal'
            i = i+4
          }
          else if (innerHtml.slice(i,i+7).indexOf('</font>') == 0){
            curStyle.color='#000'
            i = i+7
          }
        }
        if (innerHtml[i] == styleWord){
          tmpSegment.sentences[j].words[k].color=curStyle.color
          tmpSegment.sentences[j].words[k].fontWeight=curStyle.fontWeight
          tmpSegment.sentences[j].words[k].fontStyle=curStyle.fontStyle
          tmpSegment.sentences[j].words[k].textDecoration=curStyle.textDecoration
          i++
        }
        else {
          k--
        }
      }
    }*/

    tmpArticle.segments[curSegmentNo] = tmpSegment
    this.setState({article: tmpArticle})
  }

  setImg (object){
    let oldArticle = this.state.article
    oldArticle.segments[this.state.curSegmentNo].dataUrl = object.img

    this.setState({article: oldArticle})
  }

  setType (object){
    let oldArticle = this.state.article
    oldArticle.segments[this.state.curSegmentNo].type = object.type

    this.setState({article: oldArticle})
  }

  addPageBreak (){
    let oldArticle = this.state.article
    oldArticle.segments[this.state.curSegmentNo].isPageBreak = true
    this.editSegments({'pattern': 'add', 'type': 'txtOnly'})

    this.setState({article: oldArticle})
  }

  print (){
    if (this.state.isPrint == true){
      this.PrintArticle.onClearLoadstateArray()
    } else {
      this.setState({isPrint: true})
    }
  }


  printFinish (){
    this.setState({isPrint: false})
  }

  keyDown (event){
    /* if ((event.target != this.english) && (event.target != this.japanese) && (event.target != this.inputText) && (event.target != this.saveFileTitle)){
      event.preventDefault()
    }

    if (event.keyCode == 9){
      if (this.inputText == event.target){
        if (!this.english.checked){
          this.setEnglish()
        }
        else{
          this.setJapanese()
        }
      }
    }
    if ((event.target != this.saveFileTitle)){
      this.inputText.focus()
    }*/
  }

  render () {
    return (
      <div>
        <PrintOrientation layout={this.state.setting.layout} />
        <DivBg onKeyDown={this.keyDown} isPrint={this.state.isPrint}>
          <DivFixed >
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
                saveFileTitle={this.state.article.saveFileTitle}
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
            width={`${this.state.width.toString()}px`}>
            <Segments
              width={`${this.state.width.toString()}px`}
              curSegmentNo={this.state.curSegmentNo}
              setting={this.state.setting}
              note={this.state.note}
              addSegment={this.addSegment}
              setCurSegment={this.setCurSegment}
              addSentence={this.addSentence}
              delSentence={this.delSentence}
              updateNote={this.updateNote} />
          </DivSegments>


          {/*<DivSegments
            innerRef={(ref) => {this.allSegs = ref}}
            width={`${this.state.width.toString()}px`}>
            <Segments
              ref={(ref) => {this.segments = ref}}
              title={this.state.article.saveFileTitle}
              name='test'
              content={this.state.article.segments}
              editSegments={this.editSegments}
              setCurSegment={this.setCurSegment}
              setting={this.state.setting}
              curSegmentNo={this.state.curSegmentNo}
              offsetHeight={this.state.segsHeight}
              setImg={this.setImg}
              setType={this.setType}
              addPageBreak={this.addPageBreak}
              width={this.state.width}
            />
          </DivSegments>*/}
        </DivBg>
        <PrintArticle
          width={this.state.width.toString() + 'px'}
          isPrint={this.state.isPrint}
          ref={(ref) => {this.PrintArticle = ref}}
          title={this.state.article.saveFileTitle}
          content={this.state.article.segments}
          setting={this.state.setting}
          printFinish={this.printFinish} />
      </div>
    )
  }
}

export default Main

