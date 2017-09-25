import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Segment from './Segment'

import styled from 'styled-components'

const StyledDiv = styled.div`
  margin: 0;
  padding: 0;
  &:last-child{
    margin-bottom: 100px;
  }

`

class Segments extends Component{
  constructor (props){
    super(props)
    this.editSegments = this.editSegments.bind(this)
    this.setCurSegment = this.setCurSegment.bind(this)
    this.setImg = this.setImg.bind(this)
    this.setType = this.setType.bind(this)
    this.addPageBreak = this.addPageBreak.bind(this)
  }
  //追加、削除segment
  editSegments (object){
    this.props.editSegments({pattern:object.pattern, type: object.type})
  }

  //focus segment
  setCurSegment (curNoObj){
    this.props.setCurSegment({curNo:curNoObj.curNo})
  }

  setType (object){
    this.props.setType(object)
  }

  setImg (object){
    this.props.setImg(object)
  }

  addPageBreak (){
    this.props.addPageBreak()
  }

  componentDidMount (){

  }
  componentWillUnmout (){

  }
  render (){
    let listItems = this.props.content.map((list) =>{
      return (<Segment
        ref={(ref) => {this.segment = ref}}
        id={list.id}
        key={list.id}
        jaSentence={list.jaSentence}
        content={list.sentences}
        editSegments={this.editSegments}
        setCurSegment={this.setCurSegment}
        setting={this.props.setting}
        curSegmentNo={this.props.curSegmentNo}
        offsetHeight={this.props.offsetHeight}
        title={this.props.title}
        name={this.props.name}
        dataUrl={list.dataUrl}
        setImg={this.setImg}
        setType={this.setType}
        type={list.type}
        isPageBreak={list.isPageBreak}
        addPageBreak={this.addPageBreak}
        width={this.props.width}
      ></Segment>)
    })
    return(
      <StyledDiv width={this.props.width} className='text-center'>
       {listItems}
      </StyledDiv>
    )
  }
}

Segments.propTypes = {
  title: PropTypes.any,
  name: PropTypes.any,
  editSegments: PropTypes.any,
  setCurSegment: PropTypes.any,
  setting: PropTypes.any,
  content: PropTypes.any,
  curSegmentNo: PropTypes.any,
  offsetHeight: PropTypes.any,
  setType: PropTypes.any,
  setImg: PropTypes.any,
  addPageBreak: PropTypes.any,
  width: PropTypes.number,
}

export default Segments