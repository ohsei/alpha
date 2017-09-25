import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DivHeader = styled.div`
  padding: 25px;    
  display:flex;
  flex-direction: row;
  -ms-flex-direction: row;
  text-align:center;
  width: 100%;
  height:50px;
  font-size:26px;
`

const DivTitle = styled.div`
  width: 50%;
  height: 50px;
  font-size: 26px;
  text-align: left;
`
const DivName = styled.div`
  width: 50%;
  height: 50px;
  font-size: 26px;
  text-align: left;
`
class PrintHeader extends Component{

  render (){
    return (
      <DivHeader>
        <DivTitle>{this.props.title}</DivTitle>
        <DivName>{this.props.name}</DivName>
      </DivHeader>
    )
  }

}

PrintHeader.propTypes = {
  title: PropTypes.any,
  name: PropTypes.any,
}

export default PrintHeader