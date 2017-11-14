import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import Segment from './Segment'
import Header from './Header'

const UlSeg = styled.ul`
  margin: 0;
  padding: 0;
`
const StyledSection = styled.section`
  page-break-after: always;
`

class Segments extends Component{
  onCreateLoadedArray = (segment) => {
    const {updateLoadedArray, loadedArray, id} = this.props

    let newLoadedArray = loadedArray

    if (newLoadedArray[id] === undefined) {
      newLoadedArray.push({id: id, segments: []})
    }

    if (newLoadedArray[id].segments[segment.id] === undefined){
      if (segment.type === 'txtOnly') {
        newLoadedArray[id].segments.push({id: segment.id, loaded: true})
      }
      else {
        newLoadedArray[id].segments.push({id: segment.id, loaded: false})
      }
    }
    updateLoadedArray(newLoadedArray)
  }

  componentWillMount () {
    const {note} = this.props

    for (let i = 0;i < note.length;i ++) {
      this.onCreateLoadedArray(note[i])
    }
  }

  render (){
    const {note, id, name, title} = this.props
    let listItems = note.map((segment) => {
      return (
        <Segment
          noteId={id}
          ref={(ref) => {this.segment = ref}}
          segmentId={segment.id}
          key={segment.id}
          {...pick(this.props, keys(Segment.propTypes))} />
      )
    })
    return (
      <StyledSection width='100%' className='text-center'>
        <Header title={title} name={name} />
        <UlSeg>{listItems}</UlSeg>
      </StyledSection>
    )
  }
}

Segments.propTypes = {
  width: PropTypes.number,
  id: PropTypes.number,
  note: PropTypes.array,
  title: PropTypes.string,
  name: PropTypes.any,
  setting: PropTypes.any,
  segsLoad: PropTypes.array,
  loadedArray: PropTypes.array,
  updateLoadedArray: PropTypes.func,

}

export default Segments