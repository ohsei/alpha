import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as Action from '../../redux/modules/main/action'
import Main from '../Main'

const mapStateToProps = ({main}) => {

  return {
    ...main
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Action, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main)
