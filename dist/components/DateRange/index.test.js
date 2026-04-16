"use strict";

var _react = _interopRequireDefault(require("react"));
var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));
var _addDays = _interopRequireDefault(require("date-fns/addDays"));
var _subDays = _interopRequireDefault(require("date-fns/subDays"));
var _DateRange = _interopRequireDefault(require("../DateRange"));
var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let testRenderer = null;
let instance = null;
const endDate = new Date();
const startDate = (0, _subDays.default)(endDate, 7);
const commonProps = {
  ranges: [{
    startDate,
    endDate,
    key: 'selection'
  }],
  onChange: () => {},
  moveRangeOnFirstSelection: false
};
const compareRanges = (newRange, assertionRange) => {
  ['startDate', 'endDate'].forEach(key => {
    if (!newRange[key] || !assertionRange[key]) {
      return expect(newRange[key]).toEqual(assertionRange[key]);
    }
    return expect((0, _isSameDay.default)(newRange[key], assertionRange[key])).toEqual(true);
  });
};
beforeEach(() => {
  testRenderer = _reactTestRenderer.default.create(/*#__PURE__*/_react.default.createElement(_DateRange.default, commonProps));
  instance = testRenderer.getInstance();
});
describe('DateRange', () => {
  test('Should resolve', () => {
    expect(_DateRange.default).toEqual(expect.anything());
  });
  test('calculate new selection by resetting end date', () => {
    const methodResult = instance.calcNewSelection((0, _subDays.default)(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: (0, _subDays.default)(endDate, 10),
      endDate: (0, _subDays.default)(endDate, 10)
    });
  });
  test('calculate new selection by resetting end date if start date is not before', () => {
    const methodResult = instance.calcNewSelection((0, _addDays.default)(endDate, 2), true);
    compareRanges(methodResult.range, {
      startDate: (0, _addDays.default)(endDate, 2),
      endDate: (0, _addDays.default)(endDate, 2)
    });
  });
  test('calculate new selection based on moveRangeOnFirstSelection prop', () => {
    testRenderer.update(/*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({}, commonProps, {
      moveRangeOnFirstSelection: true
    })));
    const methodResult = instance.calcNewSelection((0, _subDays.default)(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: (0, _subDays.default)(endDate, 10),
      endDate: (0, _subDays.default)(endDate, 3)
    });
  });
  test('calculate new selection by retaining end date, based on retainEndDateOnFirstSelection prop', () => {
    testRenderer.update(/*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({}, commonProps, {
      retainEndDateOnFirstSelection: true
    })));
    const methodResult = instance.calcNewSelection((0, _subDays.default)(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: (0, _subDays.default)(endDate, 10),
      endDate
    });
  });
  test('calculate new selection by retaining the unset end date, based on retainEndDateOnFirstSelection prop', () => {
    testRenderer.update(/*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({}, commonProps, {
      ranges: [{
        ...commonProps.ranges[0],
        endDate: null
      }],
      retainEndDateOnFirstSelection: true
    })));
    const methodResult = instance.calcNewSelection((0, _subDays.default)(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: (0, _subDays.default)(endDate, 10),
      endDate: null
    });
  });
});