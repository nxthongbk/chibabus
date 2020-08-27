"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _device = _interopRequireDefault(require("./device"));

var _buscounter = _interopRequireDefault(require("./buscounter"));

var _customeronday = _interopRequireDefault(require("./customeronday"));

var _customeronmonth = _interopRequireDefault(require("./customeronmonth"));

var _login = _interopRequireDefault(require("./login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var myReducer = (0, _redux.combineReducers)({
  devices: _device["default"],
  buscounter: _buscounter["default"],
  customeronday: _customeronday["default"],
  customeronmonth: _customeronmonth["default"],
  isLogin: _login["default"]
});
var _default = myReducer;
exports["default"] = _default;