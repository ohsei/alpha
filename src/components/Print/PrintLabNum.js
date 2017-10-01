import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledPre = styled.pre`
   width: 50px;
   text-align: center;
   font-size: 30px;
`

class PrintLabNum extends Component{
  constructor (props){
    super(props)
    this.getLineNo = this.getLineNo.bind(this)
  }

  static propTypes = {
    id: PropTypes.number,
    setting: PropTypes.object,
  }
  getLineNo (lineNoType, curNo){
    switch (parseInt(lineNoType)){
    case 0:{
      return (curNo + 1).toString()
    }

    case 1:{
      return ('(' + (curNo + 1).toString() + ')').toString()
    }
    }
  }

  render (){
    const {setting, id } = this.props

    const lineNo = this.getLineNo(setting.lineNos, id)
    return (
      <StyledPre >{lineNo}</StyledPre>
    )
  }
}

export default PrintLabNum