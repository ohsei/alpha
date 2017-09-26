import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Segment from './Segment'


class Segments extends Component{
  constructor (props){
    super(props)
  }
  static propTypes = {
    curSegmentNo: PropTypes.number,
    setting: PropTypes.object,
    note: PropTypes.arrayOf(PropTypes.object),
    addSegment: PropTypes.func,
    setCurSegment: PropTypes.func,
  }
  render (){
    const { note } = this.props
    const segList = note.map((obj, i) =>
      <Segment
        key={i}
        id={i}
        addSegment={this.props.addSegment}
        setCurSegment={this.setCurSegment}
        {...this.props} />
    )

    return (
      <div>{segList}</div>
    )
  }
}

export default Segments