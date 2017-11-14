import {
  SET_IS_SHOW_MENU,
} from './action-type'

const initialState = {
  isShowMenu: false,
}

const {assign} = Object

export default (state = initialState, action) => {
  const {payload} = action

  switch (action.type) {

  case SET_IS_SHOW_MENU:
    return assign({}, state, {
      isShowMenu: payload
    })
  default:
    return state
  }
}
