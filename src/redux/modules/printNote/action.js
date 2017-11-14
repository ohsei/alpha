import {
  UPDATE_PRINT
} from '../main/action-type'

import {
  UPDATE_PRINT_STATUS,
  UPDATE_LOADED_ARRAY
} from './action-type'

export const printFinish = () => {
  return {
    type: UPDATE_PRINT,
    payload: false
  }
}

export const setPrintStatus = (status) => {
  return {
    type: UPDATE_PRINT_STATUS,
    payload: status
  }
}

export const updateLoadedArray = (loadedArray) => {
  return {
    type: UPDATE_LOADED_ARRAY,
    payload: loadedArray
  }
}