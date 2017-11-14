import {
  UPDATE_FILE_TITLE,
  UPDATE_PRINT,
} from './action-type'

export const setFileTitle = (title) => {
  return {
    type: UPDATE_FILE_TITLE,
    payload: title
  }
}

export const printFinish = () => {
  return {
    type: UPDATE_PRINT,
    payload: false
  }
}
