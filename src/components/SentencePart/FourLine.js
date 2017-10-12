import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import html2canvas from 'html2canvas'
import FileSaver from 'file-saver'

const DivSen = styled.div`
  width: 100%;
  z-index: 0;
  display: block;
  padding-top: 15px;
  background-color: white;
`
const DivLine = styled.div`
  width: 100%;
  display: flex;
  margin: 22px 0 0 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.borderColor}
`
const DivLineTwo = styled.div`
  width: 100%;
  display: flex;
  margin: 22px 0 0 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.lineNum == 2 ? 'white' : props.borderColor};
`

const DivLineFirst = styled.div`
width: 100%;
display: flex;
margin: 15px 0 0 0;
border-width: 1px;
border-style: solid;
border-color: ${props => props.lineNum == 2 ? 'white' : props.borderColor};
`
class FourLine extends React.Component{
  static propTypes = {
    marginTop: PropTypes.number
  }
  componentDidMount(){
    html2canvas(this.divsen, {
      onrendered: function(canvas) {
      //  const blob = canvas.msToBlob(blob)
      //  window.navigator.msSaveBlob(blob, "fourline.png")
        canvas.toBlob(function(blob){
        FileSaver.saveAs(blob, "fourline.png")
        })
      }
    })
  }
  render (){
    const {marginTop} = this.props
    return (
      <DivSen
        innerRef={ref=>this.divsen=ref}
        style={{marginTop: marginTop}}>
        <DivLineFirst borderColor='gray' />
        <DivLine borderColor='gray' />
        <DivLine borderColor='orange' />
        <DivLineTwo borderColor='gray' />
      </DivSen>
    )
  }
}

export default FourLine