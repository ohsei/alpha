import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PrintSegment from './PrintSegment'

import styled from 'styled-components'
import PrintHeader from '../Print/PrintHeader'

const UlSeg = styled.ul`
  margin: 0;
  padding: 0;
`
const StyledSection = styled.section`
  page-break-after: always;
`
class PrintSegments extends Component{
  constructor (props){
    super(props)
    this.setLoadedStatus = this.setLoadedStatus.bind(this)
  }

  setLoadedStatus (object){
    this.props.setLoadedStatus({id: this.props.id, segmentId: object.id})
  }
  componentDidMount (){

  }
  componentWillUnmout (){

  }
  render (){
    let listItems = this.props.content.map((list) =>{
      this.props.pushSegment({id: this.props.id, segmentId: list.id, type: list.type})

      return (<PrintSegment
        ref={(ref) => {this.segment = ref}}
        id={list.id}
        key={list.id}
        jaSentence={list.jaSentence}
        content={list.sentences}
        setting={this.props.setting}
        offsetHeight={this.props.offsetHeight}
        title={this.props.title}
        name={this.props.name}
        dataUrl={list.dataUrl}
        type={list.type}
        isPageBreak={list.isPageBreak}
        setLoadedStatus={this.setLoadedStatus}
      ></PrintSegment>)
    })
    return(
      <StyledSection width='100%' className='text-center'>
        <PrintHeader title={this.props.title} name={this.props.name} />
        <UlSeg>{listItems}</UlSeg>
      </StyledSection>
    )
  }
}

PrintSegments.propTypes = {
  id: PropTypes.any,
  title: PropTypes.any,
  name: PropTypes.any,
  setting: PropTypes.any,
  content: PropTypes.any,
  offsetHeight: PropTypes.any,
  segsLoad: PropTypes.array,
  pushSegment: PropTypes.any,
  setLoadedStatus: PropTypes.any,

}

export default PrintSegments