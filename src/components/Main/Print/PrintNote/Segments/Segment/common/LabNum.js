import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledDiv = styled.div`
   width: 50px;
   text-align: center;
   font-size: 30px;
`

class LabNum extends Component{
  constructor (props){
    super(props)
    this.getLineNo = this.getLineNo.bind(this)
  }
  static propTypes = {
    id: PropTypes.number,
    lineNoType: PropTypes.number,
  }
  static defaultProps = {
    lineNoType: 0,
  }

  getLineNo (lineNoType, curNo){
    switch (parseInt(lineNoType)){
    case 0: {
      return curNo + 1
    }

    case 1: {
      return `(${curNo + 1})`
    }
    }
  }

  render (){
    const {lineNoType, id} = this.props
    const lineNo = this.getLineNo(lineNoType, id)
    return (
      <StyledDiv>{lineNo}</StyledDiv>
    )
  }
}

export default LabNum