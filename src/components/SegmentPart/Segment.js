import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Actions from './Actions'
import TxtOnlySeg from './TxtOnlySeg'
import ImgOnlySeg from './ImgOnlySeg'
import ImgTxtSeg from './ImgTxtSeg'
import TxtImgSeg from './TxtImgSeg'

const SegArea = styled.div`
  width: ${props => `${props.width}px`};
  background-color: white;
  border: 2px solid orange;
`
const DivInterval = styled.div`
  height: ${props => props.interval};
  background-color: lightgreen;
`
const PageBreakLine = styled.div`
  width: 100%;
  height: 2;
  border:1px dotted blue;
  page-break-after: always;

  @media print{
    border-color: white;
  }
`

const DrawPageBreakLine = (object) => {
  if (object.isPageBreak == true){
    return (
      <div>
        <PageBreakLine />
      </div>
    )
  }
  else {
    return false
  }
}

class Segment extends Component{
  constructor (props){
    super(props)
    this.state = {
      imeMode: 'inactive'
    }
  }
  static propTypes = {
    id: PropTypes.number,
    width: PropTypes.number,
    setting: PropTypes.object,
    note: PropTypes.arrayOf(PropTypes.object),
    addSegment: PropTypes.func,
    isPageBreak: PropTypes.bool,
    title: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }

  render (){
    const {
      width, addSegment, id, setting, isPageBreak, title, name
    } = this.props

    const content = (()  => {
      if (this.props.type == 'imgOnly'){
        return <ImgOnlySeg
          ref={(ref)=>{this.imgOnlySeg = ref}}
          id={this.props.id}
          dataUrl={this.props.dataUrl}
          {...this.props}
        />
      }else if (this.props.type == 'imgTxt'){
        return <ImgTxtSeg
          ref={(ref)=>{this.imgTxtSeg = ref}}
          id={this.props.id}
          dataUrl={this.props.dataUrl}
          {...this.props}
        />
      }else if (this.props.type == 'txtImg'){
        return <TxtImgSeg
          ref={(ref)=>{this.txtImgSeg = ref}}
          id={this.props.id}
          dataUrl={this.props.dataUrl}
          {...this.props}
        />
      }else {
        return  <TxtOnlySeg {...this.props} />
      }
    })()

    return (
      <div>
        <SegArea width={width}>
          {content}
          <Actions
            addSegment={addSegment}
            id={id}
            {...this.props}
            type={this.props.type} />
        </SegArea>
        <DivInterval interval={setting.interval} />
        <DrawPageBreakLine
          isPageBreak={isPageBreak}
          title={title}
          name={name} />
      </div>
    )
  }
}

export default Segment