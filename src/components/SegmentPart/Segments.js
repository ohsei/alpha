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
    addSentence: PropTypes.func,
    delSentence: PropTypes.func,
  }
  render (){
    const { note } = this.props
    const segList = note.map((obj, i) =>
      <Segment
        key={i}
        id={i}
        addSegment={this.props.addSegment}
        setCurSegment={this.setCurSegment}
        addSentence={this.props.addSentence}
        delSentence={this.props.delSentence}
        {...this.props} />
    )

    return (
      <div>{segList}</div>
    )
  }
}

export default Segments