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
  font-size: ${props => props.fontSize}
`

class Sentences extends Component{
  constructor (props){
    super(props)
    this.getHeight = this.getHeight.bind(this)
    this.onDownChange = this.onDownChange.bind(this)
    this.onUpChange = this.onUpChange.bind(this)
  }
  static propTypes = {
    curSegmentNo: PropTypes.number,
    id: PropTypes.number,
    senWidth: PropTypes.number,
    segContent: PropTypes.object,
    setting: PropTypes.object,
    isPrint: PropTypes.bool,
    updateHtml: PropTypes.func,
    updateJaHtml: PropTypes.func,
    addSentence: PropTypes.func,
    delSentence: PropTypes.func,
    addSegment: PropTypes.func,
  }

  getHeight (){
    return this.divSentences.offsetHeight
  }

  onUpChange (){
    this.props.updateJaHtml({jaHtml: this.upJaHtml.htmlEl.innerHTML})
  }

  onDownChange (){
    this.props.updateJaHtml({jaHtml: this.upJaHtml.htmlEl.innerHTML})
  }

  render (){
    const {segContent, id, setting, isPrint, curSegmentNo} = this.props
    const upJaSize = setting.upJaSize
    const downJaSize = setting.downJaSize

    return (
      <DivSentences
        innerRef={ref => this.divSentences = ref}
        width={this.props.senWidth}>
        {setting.upJaSize != 'オフ' && <DivJan html={segContent.jaHtml} innerRef={ref => this.upJaHtml = ref} fontSize={upJaSize} spellCheck={false} onChange={this.onUpChange} />}
        <Sentence
          curSegmentNo={curSegmentNo}
          isPrint={isPrint}
          ref={ref => this.sentence = ref}
          id={id}
          segContent={segContent}
          marginTopArray={segContent.marginTopArray}
          offsetHeight={segContent.offsetHeight}
          addSentence={this.props.addSentence}
          delSentence={this.props.delSentence}
          addSegment={this.props.addSegment}
          updateHtml={this.props.updateHtml}
        />
        {setting.downJaSize != 'オフ' && <DivJan html={segContent.jaHtml} innerRef={ref => this.downJaHtml = ref} fontSize={downJaSize} spellCheck={false} onChange={this.onDownChange} />}
      </DivSentences>
    )
  }
}

export default Sentences