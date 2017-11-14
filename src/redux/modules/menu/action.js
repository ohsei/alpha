import {
  SHOW_FILE_DIALOG,
  SET_IS_FILE_LIST_UPDATE,
} from '../fileDialog/action-type'
import {
  UPDATE_PRINT,
  UPDATE_SETTING,
  INIT_NOTE,
  UPDATE_WIDTH
} from '../main/action-type'

import {
  SET_IS_SHOW_MENU
} from './action-type'

export const onShowFileDialog = () => {
  return {
    type: SHOW_FILE_DIALOG,
    payload: true,
  }
}

export const onPrint = () => {
  return {
    type: UPDATE_PRINT,
    payload: true,
  }
}

export const onIsFilelistUpdate = () => {
  return {
    type: SET_IS_FILE_LIST_UPDATE,
    payload: true,
  }
}

export const updateSetting = (setting) => {
  return {
    type: UPDATE_SETTING,
    payload: setting
  }
}

export const initalNote = () => {
  return {
    type: INIT_NOTE,
  }
}

export const updateWidth = (width) => {
  return {
    type: UPDATE_WIDTH,
    payload: width
  }
}

export const onShowMenu = (isShowMenu) => {
  return {
    type: SET_IS_SHOW_MENU,
    payload: isShowMenu
  }
}