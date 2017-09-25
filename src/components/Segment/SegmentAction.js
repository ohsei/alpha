import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DivAction = styled.div`
  display: flex;
  -webkit-box-pack:justify;
  -ms-flex-pack:justify;
  justify-content: space-between;
`
const StyledButton = styled.button`
  margin: 0px 5px 0px 5px;
  width: 40px;
  height: 40px;
  border: 1px solid white;
`
const ImgAddLabel = styled.label`
  margin: 0px 5px 0 5px;
  width: 40px;
  height: 40px;
  border: 1px solid white;
  display: inline-block;
`
const InputFileOpen = styled.input`
  display: none;
`

class SegmentAction extends Component{
  constructor (props){
    super(props)
    this.addSegment = this.addSegment.bind(this)
    this.delSegment = this.delSegment.bind(this)
    this.addPageBreak = this.addPageBreak.bind(this)
    this.setImgOnly = this.setImgOnly.bind(this)
    this.setImgTxt = this.setImgTxt.bind(this)
    this.setTxtImg = this.setTxtImg.bind(this)
    this.setTxtOnly = this.setTxtOnly.bind(this)
    this.imgAdd = this.imgAdd.bind(this)
  }

  setImgOnly (){
    if (this.props.curSegmentNo != this.props.id){
      alert('先に選択してください。')
    }else{
      this.props.setType({type: 'imgOnly'})
    }
  }

  setImgTxt (){
    if (this.props.curSegmentNo != this.props.id){
      alert('先に選択してください。')
    }else{
      this.props.setType({type: 'imgTxt'})
    }
  }

  setTxtImg (){
    if (this.props.curSegmentNo != this.props.id){
      alert('先に選択してください。')
    }else{
      this.props.setType({type: 'txtImg'})
    }
  }

  setTxtOnly (){
    if (this.props.curSegmentNo != this.props.id){
      alert('先に選択してください。')
    }else{
      this.props.setType({type: 'txtOnly'})
    }
  }

  delSegment (){
    if (this.props.curSegmentNo != this.props.id){
      alert('先に選択してください。')
    }else{
      this.props.delSegment({pattern:'del'})
    }
  }

  addSegment (){
    if (this.props.curSegmentNo != this.props.id){
      alert('先に選択してください。')
    }else{
      this.props.addSegment({pattern:'add', type: 'txtOnly'})
    }
  }

  addPageBreak (){
    if (this.props.curSegmentNo != this.props.id){
      alert('先に選択してください。')
    }else{
      this.props.addPageBreak()
    }
  }

