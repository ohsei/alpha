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
    this.onFocus = this.onFocus.bind(this)
    this.setBold = this.setBold.bind(this)
    this.setColor = this.setColor.bind(this)
    this.setItalic = this.setItalic.bind(this)
    this.setUnderline =  this.setUnderline.bind(this)
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
    addSegment: PropTypes.func,
    tabNodeList: PropTypes.array,
    addTabNode: PropTypes.func,
    delTabNode: PropTypes.func,
    setCurSegment: PropTypes.func,
    setCurComponent: PropTypes.func,
    updateTabNode: PropTypes.func,
  }

  setBold (){
    this.sentence.setBold()
  }
  setColor (color){
    this.sentence.setColor(color)
  }
  setItalic (){
    this.sentence.setItalic()
  }
  setUnderline (){
    this.sentence.setUnderline()
  }
  getHeight (){
    return this.divSentences.offsetHeight
  }

  onUpChange (){
    this.props.updateJaHtml({jaHtml: this.upJaHtml.htmlEl.innerHTML})
  }

  onDownChange (){
    this.props.updateJaHtml({jaHtml: this.downJaHtml.htmlEl.innerHTML})
  }

  onFocus (){
    const {id, setCurSegment, setCurComponent} = this.props
    setCurSegment(id)
    setCurComponent(this.sentence)
  }

  componentDidUpdate (){
    const {id, tabNodeList, updateTabNode} = this.props
    const upJaNode = () => { return (this.upJaHtml ? this.upJaHtml.htmlEl : null)}
    const enNode = this.sentence.inputText.htmlEl
    const downJaNode = () => {return (this.downJaHtml ? this.downJaHtml.htmlEl : null)}

    let node = []

    if (upJaNode()){
      node = [{label: 'up', node: upJaNode()}, {label: 'en', node: enNode}]
    }
    else if (downJaNode()){
      node = [{label: 'en', node: enNode}, {label: 'down', node: downJaNode()}]
    }
    else {
      node = [{label: 'en', node: enNode}]
    }

    let i = 0
    let tabNode = tabNodeList[i]

    while (tabNodeList[i].id != id){
      i++
    }
    /* const tabNode = tabNodeList.find((tabNode) => {
      return (tabNode.id === id);
    })*/

    if (tabNode){
      if (tabNode.node.length != node.length){
        updateTabNode({id: id, node: node})
      }
      else {
        for (let i = 0;i < node.length;i++){
          if (tabNode.node[i].label != node[i].label){
            updateTabNode({id: id, node: node})
            return
          }
        }
      }
    }
  }

  componentDidMount (){
    const {id, addTabNode} = this.props
    const upJaNode = () => { return (this.upJaHtml ? this.upJaHtml.htmlEl : null)}
    const enNode = this.sentence.inputText.htmlEl
    const downJaNode = () => {return (this.downJaHtml ? this.downJaHtml.htmlEl : null)}

    let node = []

    if (upJaNode()){
      node = [{label: 'up', node: upJaNode()}, {label: 'en', node: enNode}]
    }
    else if (downJaNode()){
      node = [{label: 'en', node: enNode}, {label: 'down', node: downJaNode()}]
    }
    else {
      node = [{label: 'en', node: enNode}]
    }

    addTabNode({id: id, node: node })
  }

  componentWillUnmount (){
    const {id, delTabNode} = this.props
    delTabNode(id)
  }

  render (){
    const {segContent, id, setting, isPrint, curSegmentNo, updateTabNode} = this.props
    const upJaSize = setting.upJaSize
    const downJaSize = setting.downJaSize

    return (
      <DivSentences
        onFocus={this.onFocus}
        onKeyDown={this.keyDown}
        innerRef={ref => this.divSentences = ref}
        width={this.props.senWidth}>
        {setting.upJaSize != 'オフ' && <DivJan html={segContent.jaHtml} innerRef={ref => this.upJaHtml = ref} fontSize={upJaSize} spellCheck={false} onChange={this.onUpChange} />}
        <Sentence
          curSegmentNo={curSegmentNo}
          isPrint={isPrint}
          ref={ref => this.sentence = ref}
          id={id}
          segContent={segContent}
          addSegment={this.props.addSegment}
          updateHtml={this.props.updateHtml}
        />
        {setting.downJaSize != 'オフ' && <DivJan html={segContent.jaHtml} innerRef={ref => this.downJaHtml = ref} fontSize={downJaSize} spellCheck={false} onChange={this.onDownChange} />}
      </DivSentences>
    )
  }
}

export default Sentences