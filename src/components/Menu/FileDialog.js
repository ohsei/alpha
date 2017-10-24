import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {getFileList, dbOperate} from '../../utils/database'

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
    this.state = {
      content: [],
      selectedFile: ''
    }
    this.files = new Map()
  }
  static propTypes = {
    setShowFileDialog: PropTypes.func.isRequired,
    updateFilelist: PropTypes.func.isRequired,
    show: PropTypes.bool,
    loadFile: PropTypes.func.isRequired,
    isFileListUpdated: PropTypes.bool,
  }
  handleClick= () => {
    this.props.setShowFileDialog(false)
  }
  updateContent = () => {
    this.setState({content: getFileList()})
  }

  handleSelectFile = (e) => {
    this.setState({selectedFile: e.target.innerText})
  }

  handleOpenFile = () => {
    dbOperate(3, null, null, this.state.selectedFile, this.getFile)
  }

  afterDelete = () => {
    this.updateContent()
    this.props.updateFilelist(true)
  }

  handleDeleteFile = () => {
    dbOperate(5, null, null, this.state.selectedFile, null, null, this.afterDelete)
  }

  handleCancel = () => {
    this.props.setShowFileDialog(false)
  }

  getFile = (e) => {
    var fileStr = e.data
    let savedFile = JSON.parse(fileStr)
    this.props.loadFile(savedFile)

    this.props.setShowFileDialog(false)
  }
  componentDidMount () {
    dbOperate(0, this.updateContent)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isFileListUpdated) {
      dbOperate(0, this.updateContent)
      this.props.updateFilelist(false)
    }
  }

  render () {
    return (
      <Wrapper>
        <h3 style={{flex: 8}}>ファイル一覧</h3>
        <DialogDiv show={this.props.show}>

          {this.state.content.map((file, i) => {
            if (this.state.selectedFile == file) {
              return (
                <SelectedLabel
                  key={i}
                  ref={ref => this.files.set(i, ref)}
                  onClick={this.handleSelectFile}>{file}
                </SelectedLabel>
              )
            }
            else {
              return (
                <ListLabel
                  key={i}
                  ref={ref => this.files.set(i, ref)}
                  onClick={this.handleSelectFile}>{file}
                </ListLabel>

              )
            }
          })}

        </DialogDiv>
        <div style={{display: 'flex', direction: 'row'}}>
          <Button onClick={this.handleOpenFile}>読込</Button>
          <Button onClick={this.handleDeleteFile}>削除</Button>
          <Button onClick={this.handleCancel}>取消</Button>
        </div>
      </Wrapper>
    )
  }
}

export default FileDialog