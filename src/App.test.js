import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reducer from "./reducers/reducer";

it("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    data: [],
    searchInput: "",
    currentPage: 1
  });
});

it("sums numbers correctly", () => {
  expect(1 + 2).toEqual(3);
});