  imgAdd (event){
    if (this.props.curSegmentNo != this.props.id){
      alert('先に選択してください。')
    }else{
      let file = event.target.files[0] // FileList object

      if (file != null){
        // Loop through the FileList and render image files as thumbnails.
        // for (let i = 0, f; f = files[i]; i++) {
        var reader = new FileReader()

        reader.onload = function (){
          var canvas = this.imgCanvas
          
          var ctx = canvas.getContext('2d')
          var img = new Image()

          var url = window.URL || window.webkitURL
          var src = url.createObjectURL(file)
          img.src = src
          img.onload = function (){
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0, img.width, img.height)
            url.revokeObjectURL(src)
            var dataUrl = canvas.toDataURL('img/png')
            this.props.setImg({img: dataUrl})
          }.bind(this)
        }.bind(this)

        reader.readAsText(file)
      }
    }
  }
  componentDidMount (){
    if (this.props.curSegmentNo == 0){
      this.btnDelSeg.disabled = true
      this.btnDelSeg.style.backgroundImage = 'url('+require('../../resources/img/delete_gray.png')+')'
    }
    else{
      this.btnDelSeg.disabled = false
      this.btnDelSeg.style.backgroundImage = 'url('+require('../../resources/img/delete.png')+')'
    }
    if (this.props.type == 'txtOnly'){
      this.imgAddAction.disabled = true
    }else{
      this.imgAddAction.disabled = false
    }


    switch (this.props.type){
      case 'txtOnly':
        this.txtOnly.style.backgroundImage = `url(${require('../../resources/img/text.png')})`
        this.imgOnly.style.backgroundImage = `url(${require('../../resources/img/pict_gray.png')})`
        this.imgTxt.style.backgroundImage = `url(${require('../../resources/img/picttext_gray.png')})`
        this.txtImg.style.backgroundImage = `url(${require('../../resources/img/textpict_gray.png')})`
        break
      case 'imgTxt':
        this.txtOnly.style.backgroundImage = `url(${require('../../resources/img/text_gray.png')})`
        this.imgOnly.style.backgroundImage = `url(${require('../../resources/img/pict_gray.png')})`
        this.imgTxt.style.backgroundImage = `url(${require('../../resources/img/picttext.png')})`
        this.txtImg.style.backgroundImage = `url(${require('../../resources/img/textpict_gray.png')})`
        break
      case 'txtImg':
        this.txtOnly.style.backgroundImage = `url(${require('../../resources/img/text_gray.png')})`
        this.imgOnly.style.backgroundImage = `url(${require('../../resources/img/pict_gray.png')})`
        this.imgTxt.style.backgroundImage = `url(${require('../../resources/img/picttext_gray.png')})`
        this.txtImg.style.backgroundImage = `url(${require('../../resources/img/textpict.png')})`
        break
      case 'imgOnly':
        this.txtOnly.style.backgroundImage = `url(${require('../../resources/img/text_gray.png')})`
        this.imgOnly.style.backgroundImage = `url(${require('../../resources/img/pict.png')})`
        this.imgTxt.style.backgroundImage = `url(${require('../../resources/img/picttext_gray.png')})`
        this.txtImg.style.backgroundImage = `url(${require('../../resources/img/textpict_gray.png')})`
        break
    }
  }
  componentDidUpdate (){
    if (this.props.curSegmentNo == 0){
      this.btnDelSeg.disabled = true
    }
    else{
      this.btnDelSeg.disabled = false
    }
    if (this.props.type == 'txtOnly'){
      this.imgAddAction.disabled = true
    }else{
      this.imgAddAction.disabled = false
    }
    switch (this.props.type){
      case 'txtOnly':
        this.txtOnly.style.backgroundImage = `url(${require('../../resources/img/text.png')})`
        this.imgOnly.style.backgroundImage = `url(${require('../../resources/img/pict_gray.png')})`
        this.imgTxt.style.backgroundImage = `url(${require('../../resources/img/picttext_gray.png')})`
        this.txtImg.style.backgroundImage = `url(${require('../../resources/img/textpict_gray.png')})`
        break
      case 'imgTxt':
        this.txtOnly.style.backgroundImage = `url(${require('../../resources/img/text_gray.png')})`
        this.imgOnly.style.backgroundImage = `url(${require('../../resources/img/pict_gray.png')})`
        this.imgTxt.style.backgroundImage = `url(${require('../../resources/img/picttext.png')})`
        this.txtImg.style.backgroundImage = `url(${require('../../resources/img/textpict_gray.png')})`
        break
      case 'txtImg':
        this.txtOnly.style.backgroundImage = `url(${require('../../resources/img/text_gray.png')})`
        this.imgOnly.style.backgroundImage = `url(${require('../../resources/img/pict_gray.png')})`
        this.imgTxt.style.backgroundImage = `url(${require('../../resources/img/picttext_gray.png')})`
        this.txtImg.style.backgroundImage = `url(${require('../../resources/img/textpict.png')})`
        break
      case 'imgOnly':
        this.txtOnly.style.backgroundImage = `url(${require('../../resources/img/text_gray.png')})`
        this.imgOnly.style.backgroundImage = `url(${require('../../resources/img/pict.png')})`
        this.imgTxt.style.backgroundImage = `url(${require('../../resources/img/picttext_gray.png')})`
        this.txtImg.style.backgroundImage = `url(${require('../../resources/img/textpict_gray.png')})`
        break
    }
  }

  render (){
    const imgopenId = 'imgopen' + (this.props.id).toString()
    
    return (
      <DivAction>
        <StyledButton
          style={{
                  marginLeft: 5,
                  backgroundImage: 'url('+require('../../resources/img/delete.png')+')',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat'
                }}
          innerRef={(ref) => {this.btnDelSeg = ref}}
          onClick={this.delSegment} />
        <div style={{display: 'flex'}}>
        <ImgAddLabel
          style={{backgroundImage: 'url('+require('../../resources/img/import_pict.png')+')',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                }}
          htmlFor={imgopenId} innerRef={(ref) => {this.imgAddLabel = ref}}></ImgAddLabel>
        <InputFileOpen id={imgopenId} type='file'
          innerRef={(ref) => {this.imgAddAction = ref}}
          onChange={this.imgAdd} />
        <canvas style={{display: 'none'}} ref={(ref) => {this.imgCanvas = ref}} />
        <StyledButton
          style={{marginLeft: 30,
                 backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',}}
          innerRef={(ref) => {this.imgOnly = ref}}
          onClick={this.setImgOnly} />
        <StyledButton
          style={{
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  width: 80
                  }}
          innerRef={(ref) => {this.imgTxt = ref}}
          onClick={this.setImgTxt} />
        <StyledButton
          style={{
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  width: 80
                  }}
          innerRef={(ref) => {this.txtImg = ref}}
          onClick={this.setTxtImg} />
        <StyledButton
          style={{
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  }}
          innerRef={(ref) => {this.txtOnly = ref}}
          onClick={this.setTxtOnly} />
        <StyledButton
          style={{backgroundImage: 'url('+require('../../resources/img/add_row.png')+')',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                }}
          innerRef={(ref) => {this.btnAddSeg = ref}}
          onClick={this.addSegment} />
          </div>
          <StyledButton
          style={{
            marginRight: 5,
            backgroundImage: 'url('+require('../../resources/img/new_page.png')+')',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
          innerRef={(ref) => {this.btnPageBreak = ref}}
          onClick={this.addPageBreak} />
      </DivAction>
    )
  }
}

SegmentAction.propTypes = {
  id: PropTypes.any,
  curSegmentNo: PropTypes.any,
  addSegment: PropTypes.any,
  delSegment: PropTypes.any,
  addPageBreak: PropTypes.any,
  setType: PropTypes.any,
  setImg: PropTypes.any,
  type: PropTypes.string.isRequired,
}

export default SegmentAction
