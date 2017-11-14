import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import Segments from './Segments'

const StyledDiv = styled.div`
  display: ${props => props.isPrint ? 'block' : 'none'};
  width: ${props => `${props.width}px`};
`
const StyledButton = styled.button`
  width: 150px;
  height: 50px;
  font-size: 20px;

  @media print{
    display: none;
  }
`

class PrintNote extends Component{
  componentDidUpdate () {
    const {isPrint, setPrintStatus, printStatus} = this.props

    if (isPrint === true){
      if (printStatus === '印刷可'){
        return
      }

      if (printStatus === '印刷用意中...'){
        if (this.getState() == true){
          setPrintStatus('印刷可')
        }
      }
    }
  }

  print = () => {
    const {printFinish, setPrintStatus} = this.props
    window.print()

    this.onClearLoadstateArray()
    printFinish()
    setPrintStatus('印刷用意中...')
  }

  cancel = () => {
    const {printFinish, setPrintStatus} = this.props
    this.onClearLoadstateArray()
    printFinish()
    setPrintStatus('印刷用意中...')
  }
  getState = () => {
    const {loadedArray} = this.props

    if  (loadedArray.length <= 0){
      return false
    }

    for (let i = 0; i < loadedArray.length;i++){
      if (loadedArray[i].segments.length <= 0){
        return false
      }

      for (let j = 0;j < loadedArray[i].segments.length;j++){
        if (loadedArray[i].segments[j].loaded == false){
          return false
        }
      }
    }
    return true
  }

  onClearLoadstateArray = () => {
    const {updateLoadedArray, namelist} = this.props
    let loadedArray = []

    for (let i = 0;i < namelist.length;i ++) {
      loadedArray.push({id: i, segments: []})
    }
    updateLoadedArray(loadedArray)
  }

  render (){
    const {namelist, printStatus} = this.props

    let listSegments = null

    if (this.props.isPrint == true){
      listSegments = namelist.map((list) => {

        return (
          <Segments
            ref={(ref) => {this.PrintSegments = ref}}
            id={list.id}
            key={list.id}
            name={list.name}
            {...pick(this.props, keys(Segments.propTypes))}
          />
        )
      })
    }
    return (
      <StyledDiv
        isPrint={this.props.isPrint}
        width={this.props.width}>
        <StyledButton onClick={this.print}>{printStatus}</StyledButton>
        <StyledButton onClick={this.cancel}>キャンセル</StyledButton>
        {listSegments}
      </StyledDiv>
    )
  }

}

PrintNote.propTypes = {
  namelist: PropTypes.array,
  note: PropTypes.array,
  title: PropTypes.string,
  isPrint: PropTypes.any,
  width: PropTypes.number,
  setting: PropTypes.any,
  printFinish: PropTypes.func.isRequired,
  setPrintStatus: PropTypes.func.isRequired,
  printStatus: PropTypes.string,
  loadedArray: PropTypes.array,
  updateLoadedArray: PropTypes.func,
}

export default PrintNote

