import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ContentEditable from 'react-contenteditable'
import {pick, keys} from 'lodash'

import Sentence from './Sentence'

const DivSentences = styled.div`
  width: ${props => `${props.width}px`};
`
const DivJan = styled(ContentEditable)`
  border: 1px solid white;
  width: 95%;
  font-size: ${props => props.fontSize}
`

class Sentences extends Component{
  constructor (props){
    super(props)
    this.getHeight = this.getHeight.bind(this)
  }
  static propTypes = {
    segmentId: PropTypes.number,
    senWidth: PropTypes.number,
    note: PropTypes.array,
    setting: PropTypes.object,
  }

  getHeight (){
    return this.divSentences.offsetHeight
  }

  render (){
    const {setting, note, segmentId} = this.props
    const upJaSize = setting.upJaSize
    const downJaSize = setting.downJaSize

    return (
      <DivSentences
        innerRef={ref => this.divSentences = ref}
        width={this.props.senWidth}>
        {setting.upJaSize != 'オフ' && <DivJan html={note[segmentId].jaHtml} innerRef={ref => this.upJaHtml = ref} fontSize={upJaSize} spellCheck={false} onChange={this.onUpChange} />}
        <Sentence
          ref={ref => this.sentence = ref}
          {...pick(this.props, keys(Sentence.propTypes))}
        />
        {setting.downJaSize != 'オフ' && <DivJan html={note[segmentId].jaHtml} innerRef={ref => this.downJaHtml = ref} fontSize={downJaSize} spellCheck={false} onChange={this.onDownChange} />}
      </DivSentences>
    )
  }
}

export default Sentences