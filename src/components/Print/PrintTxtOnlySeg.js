import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Sentences from './Sentences'
import PrintLabNum from './PrintLabNum'

const SentenceArea = styled.div`
  display: flex;
  width: ${props => `${props.width}px`};
`

class PrintTxtOnlySeg extends Component{
  constructor (props){
    super(props)
  }
  static propTypes = {
    id: PropTypes.number,
    width: PropTypes.number,
    segContent: PropTypes.object,
    setting: PropTypes.object,
    updateHtml: PropTypes.func,
    updateJaHtml: PropTypes.func,
    addSentence: PropTypes.func,
    delSentence: PropTypes.func,
  }

  render (){
    const {segContent, width, setting, id,
      updateHtml, updateJaHtml, addSentence, delSentence} = this.props

    return (
      <SentenceArea width={width}>
        <PrintLabNum {...this.props} />
        <Sentences
          id={id}
          senWidth={width - 50}
          segContent={segContent}
          setting={setting}
          updateHtml={updateHtml}
          updateJaHtml={updateJaHtml}
          addSentence={addSentence}
          delSentence={delSentence} />
      </SentenceArea>
    )
  }
}

export default PrintTxtOnlySeg
