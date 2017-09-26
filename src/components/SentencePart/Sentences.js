import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Sentence from './Sentence'


class Sentences extends Component{
  constructor (props){
    super(props)
  }
  static propTypes = {
    id: PropTypes.number,
    note: PropTypes.arrayOf(PropTypes.object),
    addSentence: PropTypes.func,
    delSentence: PropTypes.func,
  }
  render (){
    const {note, id} = this.props

    return (
      <Sentence
        sentenceNum={note[id].sentenceNum}
        marginTopArray={note[id].marginTopArray}
        addSentence={this.props.addSentence}
        delSentence={this.props.delSentence}
        {...this.props} />
    )
  }
}

export default Sentences