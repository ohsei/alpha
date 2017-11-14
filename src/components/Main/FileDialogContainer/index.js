import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as Action from '../../../redux/modules/fileDialog/action'
import FileDialog from '../FileDialog'

const mapStateToProps = ({fileDialog}) => {

  return {
    ...fileDialog
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Action, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileDialog)
