"use strict";

var _Calendar = _interopRequireDefault(require("../Calendar"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe('Calendar', () => {
  test('Should resolve', () => {
    expect(_Calendar.default).toEqual(expect.anything());
  });
});