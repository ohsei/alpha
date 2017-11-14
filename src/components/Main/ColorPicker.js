import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'
import {CompactPicker } from 'react-color'

import {defaultColors} from '../../utils/const'

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '0',
      g: '0',
      b: '0',
      a: '1',
    },
  };

  static propTypes = {
    setColor: PropTypes.func.isRequired,
  }
  setColor = (color) => {
    color = color.substr(4, color.length - 5)
    const tmpArray = color.split(',')
    const r = tmpArray[0].trim()
    const g = tmpArray[1].trim()
    const b = tmpArray[2].trim()

    const newColor = {
      r: r,
      g: g,
      b: b,
      a: 1
    }
    this.setState ({color: newColor})
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  handleChangeComplete = () => {
    this.props.setColor(this.state.color)
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  render () {

    const styles = reactCSS({
      'default': {
        color: {
          width: '45px',
          height: '40px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    })

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        { this.state.displayColorPicker ? <div style={styles.popover}>
          <div style={styles.cover} onClick={this.handleClose} />
          <CompactPicker colors={defaultColors} color={this.state.color} onChange={this.handleChange} onChangeComplete={this.handleChangeComplete} />
        </div> : null }

      </div>
    )
  }
}

export default ColorPicker