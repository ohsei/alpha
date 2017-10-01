import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Segment from './Segment'


class Segments extends Component{
  constructor (props){
    super(props)
  }

  static propTypes = {
    width: PropTypes.number,
    setting: PropTypes.object,
    title: PropTypes.string,
    curSegmentNo: PropTypes.number,
    note: PropTypes.arrayOf(PropTypes.object),
    addSegment: PropTypes.func,
    addPageBreak: PropTypes.func,
    setType: PropTypes.func,
    setImg: PropTypes.func,
    delSegment: PropTypes.func,
    setCurSegment: PropTypes.func,
    updateHtml: PropTypes.func,
    updateJaHtml: PropTypes.func,
    addSentence: PropTypes.func,
    delSentence: PropTypes.func,
    isPrint: PropTypes.bool,
  }
  render (){
    const { width, note, title, setting, curSegmentNo, isPrint,
      updateHtml, updateJaHtml, addSentence, delSentence, addSegment, delSegment, addPageBreak,
      setType, setImg} = this.props
    const segList = note.map((obj, i) =>
      <Segment
        isPrint={isPrint}
        width={width}
        key={i}
        id={i}
        title={title}
        curSegmentNo={curSegmentNo}
        addSegment={addSegment}
        delSegment={delSegment}
        setCurSegment={this.props.setCurSegment}
        segContent={note[i]}
        setType={setType}
        setImg={setImg}
        setting={setting}
        updateHtml={updateHtml}
        updateJaHtml={updateJaHtml}
        addSentence={addSentence}
        delSentence={delSentence}
        addPageBreak={addPageBreak}
      />
    )

    return (
      <div ref={ref => this.segments = ref}>{segList}</div>
    )
  }
}

export default Segments