"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var initialState = true;

var myReducer = function myReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "SET_LOGIN":
      {
        return action.login;
      }
  }

  return state;
};

var _default = myReducer;
exports["default"] = _default;