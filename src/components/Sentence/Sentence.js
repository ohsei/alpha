import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Words from './Words'
import styled from 'styled-components'

const DivSen = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
const DivSen2 = styled.div`
  width: 100%;
  height: 110px;
  z-index: 0;
  display: block;
  position: relative;
`
const DivLine = styled.div`
  width: 100%;
  display: flex;
  margin: 22px 0 0 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${props=>props.borderColor}
`
const DivLineTwo = styled.div`
  width: 100%;
  display: flex;
  margin: 22px 0 0 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.lineNum == 2 ? 'white' : props.borderColor};
`


class Sentence extends Component {
  constructor (props){
    super(props)
  }

  render (){
    return (
      <DivSen>
        <DivSen2>
          <DivLineTwo
            lineNum={this.props.setting.lineNum}
            borderColor={this.props.setting.lineColor} />
          <DivLine borderColor={this.props.setting.lineColor} />
          <DivLine borderColor='orange' />
          <DivLineTwo
            lineNum={this.props.setting.lineNum}
            borderColor={this.props.setting.lineColor} />
          <Words
            ref={(ref) => {this.words = ref}}
            content={this.props.content}
            fontSize={this.props.setting.enSize} />
        </DivSen2>
      </DivSen>
    )
  }
}

Sentence.propTypes = {
  id: PropTypes.any,
  content: PropTypes.any,
  setting: PropTypes.any,
}
export default Sentence