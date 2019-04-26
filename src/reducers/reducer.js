import * as types from "./../constants/actionTypes";

const initialState = {
  data: [],
  searchInput: "",
  currentPage: 1
};

const reducer = (state = initialState, { type, payload }) => {
  const stateCopy = { ...state };
  // const { type, payload } = action;
  switch (type) {
    case types.CHANGE_INPUT:
      stateCopy.searchInput = payload;
      return { ...stateCopy };
    case types.SET_DATA:
      stateCopy.data = payload;
      return { ...stateCopy };
    case types.SET_CURRENT_PAGE:
      stateCopy.currentPage = payload;
      return { ...stateCopy };
    default:
      return state;
  }
};

export default reducer;
