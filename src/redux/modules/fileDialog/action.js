import {
  LOAD_FILE,
} from '../main/action-type'

import {
  SHOW_FILE_DIALOG,
  UPDATE_CONTENT,
  UPDATE_SELECT_FILE,
  SET_IS_FILE_LIST_UPDATE,
} from './action-type'

export const onLoadFile = (savedFile) => {
  return {
    type: LOAD_FILE,
    payload: savedFile,
  }
}

export const onShowFileDialog = (showStatus) => {
  return {
    type: SHOW_FILE_DIALOG,
    payload: showStatus
  }
}

export const updateContent = (content) => {
  return {
    type: UPDATE_CONTENT,
    payload: content,
  }
}

export const updateSelectFile = (filename) => {
  return {
    type: UPDATE_SELECT_FILE,
    payload: filename
  }
}

export const offIsFilelistUpdate = () => {
  return {
    type: SET_IS_FILE_LIST_UPDATE,
    payload: false
  }
}