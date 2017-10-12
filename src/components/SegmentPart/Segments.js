import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Segment from './Segment'


class Segments extends Component{
  constructor (props){
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.setBold = this.setBold.bind(this)
    this.setColor = this.setColor.bind(this)
    this.setItalic = this.setItalic.bind(this)
    this.setUnderline =  this.setUnderline.bind(this)
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
    updateImage: PropTypes.func
  }

  onKeyDown (event){
    const {tabNodeList} = this.props
    if (tabNodeList.length>0 && event.keyCode == 9){
      const length =  tabNodeList[tabNodeList.length-1].node.length
      if (event.target == tabNodeList[tabNodeList.length-1].node[length-1].node){
        event.preventDefault()
        tabNodeList[0].node[0].node.focus()
      }
    }
  }
    
  setBold (){
    this.segment.setBold()
  }
  setColor (color){
    this.segment.setColor(color)
  }
  setItalic (){
    this.segment.setItalic()
  }
  setUnderline (){
    this.segment.setUnderline()
  }
  render (){
    const { width, note, title, setting, curSegmentNo, isPrint, tabNodeList,
      updateHtml, updateJaHtml, addSegment, delSegment, addPageBreak,setCurSegment,
      setType, setImg, addTabNode, delTabNode, updateTabNode, updateImage} = this.props
    const segList = note.map((obj, i) =>{
      return(
      <Segment
        ref={ref => this.segment = ref}
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
        updateImage={updateImage}
      />)
      }
    )

    return (
      <div ref={ref => this.segments = ref} onKeyDown={this.onKeyDown}>{segList}</div>
    )
  }
}

export default Segments