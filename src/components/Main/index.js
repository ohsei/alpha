import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import PropTypes from 'prop-types'

import Flines_block_Regular_chrome from '../../resources/font/4lines_block-Regular.otf'
import Flines_block_Regular_ie from '../../resources/font/4lines_block-regular-webfont.eot'
import {defaultWidth} from '../../utils/const'

import ColorPicker from './ColorPicker'
import MenuContainer from './MenuContainer'
import SegmentsContainer from './Note/SegmentsContainer'
import PrintNoteContainer from './Print/PrintNoteContainer'
import FileDialogContainer from './FileDialogContainer'

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
const DivOverlap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(222,222,222,0.5);
  display: ${props => props.show ? 'block' : 'none'}
`
const DivFixed = styled.div.attrs({
  tabIndex: -1,
})`
  position: fixed;
  width:100%;
  z-index: 9;
  top: 0;
  left: 0;
  background-color: lightgreen;
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
const DivFixedTitle = styled.label.attrs({
  tabIndex: -1,
})`
  min-width: 150px;
  height: 50px;
  font-size: 18px;
  line-height: 2.5;
  color: white;
  text-align: center;
`
const InFileTitle = styled.input.attrs({
  tabIndex: -1,
})`
  margin: 0;
  width: 400px;
  height: auto;
  font-size:24px;
  border: 2px solid orange;

  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`
/* define layout end*/

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
    /* 色設定 */
    this.setColor = this.setColor.bind(this)
    /* Bold設定 */
    this.setBold = this.setBold.bind(this)
    /* italic設定 */
    this.setItalic = this.setItalic.bind(this)
    /* underline設定 */
    this.setUnderline = this.setUnderline.bind(this)
  }

  static propTypes = {
    width: PropTypes.number,
    note: PropTypes.array,
    setting: PropTypes.object,
    isShowFileDialog: PropTypes.bool,
    curSegmentNo: PropTypes.number,
    saveFileTitle: PropTypes.string,
    setFileTitle: PropTypes.func.isRequired,
    isPrint: PropTypes.bool,
    printFinish: PropTypes.func.isRequired,
    curComponent: PropTypes.object,
    isBold: PropTypes.bool,
    isItalic: PropTypes.bool,
    isUnderline: PropTypes.bool,
    curColor: PropTypes.string,
  }
  setFileTitle = (event) => {
    const {setFileTitle} = this.props
    setFileTitle(event.target.value)
  }
  setBold = () => {
    const {curComponent} = this.props
    curComponent.setBold()
  }
  setItalic (){
    const {curComponent} = this.props
    curComponent.setItalic()
  }
  setUnderline (){
    const {curComponent} = this.props
    curComponent.setUnderline()
  }
  setColor (color){
    const {curComponent} = this.props
    curComponent.setColor(color)
  }

  componentWillUpdate (nextProps) {
    const {isPrint} = this.props

    if (!isPrint) {
      this.saveFileTitle.value = nextProps.saveFileTitle
    }
  }

  componentWillReceiveProps (nextProps) {
    const {curColor} = this.props

    if (nextProps.curColor && (nextProps.curColor !== curColor)) {
      this.colorChange.setColor(nextProps.curColor)
    }
  }

  render () {
    const { isPrint, setting, width, isBold, isItalic, isUnderline} = this.props
    return (
      <div>
        <PrintOrientation layout={setting.layout} />
        {!isPrint && <DivBg style={{minWidth: width}}>
          <DivFixed>
            <DivFixedTitle>　　　４線マスター　　　</DivFixedTitle>
            <InFileTitle
              type='text'
              placeholder='新規ファイル'
              innerRef={(ref) => {this.saveFileTitle = ref}}
              onChange={this.setFileTitle} />
            <DivMenu>
              <MenuContainer />
            </DivMenu>
            <StyleEditArea>
              <ColorPicker
                ref={ref => this.colorChange = ref}
                setColor={this.setColor}
              />
              <Button
                active={isBold}
                innerRef={ref => this.boldChange = ref}
                onClick={this.setBold}>
                B
              </Button>
              <Button
                active={isItalic}
                innerRef={ref => this.italicChange = ref}
                onClick={this.setItalic}>
                /
              </Button>
              <Button
                active={isUnderline}
                ref={ref => this.underlineChange = ref}
                onClick={this.setUnderline}>
                U
              </Button>
            </StyleEditArea>
          </DivFixed>
          <DivSegments
            innerRef={(ref) => {this.allSegs = ref}}
            width={width}>
            <SegmentsContainer />
          </DivSegments>
          <FileDialogContainer />
        </DivBg>}
        {isPrint && <PrintNoteContainer />}
      </div>
    )
  }
}

export default Main

