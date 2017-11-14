import {
  SET_CUR_SEGMENT_NO,
  SET_CUR_COMPONENT,
  UPDATE_NOTE,
  UPDATE_TAB_NODE_LIST,
  UPDATE_IS_BOLD,
  UPDATE_IS_ITALIC,
  UPDATE_IS_UNDERLINE,
  UPDATE_CUR_COLOR,
} from '../main/action-type'

export const setCurSegment = (id) => {
  return {
    type: SET_CUR_SEGMENT_NO,
    payload: id
  }
}

export const setCurComponent = (component) => {
  return {
    type: SET_CUR_COMPONENT,
    payload: component
  }
}

export const updateNote = (note) => {
  return {
    type: UPDATE_NOTE,
    payload: note
  }
}

export const updateTabNodeList = (tabNodeList) => {
  return {
    type: UPDATE_TAB_NODE_LIST,
    payload: tabNodeList
  }
}

export const updateIsBold = (isBold) => {
  return {
    type: UPDATE_IS_BOLD,
    payload: isBold
  }
}

export const updateIsItalic = (isItalic) => {
  return {
    type: UPDATE_IS_ITALIC,
    payload: isItalic
  }
}

export const updateIsUnderline = (isUnderline) => {
  return {
    type: UPDATE_IS_UNDERLINE,
    payload: isUnderline
  }
}

export const updateCurColor = (curColor) => {
  return {
    type: UPDATE_CUR_COLOR,
    payload: curColor
  }
}
