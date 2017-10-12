import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LabNum from './LabNum'

const CustomCanvas = styled.canvas`

`

let isDragging = false
let isScaling = false
let isScalingLT = false
let isScalingRT = false
let isScalingRD = false
let isScalingLD = false
let x, y, relX, relY, scaleX, scaleY
let isFocused = false
const anchorSize = 20

class Canvas extends Component{
  constructor (props){
    super(props)

    this.state = {
      objX: 20,
      objY: 20,
      isFocused: false,    
      transformScale: 1,
      scale: 1,
      imgWidth: 0,
      imgHeight: 0,
    }
    this.loadImage = this.loadImage.bind(this)
    this.isOnTheImage = this.isOnTheImage.bind(this)
    this.isOnTheAnchor = this.isOnTheAnchor.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  static propTypes = {
    width: PropTypes.number,
    dataUrl: PropTypes.any,
    imgWidth: PropTypes.number,
    imgHeight: PropTypes.number,
    posX: PropTypes.number,
    posY: PropTypes.number,
    updateImage: PropTypes.func
  }

  loadImage (){
    let img = new Image()
    let canvas = this.imgCanvas
    let ctx = canvas.getContext('2d')

    img.onload = function (){
      let picWidth = img.width
      let picHeight = img.height
      let scale = 1.0

      if (img.width > (this.imgCanvas.offsetWidth - anchorSize*2)){
        picWidth = this.imgCanvas.offsetWidth - anchorSize*2
        scale = img.width / picWidth
        picHeight = picHeight / scale
      }
      //canvas.width = picWidth
      if (this.state.imgWidth !=0 ){
        picWidth = this.state.imgWidth
      }
      if (this.state.imgHeight !=0 ){
        picHeight = this.state.imgHeight
      }
    
      console.log('picWidth',picWidth)
      console.log('picHeight',picHeight)
      
      if (isScaling){
        const transformScale = this.state.transformScale
        if (transformScale != 1){
          picWidth = picWidth * transformScale
          picHeight = picHeight * transformScale
        }
        isScaling = false
        isScalingLD = false
        isScalingLT = false
        isScalingRD = false
        isScalingRT = false
      }
      canvas.height = picHeight + anchorSize*2

      ctx.drawImage(img, 0, 0, img.width,  img.height, this.state.objX, this.state.objY, picWidth, picHeight )

      if (picWidth != this.state.imgWidth){
        this.setState({imgWidth: picWidth})
      }
      if (picHeight != this.state.imgHeight){
        this.setState({imgHeight: picHeight})
      }

      if (this.state.isFocused){
        ctx.strokeStyle = 'black'
        ctx.strokeRect(this.state.objX-anchorSize,this.state.objY-anchorSize,anchorSize,anchorSize)
        ctx.strokeRect(this.state.objX+picWidth,this.state.objY-anchorSize,anchorSize,anchorSize )
        ctx.strokeRect(this.state.objX-anchorSize,this.state.objY+picHeight,anchorSize,anchorSize )
        ctx.strokeRect(this.state.objX+picWidth,this.state.objY+picHeight,anchorSize,anchorSize )
      }
     
    
   // ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, picWidth, picHeight)
    }.bind(this)
    img.src = this.props.dataUrl
  }

  componentWillMount (){
    this.setState({
      imgWidth: this.props.imgWidth
    })
    this.setState({
      imgHeight: this.props.imgHeight
    })
    this.setState({
      objX: this.props.objX
    })
    this.setState({
      objY: this.props.objY
    })
  }

  componentDidMount (){
    this.loadImage ()
  }
  componentDidUpdate (){
    this.loadImage ()
  }

  isOnTheImage (objX, x, objY, y){
    if (objX < x && (objX + this.state.imgWidth) > x && objY < y && (objY + this.state.imgHeight) > y){
      return true
    }
    else return false
  }

  isOnTheAnchor (minX, maxX, minY, maxY ){
    if (minX < x && x < maxX && minY < y && y < maxY) {
      return true
    }
    else return false
  }
  
  handleMouseDown (e){

    var objX = this.state.objX
    var objY = this.state.objY
    // マウスが押された座標を取得
    var rect = e.target.getBoundingClientRect() ;
    x = e.clientX - rect.left
    y = e.clientY - rect.top
  
    const minXLT = objX - anchorSize
    const maxXLT = objX
    const minYLT = objY - anchorSize
    const maxYLT = objY

    const minXRT = objX + this.state.imgWidth
    const maxXRT = objX + this.state.imgWidth + anchorSize
    const minYRT = objY - anchorSize
    const maxYRT = objY

    const minXLD = objX - anchorSize
    const maxXLD = objX
    const minYLD = objY + this.state.imgHeight  
    const maxYLD = objY + this.state.imgHeight + anchorSize

    const minXRD = objX + this.state.imgWidth
    const maxXRD = objX + this.state.imgWidth + anchorSize
    const minYRD = objY + this.state.imgHeight
    const maxYRD = objY + this.state.imgHeight + anchorSize
    
    //anchor上の座標かどうかを判定
    if (this.isOnTheAnchor(minXLT, maxXLT, minYLT, maxYLT)) {
      isScaling = true
      isScalingLT = true
      relX = objX - x
      relY = objY - y
    }
    else if (this.isOnTheAnchor(minXRT, maxXRT, minYRT, maxYRT)) {
      isScaling = true
      isScalingRT = true
      relX = x
      relY = objY - y
    }
    else if (this.isOnTheAnchor(minXLD, maxXLD, minYLD, maxYLD)) {
      isScaling = true
      isScalingLD = true
      relX = objX - x
      relY = y
    }
    else if (this.isOnTheAnchor(minXRD, maxXRD, minYRD, maxYRD)) {
      isScaling = true
      isScalingRD = true
      relX = x
      relY = y
    }else{
      // オブジェクト上の座標かどうかを判定
      if (this.isOnTheImage(objX, x, objY, y)) {
        isDragging = true; // ドラッグ開始
        relX = objX - x;
        relY = objY - y;
      }
    }
  }

  handleMouseUp (){
    if (isScaling) {
      let scaleX = 0
      let scaleY = 0
      let newX = this.state.objX
      let newY = this.state.objY

      if (isScalingLT){
        scaleX = (x+relX)-this.state.objX
        scaleY = (x+relY)-this.state.objY
        newX = x + relX
        newY = y + relY
      }
      else if (isScalingRT){
        scaleX = relX - x
        scaleY = (x+relY)-this.state.objY
        newX = this.state.objX
        newY = y + relY
      }
      else if (isScalingLD){
        scaleX = (x+relX)-this.state.objX
        scaleY = relY - y
        newX = x + relX
        newY = this.state.objY
      }
      else if (isScalingRD){
        scaleX = relX - x
        scaleY = relY - y
        newX = this.state.objX
        newY = this.state.objY
      }

      const transformScaleX = (this.state.imgWidth - scaleX) / this.state.imgWidth
      const transformScaleY = (this.state.imgHeight - scaleY) / this.state.imgHeight
      let transformScale = 1 
      if (transformScaleX >= transformScaleY){
        transformScale = transformScaleX
      }
      else {
        transformScale = transformScaleY
      }
      this.setState({transformScale: transformScale})
      this.setState({objX: newX})
      this.setState({objY: newY})
    }
    isDragging = false
    let ctx = this.imgCanvas.getContext('2d')
    ctx.clearRect(0, 0, this.imgCanvas.width, this.imgCanvas.height)
    this.loadImage()
  }

  handleMouseMove (e){
    var rect = e.target.getBoundingClientRect()
    x = e.clientX - rect.left
    y = e.clientY - rect.top
    
    // ドラッグが開始されていればオブジェクトの座標を更新して再描画
    if (isDragging) {
      this.setState({objX: x + relX})
      this.setState({objY: y + relY})
    }
  }

  handleFocus (){
    this.setState({isFocused: true})
  }

  handleBlur (){
    this.setState({isFocused: false})
    this.props.updateImage(this.state.imgWidth, this.state.imgHeight, this.state.objX, this.state.objY)
  }
  render (){
    return (
    <CustomCanvas
      width={this.props.width}
      height='200px'
      innerRef={(ref) => {this.imgCanvas = ref}}
      tabIndex='0'
      onFocus={this.handleFocus}
      onBlur={this.handleBlur}
      onMouseDown={this.handleMouseDown}
      onMouseUp={this.handleMouseUp}
      onMouseMove={this.handleMouseMove}
    />
    )
  }
}

export default Canvas