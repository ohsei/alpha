import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {getFileList, dbOperate} from '../../../utils/database'
import {
  GET_ALL_FILE,
  GET_ONE_FILE,
  DEL_ONE_FILE,
} from '../../../utils/const.js'

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
const Wrapper = styled.div`
  position: fixed;
  top: 150px;
  left: 100px;
  z-index: 9999;
  border: 2px solid orange;
  background-color: orange;
  color: white;
`
const DialogDiv = styled.div`
  width: 500px;
  height: 300px;
  background-color: white;
  display: ${props => props.show ? 'block' : 'none'};
  overflow-x: scroll;
  overflow-y: scroll;
  color: black;
`
const ListLabel = styled.div`
  padding-left: 10px;
  width: 100%;
  height: 50px;
  line-height: 2.5;
  border: 1px solid gray;
`
const SelectedLabel = ListLabel.extend`
  background-color: yellow;
`
const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: orange;
  color: white;
  border: none;
  font-size: 24px;
`

class FileDialog extends Component{
  constructor (props){
    super(props)
    this.files = new Map()
  }
  static propTypes = {
    isShowFileDialog: PropTypes.bool,
    onLoadFile: PropTypes.func.isRequired,
    onShowFileDialog: PropTypes.func.isRequired,
    updateContent: PropTypes.func.isRequired,
    content: PropTypes.arrayOf(PropTypes.string),
    updateSelectFile: PropTypes.func.isRequired,
    selectedFile: PropTypes.string,
    offIsFilelistUpdate: PropTypes.func.isRequired,
    isFileListUpdated: PropTypes.bool,
  }

  updateContent = () => {
    const {updateContent} = this.props

    updateContent(getFileList())
  }

  onSelectFile = (e) => {
    const {updateSelectFile} = this.props

    updateSelectFile(e.target.innerText)
  }

  onOpenFile = () => {
    const {selectedFile} = this.props

    const operateJson = {
      callback: this.onGetFile,
      filename: selectedFile
    }
    dbOperate(GET_ONE_FILE, operateJson)
  }

  onAfterDelete = () => {
    const operateJson = {
      callback: this.updateContent
    }
    dbOperate(GET_ALL_FILE, operateJson)
  }

  onDeleteFile = () => {
    const {selectedFile} = this.props
    const operateJson = {
      callback: this.onAfterDelete,
      filename: selectedFile
    }
    dbOperate(DEL_ONE_FILE, operateJson)
  }
  onCancel = () => {
    const {onShowFileDialog} = this.props

    onShowFileDialog(false)
  }
  onGetFile = (e) => {
    const {onLoadFile, onShowFileDialog} = this.props

    if (e.data) {
      let fileStr = e.data
      let savedFile = JSON.parse(fileStr)

      onLoadFile(savedFile)
      onShowFileDialog(false)
    }
  }
  componentDidMount () {
    const operateJson = {
      callback: this.updateContent
    }
    dbOperate(GET_ALL_FILE, operateJson)
  }

  componentWillReceiveProps (nextProps) {
    const {offIsFilelistUpdate} = this.props

    if (nextProps.isFileListUpdated) {
      const operateJson = {
        callback: this.updateContent
      }
      dbOperate(GET_ALL_FILE, operateJson)
      offIsFilelistUpdate()
    }
  }
  render () {
    const {isShowFileDialog, content, selectedFile} = this.props

    return (
      <DivOverlap show={isShowFileDialog}>
        <Wrapper>
          <h3 style={{flex: 8}}>ファイル一覧</h3>
          <DialogDiv show={isShowFileDialog}>

            {content.map((file, i) => {
              if (selectedFile == file) {
                return (
                  <SelectedLabel
                    key={i}
                    ref={ref => this.files.set(i, ref)}
                    onClick={this.onSelectFile}>{file}
                  </SelectedLabel>
                )
              }
              else {
                return (
                  <ListLabel
                    key={i}
                    ref={ref => this.files.set(i, ref)}
                    onClick={this.onSelectFile}>{file}
                  </ListLabel>

                )
              }
            })}

          </DialogDiv>
          <div style={{display: 'flex', direction: 'row'}}>
            <Button onClick={this.onOpenFile}>読込</Button>
            <Button onClick={this.onDeleteFile}>削除</Button>
            <Button onClick={this.onCancel}>取消</Button>
          </div>
        </Wrapper>
      </DivOverlap>
    )
  }
}

export default FileDialog