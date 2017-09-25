import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledPre = styled.pre`
   width: 50px;
   text-align: center;
   font-size: 30px;
`

class LabNum extends Component{
  constructor (props){
    super(props)
    this.getLineNo = this.getLineNo.bind(this)
  }

  getLineNo (lineNoType, curNo){
    switch(parseInt(lineNoType)){
    case 0:{
      return (curNo + 1).toString()
    }
    case 1:{
      return ('(' + (curNo + 1).toString() + ')').toString()
    }
    }
  }

  render (){
    const lineNo = this.getLineNo(this.props.setting.lineNos, this.props.curSegmentNo)
    return (
      <StyledPre >{lineNo}</StyledPre>
    )
  }
}

LabNum.propTypes = {
  curSegmentNo: PropTypes.any,
  setting: PropTypes.any,
}

export default LabNum