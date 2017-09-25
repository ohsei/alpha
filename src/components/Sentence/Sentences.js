import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Sentence from './Sentence'

import styled from 'styled-components'

const UlSen = styled.ul`
  width: 100%;
  margin-right: 0;
  padding: 0;
`

class Sentences extends Component{
  constructor (props){
    super(props)
  }

  getHeight (){
    return this.divSentences.offsetHeight
  }

  render (){
    let listItems = this.props.content.map((list) =>
      <Sentence
        ref={(ref) => {this.sentence = ref}}
        id={list.id}
        key={list.id}
        content={list.words}
        setting={this.props.setting}>
      </Sentence>
    )
    return (
      <UlSen innerRef={(ref) => this.divSentences = ref}>{listItems}</UlSen>
    )
  }
}

Sentences.propTypes = {
  content: PropTypes.any,
  setting: PropTypes.any,
}

export default Sentences