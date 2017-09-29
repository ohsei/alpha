import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ContentEditable from 'react-contenteditable'

import Sentence from './Sentence'

const DivSentences = styled.div`
  width: ${props => `${props.width}px`};
`
const DivJan = styled(ContentEditable)`
  border: 1px solid lightgray;
  width: 95%;
  font-size: ${props=>props.fontSize}
`

class Sentences extends Component{
  constructor (props){
    super(props)
    this.getHeight = this.getHeight.bind(this)
    this.onDownBlur = this.onDownBlur.bind(this)
    this.onUpBlur = this.onUpBlur.bind(this)
  }
  static propTypes = {
    id: PropTypes.number,
    note: PropTypes.arrayOf(PropTypes.object),
  }

  getHeight (){
    return this.divSentences.offsetHeight
  }

  onUpBlur (){
    let note = this.props.note
    note.jaHtml = this.upJaHtml.htmlEl.innerHTML
    this.props.updateNote(note)
  }

  onDownBlur (){
    let note = this.props.note
    note.jaHtml = this.downJaHtml.htmlEl.innerHTML
    this.props.updateNote(note)
  }
  render (){
    const {note, id, setting} = this.props
    const upJaSize = setting.upJaSize
    const downJaSize = setting.downJaSize

    return (
      <DivSentences
        innerRef={ref=>this.divSentences = ref}
        width={this.props.senWidth}>
        {setting.upJaSize != 'オフ' && <DivJan html={note[id].jaHtml} innerRef={ref=>this.upJaHtml=ref} fontSize={upJaSize} spellCheck={false} onBlur={this.onUpBlur} />}
        <Sentence
          ref={ref => this.sentence = ref}
          sentenceNum={note[id].sentenceNum}
          marginTopArray={note[id].marginTopArray}
          offsetHeight={note[id].offsetHeight}
          {...this.props} />
        {setting.downJaSize != 'オフ' && <DivJan html={note[id].jaHtml} innerRef={ref=>this.downJaHtml=ref} fontSize={downJaSize} spellCheck={false} onBlur={this.onDownBlur} />}
      </DivSentences>
    )
  }
}

export default Sentences