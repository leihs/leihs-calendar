"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Calendar = _interopRequireDefault(require("../Calendar"));
var _DayCell = require("../DayCell");
var _utils = require("../../utils");
var _max = _interopRequireDefault(require("date-fns/max"));
var _isWithinInterval = _interopRequireDefault(require("date-fns/isWithinInterval"));
var _min = _interopRequireDefault(require("date-fns/min"));
var _addDays = _interopRequireDefault(require("date-fns/addDays"));
var _differenceInCalendarDays = _interopRequireDefault(require("date-fns/differenceInCalendarDays"));
var _isBefore = _interopRequireDefault(require("date-fns/isBefore"));
var _classnames = _interopRequireDefault(require("classnames"));
var _styles = _interopRequireDefault(require("../../styles"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class DateRange extends _react.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "calcNewSelection", (value, isSingleValue = true) => {
      const focusedRange = this.props.focusedRange || this.state.focusedRange;
      const {
        ranges,
        onChange,
        maxDate,
        moveRangeOnFirstSelection,
        retainEndDateOnFirstSelection,
        disabledDates
      } = this.props;
      const focusedRangeIndex = focusedRange[0];
      const selectedRange = ranges[focusedRangeIndex];
      if (!selectedRange || !onChange) return {};
      let {
        startDate,
        endDate
      } = selectedRange;
      const now = new Date();
      let nextFocusRange;
      if (!isSingleValue) {
        startDate = value.startDate;
        endDate = value.endDate;
      } else if (focusedRange[1] === 0) {
        // startDate selection
        const dayOffset = (0, _differenceInCalendarDays.default)(endDate || now, startDate);
        const calculateEndDate = () => {
          if (moveRangeOnFirstSelection) {
            return (0, _addDays.default)(value, dayOffset);
          }
          if (retainEndDateOnFirstSelection) {
            if (!endDate || (0, _isBefore.default)(value, endDate)) {
              return endDate;
            }
            return value;
          }
          return value || now;
        };
        startDate = value;
        endDate = calculateEndDate();
        if (maxDate) endDate = (0, _min.default)([endDate, maxDate]);
        nextFocusRange = [focusedRange[0], 1];
      } else {
        endDate = value;
      }

      // reverse dates if startDate before endDate
      let isStartDateSelected = focusedRange[1] === 0;
      if ((0, _isBefore.default)(endDate, startDate)) {
        isStartDateSelected = !isStartDateSelected;
        [startDate, endDate] = [endDate, startDate];
      }
      const inValidDatesWithinRange = disabledDates.filter(disabledDate => (0, _isWithinInterval.default)(disabledDate, {
        start: startDate,
        end: endDate
      }));
      if (inValidDatesWithinRange.length > 0) {
        if (isStartDateSelected) {
          startDate = (0, _addDays.default)((0, _max.default)(inValidDatesWithinRange), 1);
        } else {
          endDate = (0, _addDays.default)((0, _min.default)(inValidDatesWithinRange), -1);
        }
      }
      if (!nextFocusRange) {
        const nextFocusRangeIndex = (0, _utils.findNextRangeIndex)(this.props.ranges, focusedRange[0]);
        nextFocusRange = [nextFocusRangeIndex, 0];
      }
      return {
        wasValid: !(inValidDatesWithinRange.length > 0),
        range: {
          startDate,
          endDate
        },
        nextFocusRange: nextFocusRange
      };
    });
    _defineProperty(this, "setSelection", (value, isSingleValue) => {
      const {
        onChange,
        ranges,
        onRangeFocusChange
      } = this.props;
      const focusedRange = this.props.focusedRange || this.state.focusedRange;
      const focusedRangeIndex = focusedRange[0];
      const selectedRange = ranges[focusedRangeIndex];
      if (!selectedRange) return;
      const newSelection = this.calcNewSelection(value, isSingleValue);
      onChange({
        [selectedRange.key || `range${focusedRangeIndex + 1}`]: {
          ...selectedRange,
          ...newSelection.range
        }
      });
      this.setState({
        focusedRange: newSelection.nextFocusRange,
        preview: null
      });
      onRangeFocusChange && onRangeFocusChange(newSelection.nextFocusRange);
    });
    _defineProperty(this, "handleRangeFocusChange", focusedRange => {
      this.setState({
        focusedRange
      });
      this.props.onRangeFocusChange && this.props.onRangeFocusChange(focusedRange);
    });
    _defineProperty(this, "updatePreview", val => {
      if (!val) {
        this.setState({
          preview: null
        });
        return;
      }
      const {
        rangeColors,
        ranges
      } = this.props;
      const focusedRange = this.props.focusedRange || this.state.focusedRange;
      const rangeColor = ranges[focusedRange[0]] && ranges[focusedRange[0]].color;
      const color = rangeColor || rangeColors[focusedRange[0]];
      this.setState({
        preview: {
          ...val.range,
          color
        }
      });
    });
    this.state = {
      focusedRange: props.initialFocusedRange || [(0, _utils.findNextRangeIndex)(props.ranges), 0],
      preview: null
    };
    this.styles = (0, _utils.generateStyles)([_styles.default, props.classNames]);
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(_Calendar.default, _extends({
      focusedRange: this.state.focusedRange,
      onRangeFocusChange: this.handleRangeFocusChange,
      preview: this.state.preview,
      onPreviewChange: value => {
        this.updatePreview(value ? this.calcNewSelection(value) : null);
      }
    }, this.props, {
      displayMode: "dateRange",
      className: (0, _classnames.default)(this.styles.dateRangeWrapper, this.props.className),
      onChange: this.setSelection,
      updateRange: val => this.setSelection(val, false),
      ref: target => {
        this.calendar = target;
      }
    }));
  }
}
DateRange.defaultProps = {
  classNames: {},
  ranges: [],
  moveRangeOnFirstSelection: false,
  retainEndDateOnFirstSelection: false,
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  disabledDates: []
};
DateRange.propTypes = {
  ..._Calendar.default.propTypes,
  onChange: _propTypes.default.func,
  onRangeFocusChange: _propTypes.default.func,
  className: _propTypes.default.string,
  ranges: _propTypes.default.arrayOf(_DayCell.rangeShape),
  moveRangeOnFirstSelection: _propTypes.default.bool,
  retainEndDateOnFirstSelection: _propTypes.default.bool
};
var _default = exports.default = DateRange;