import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LabNum from '../Segment/LabNum'
import PrintSegWithJan from './PrintSegWithJan'

const DivContent = styled.div`
  background-color: white;
  display: flex;
  direction: row;
  justify-content: space-around;
  width: 95%;
  border: none;
  margin: 0 0 0 0;
  padding: 10px;
`

class PrintTxtOnlySeg extends Component{
  constructor (props){
    super(props)
  }

  render (){
    return (
      <DivContent>
        <LabNum
          curSegmentNo={this.props.id}
          setting={this.props.setting}>
        </LabNum>
        <PrintSegWithJan
          width={100}
          ref={(ref) => {this.divSegWithJan = ref}}
          jaSentence={this.props.jaSentence}
          setting={this.props.setting}
          content={this.props.content}
        />
      </DivContent>
    )
  }
}

PrintTxtOnlySeg.propTypes = {
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


export default PrintTxtOnlySeg