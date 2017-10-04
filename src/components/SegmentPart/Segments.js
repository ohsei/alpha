import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Segment from './Segment'


class Segments extends Component{
  constructor (props){
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  static propTypes = {
    width: PropTypes.number,
    setting: PropTypes.object,
    title: PropTypes.string,
    curSegmentNo: PropTypes.number,
    note: PropTypes.arrayOf(PropTypes.object),
    tabNodeList: PropTypes.array,
    addSegment: PropTypes.func,
    addPageBreak: PropTypes.func,
    setType: PropTypes.func,
    setImg: PropTypes.func,
    delSegment: PropTypes.func,
    setCurSegment: PropTypes.func,
    updateHtml: PropTypes.func,
    updateJaHtml: PropTypes.func,
    addTabNode: PropTypes.func,
    delTabNode: PropTypes.func,
    updateTabNode: PropTypes.func,
    isPrint: PropTypes.bool,
  }

  onKeyDown (event){
    const {tabNodeList} = this.props
    if (tabNodeList.length>0 && event.keyCode == 9){
      const length =  tabNodeList[tabNodeList.length-1].length
      if (event.target == tabNodeList[tabNodeList.length-1][length-1]){
        event.preventDefault()
        tabNodeList[0][0].focus()
      }
    }
  }
  render (){
    const { width, note, title, setting, curSegmentNo, isPrint, tabNodeList,
      updateHtml, updateJaHtml, addSegment, delSegment, addPageBreak,setCurSegment,
      setType, setImg, addTabNode, delTabNode, updateTabNode} = this.props
    const segList = note.map((obj, i) =>{
      console.log('i', i)
      console.log('note[i].html',note[i].html)
      return(
      <Segment
        isPrint={isPrint}
        width={width}
        key={i}
        id={i}
        title={title}
        tabNodeList={tabNodeList}
        curSegmentNo={curSegmentNo}
        addSegment={addSegment}
        delSegment={delSegment}
        setCurSegment={setCurSegment}
        segContent={note[i]}
        setType={setType}
        setImg={setImg}
        setting={setting}
        updateHtml={updateHtml}
        updateJaHtml={updateJaHtml}
        addPageBreak={addPageBreak}
        addTabNode={addTabNode}
        delTabNode={delTabNode}
        updateTabNode={updateTabNode}
      />)
      }
    )

    return (
      <div ref={ref => this.segments = ref} onKeyDown={this.onKeyDown}>{segList}</div>
    )
  }
}

export default Segments