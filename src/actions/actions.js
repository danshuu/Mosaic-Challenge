import * as types from "./../constants/actionTypes";

export const changeInput = text => ({
  type: types.CHANGE_INPUT,
  payload: text
});

export const setData = data => ({
  type: types.SET_DATA,
  payload: data
});

export const setCurrentPage = num => ({
  type: types.SET_CURRENT_PAGE,
  payload: num
});
