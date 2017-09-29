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
        ref={ref => this.sentence = ref}
        sentenceNum={note[id].sentenceNum}
        marginTopArray={note[id].marginTopArray}
        offsetHeight={note[id].offsetHeight}
        {...this.props} />
    )
  }
}

export default Sentences