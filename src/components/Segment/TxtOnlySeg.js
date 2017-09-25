import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LabNum from './LabNum'
import SegWithJan from './SegWithJan'

const DivContent = styled.div`
  background-color: white;
  display: flex;
  direction: row;
  justify-content: space-around;
  width: ${props => `${props.width}px`};
  border: 1px solid gray;
  margin: 0 0 0 0;

  @media print{
    border: none;
    width: 95%;
    padding: 10px;
}
`
const DivSel = styled.div`
  width: 100px;
  text-align: center;
  font-size: 30px;
  color: #222;
  background-color: ${props =>
  {if (props.id == props.curNo){
    return 'darkgray'
  }else{
    return 'lightgray'
  }}};

  @media print{
    display: none;
}
`

class TxtOnlySeg extends Component{
  constructor (props){
    super(props)
    this.selectSegment = this.selectSegment.bind(this)
  }

  selectSegment (){
    this.props.setCurSegment({curNo:this.props.id})
  }
  render (){

    return (
      <DivContent width={this.props.width}>
        <LabNum
          curSegmentNo={this.props.id}
          setting={this.props.setting}>
        </LabNum>
        <SegWithJan
          width={this.props.width - 150}
          ref={(ref) => {this.divSegWithJan = ref}}
          jaSentence={this.props.jaSentence}
          setting={this.props.setting}
          content={this.props.content}
        />
        <DivSel id={this.props.id} curNo={this.props.curSegmentNo}
          innerRef={(ref) => {this.selSegment = ref}}
          onClick={this.selectSegment}
          width={this.props.width * 0.1}>
        選択
        </DivSel>
      </DivContent>
    )
  }
}

TxtOnlySeg.propTypes = {
  content: PropTypes.any,
  editSegments: PropTypes.any,
  jaSentence: PropTypes.any,
  setting: PropTypes.any,
  setCurSegment: PropTypes.any,
  id: PropTypes.any,
  curSegmentNo: PropTypes.any,
  offsetHeight: PropTypes.any,
  isPageBreak: PropTypes.any,
}


export default TxtOnlySeg