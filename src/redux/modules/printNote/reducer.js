import {
  UPDATE_PRINT_STATUS,
  UPDATE_LOADED_ARRAY
} from './action-type'

const initialState = {
  printStatus: '印刷用意中...',
  loadedArray: []
}

const {assign} = Object

export default (state = initialState, action) => {
  const {payload} = action

  switch (action.type) {
  case UPDATE_PRINT_STATUS:
    return assign({}, state, {
      printStatus: payload
    })

  case UPDATE_LOADED_ARRAY:
    return assign({}, state, {
      loadedArray: payload
    })
  default:
    return state
  }
}
