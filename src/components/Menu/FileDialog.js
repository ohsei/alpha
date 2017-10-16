import React, {Component}from 'react'
import styled from 'styled-components'

const DialogDiv = styled.div`
  position: fixed;
  z-index: 9999;
  top: 150px;
  left: 100px;
  width: 500px;
  height: 300px;
  background-color: white;
  border: 1px solid black;
  display: ${props => props.show ? 'block' : 'none'}
`
const Button = styled.button`
  width: 50px;
  height: 50px;
`

class FileDialog extends Component{

  handleClick= () => {
    this.props.setShowFileDialog(false)
  }
  render () {
    return (
      <DialogDiv show={this.props.show}>
        <Button onClick={this.handleClick}>OK</Button>
      </DialogDiv>
    )
  }
}

export default FileDialog