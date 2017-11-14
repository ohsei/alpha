import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as Action from '../../../../redux/modules/segments/action'
import Segments from '../Segments'

const mapStateToProps = ({segments, main}) => {
  return {
    ...segments,
    ...main
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Action, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Segments)
