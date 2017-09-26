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
  }
  render (){
    const {note, id} = this.props

    return (
      <Sentence
        sentenceNum={note[id].sentenceNum}
        marginTopArray={note[id].marginTopArray}
        {...this.props} />
    )
  }
}

export default Sentences