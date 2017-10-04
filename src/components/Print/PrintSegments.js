import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PrintHeader from '../Print/PrintHeader'


import PrintSegment from './PrintSegment'

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

  render (){
    const {note, width, id, name, title,
      updateHtml, updateJaHtml, addSentence, delSentence} = this.props
    let listItems = note.map((list) => {
      this.props.pushSegment({id: id, segmentId: list.id, type: list.type})

      return (<PrintSegment
        ref={(ref) => {this.segment = ref}}
        id={list.id}
        key={list.id}
        note={note}
        width={width}
        setting={this.props.setting}
        setLoadedStatus={this.setLoadedStatus}
        updateHtml={updateHtml}
        updateJaHtml={updateJaHtml}
        addSentence={addSentence}
        delSentence={delSentence}
        name={name}
      ></PrintSegment>
      )
    })
    return (
      <StyledSection width='100%' className='text-center'>
        <PrintHeader title={title} name={name} />
        <UlSeg>{listItems}</UlSeg>
      </StyledSection>
    )
  }
}

PrintSegments.propTypes = {
  width: PropTypes.number,
  id: PropTypes.number,
  note: PropTypes.array,
  title: PropTypes.string,
  name: PropTypes.any,
  setting: PropTypes.any,
  segsLoad: PropTypes.array,
  pushSegment: PropTypes.any,
  updateHtml: PropTypes.func,
  updateJaHtml: PropTypes.func,
  addSentence: PropTypes.func,
  delSentence: PropTypes.func,
  setLoadedStatus: PropTypes.func,

}

export default PrintSegments