import {
  SHOW_FILE_DIALOG,
  UPDATE_CONTENT,
  UPDATE_SELECT_FILE,
  SET_IS_FILE_LIST_UPDATE
} from './action-type'

const initialState = {
  isShowFileDialog: false,
  content: [],
  selectedFile: '',
  isFileListUpdated: false,
}

const {assign} = Object

export default (state = initialState, action) => {
  const {payload} = action

  switch (action.type) {

  case SHOW_FILE_DIALOG:
    return assign({}, state, {
      isShowFileDialog: payload
    })

  case UPDATE_CONTENT:
    return assign({}, state, {
      content: payload
    })

  case UPDATE_SELECT_FILE:
    return assign({}, state, {
      selectedFile: payload
    })

  case SET_IS_FILE_LIST_UPDATE:
    return assign({}, state, {
      isFileListUpdated: payload
    })

  default:
    return state
  }
}
