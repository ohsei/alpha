import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import PrintSegments from './PrintSegments'

const StyledDiv = styled.div`
  display: ${props => props.isPrint ? 'block' : 'none'};
  width: ${props=>props.width};
`
const StyledButton = styled.button`
  width: 150px;
  height: 50px;
  font-size: 20px;

  @media print{
    display: none;
  }
`
const namelist = [
  {
    id: 0,
    name:'aa'
  },
  {
    id: 1,
    name:'bb'
  },
  {
    id: 2,
    name:'cc'
  },
  {
    id: 3,
    name: 'dd'
  },
  {
    id: 4,
    name: 'ff'
  },
  {
    id: 5,
    name: 'gg'
  },
  {
    id: 6,
    name: 'hh'
  },
  {
    id: 7,
    name: 'ii'
  },
  {
    id: 8,
    name: 'jj'
  },
  {
    id: 9,
    name: 'kk'
  }
]
class PrintArticle extends Component{
  constructor (props){
    super(props)
    this.state = {
      listSegments: null,
      isloadArrayCreated: false,
      loadedArray: [],
      printStatus: '印刷用意中...'
    }
    this.pushSegment = this.pushSegment.bind(this)
    this.setLoadedStatus = this.setLoadedStatus.bind(this)
    this.onClearLoadstateArray = this.onClearLoadstateArray.bind(this)
    this.print = this.print.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  componentWillMount (){
  }

  componentDidMount (){
  }
  componentWillReceiveProps (nextProps){
    if ((nextProps.isPrint == true) && (this.state.isloadArrayCreated == false)){
      namelist.map((list) => {
        let tmpLoadedArray = this.state.loadedArray
        tmpLoadedArray.push({id: list.id, name: list.name, segments: []})
      })
      this.setState({isloadArrayCreated: true})
    }
  }
  componentDidUpdate (prevProps, prevState){
    if (this.props.isPrint == true){
      if (this.state.printStatus == '印刷可'){
        return 
      }
      if (this.state.printStatus == '印刷用意中...'){
        if (this.getState() == true){
          this.setState({printStatus: '印刷可'})
        }
      }
    }
  }

  print (){
    window.print()
    this.onClearLoadstateArray()
    this.props.printFinish()
  }

  cancel (){
    this.onClearLoadstateArray()
    this.props.printFinish()
  }
  getState (){
    if  (this.state.loadedArray.length <= 0){
      return false
    }
    for (let i = 0; i < this.state.loadedArray.length;i++){
      if (this.state.loadedArray[i].segments.length <= 0){
        return false
      }
      for (let j = 0;j < this.state.loadedArray[i].segments.length;j++){
        if (this.state.loadedArray[i].segments[j].loaded == false){
          return false
        }
      }
    }
    return true
  }

  pushSegment (object){
    let tmpLoadedArray = this.state.loadedArray
    if (tmpLoadedArray[object.id].segments[object.segmentId] === undefined){
      if (object.type == 'txtOnly'){
        tmpLoadedArray[object.id].segments.push({id: object.segmentId, loaded: true})
      }else{
        tmpLoadedArray[object.id].segments.push({id: object.segmentId, loaded: false})
      }
    }
  }
  setLoadedStatus (object){
    if (this.state.isloadArrayCreated){
      let tmpLoadedArray = this.state.loadedArray
      tmpLoadedArray[object.id].segments[object.segmentId].loaded = true
      this.setState({loadedArray: tmpLoadedArray})
    }
  }

  onClearLoadstateArray (){
    this.setState({loadedArray: []})
    this.setState({isloadArrayCreated: false})
  }

  render (){

    let listSegments = null
    if (this.props.isPrint == true){
      listSegments = namelist.map((list) => {
        return(
          <PrintSegments
            ref={(ref) => {this.PrintSegments = ref}}
            id={list.id}
            key={list.id}
            isPrint={true}
            title={this.props.title}
            name={list.name}
            content={this.props.content}
            setting={this.props.setting}
            setLoadedStatus={this.setLoadedStatus}
            pushSegment={this.pushSegment}
          />
        )
      })
    }
    return (
      <StyledDiv
        isPrint={this.props.isPrint}
        width={this.props.width}>
        <StyledButton onClick={this.print}>{this.state.printStatus}</StyledButton>
        <StyledButton onClick={this.cancel}>キャンセル</StyledButton>
        {listSegments}
        </StyledDiv>
    )
  }

  componentWillUnmount (){
  }
}


PrintArticle.propTypes = {
  isPrint: PropTypes.any,
  title: PropTypes.any,
  content: PropTypes.any,
  setting: PropTypes.any,
  printFinish: PropTypes.any,
}
export default PrintArticle

