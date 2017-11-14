import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MiddleItem from './common/MiddleItem'

const DivSetMenu = styled.div`
  display: flex;
  flex-direction: row;
  -ms-flex-direction: row;
  justify-content: flex-start;
`

class ItemInputName extends Component{

  render (){
    return (
      <DivSetMenu>
        <MiddleItem >
          {this.props.name}
        </MiddleItem>
      </DivSetMenu>
    )}
}

ItemInputName.propTypes = {
  name: PropTypes.string,
}

export default ItemInputName
