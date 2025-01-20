"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DayCell = _interopRequireWildcard(require("../DayCell"));

var _eachDayOfInterval = _interopRequireDefault(require("date-fns/eachDayOfInterval"));

var _isWithinInterval = _interopRequireDefault(require("date-fns/isWithinInterval"));

var _isWeekend = _interopRequireDefault(require("date-fns/isWeekend"));

var _isAfter = _interopRequireDefault(require("date-fns/isAfter"));

var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));

var _isBefore = _interopRequireDefault(require("date-fns/isBefore"));

var _endOfWeek = _interopRequireDefault(require("date-fns/endOfWeek"));

var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));

var _endOfDay = _interopRequireDefault(require("date-fns/endOfDay"));

var _startOfDay = _interopRequireDefault(require("date-fns/startOfDay"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function renderWeekdays(styles, dateOptions, weekdayDisplayFormat) {
  const now = new Date();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: styles.weekDays
  }, (0, _eachDayOfInterval.default)({
    start: (0, _startOfWeek.default)(now, dateOptions),
    end: (0, _endOfWeek.default)(now, dateOptions)
  }).map((day, i) => /*#__PURE__*/_react.default.createElement("span", {
    className: styles.weekDay,
    key: i
  }, (0, _format.default)(day, weekdayDisplayFormat, dateOptions))));
}

class Month extends _react.PureComponent {
  render() {
    const now = new Date();
    const {
      displayMode,
      focusedRange,
      drag,
      styles,
      disabledDates,
      disabledDay,
      isLoading,
      loadingIndicator
    } = this.props;
    const minDate = this.props.minDate && (0, _startOfDay.default)(this.props.minDate);
    const maxDate = this.props.maxDate && (0, _endOfDay.default)(this.props.maxDate);
    const monthDisplay = (0, _utils.getMonthDisplayRange)(this.props.month, this.props.dateOptions, this.props.fixedHeight);
    let ranges = this.props.ranges;

    if (!isLoading && displayMode === 'dateRange' && drag.status) {
      let {
        startDate,
        endDate
      } = drag.range;
      ranges = ranges.map((range, i) => {
        if (i !== focusedRange[0]) return range;
        return { ...range,
          startDate,
          endDate
        };
      });
    }

    const showPreview = !isLoading && this.props.showPreview && !drag.disablePreview;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(styles.month, {
        [styles.monthPassive]: isLoading
      }),
      style: this.props.style
    }, this.props.showMonthName ? /*#__PURE__*/_react.default.createElement("div", {
      className: styles.monthName
    }, (0, _format.default)(this.props.month, this.props.monthDisplayFormat, this.props.dateOptions)) : null, this.props.showWeekDays && renderWeekdays(styles, this.props.dateOptions, this.props.weekdayDisplayFormat), /*#__PURE__*/_react.default.createElement("div", {
      className: styles.days,
      onMouseLeave: this.props.onMouseLeave
    }, (0, _eachDayOfInterval.default)({
      start: monthDisplay.start,
      end: monthDisplay.end
    }).map((day, index) => {
      const isStartOfMonth = (0, _isSameDay.default)(day, monthDisplay.startDateOfMonth);
      const isEndOfMonth = (0, _isSameDay.default)(day, monthDisplay.endDateOfMonth);
      const isOutsideMinMax = minDate && (0, _isBefore.default)(day, minDate) || maxDate && (0, _isAfter.default)(day, maxDate);
      const isDisabledSpecifically = disabledDates.some(disabledDate => (0, _isSameDay.default)(disabledDate, day));
      const isDisabledDay = disabledDay(day);
      return /*#__PURE__*/_react.default.createElement(_DayCell.default, _extends({}, this.props, {
        ranges: ranges,
        day: day,
        preview: showPreview ? this.props.preview : null,
        isWeekend: (0, _isWeekend.default)(day, this.props.dateOptions),
        isToday: (0, _isSameDay.default)(day, now),
        isStartOfWeek: (0, _isSameDay.default)(day, (0, _startOfWeek.default)(day, this.props.dateOptions)),
        isEndOfWeek: (0, _isSameDay.default)(day, (0, _endOfWeek.default)(day, this.props.dateOptions)),
        isStartOfMonth: isStartOfMonth,
        isEndOfMonth: isEndOfMonth,
        key: index,
        disabled: isOutsideMinMax || isDisabledSpecifically || isDisabledDay,
        isPassive: isLoading || !(0, _isWithinInterval.default)(day, {
          start: monthDisplay.startDateOfMonth,
          end: monthDisplay.endDateOfMonth
        }),
        styles: styles,
        onMouseDown: this.props.onDragSelectionStart,
        onMouseUp: this.props.onDragSelectionEnd,
        onMouseEnter: this.props.onDragSelectionMove,
        dragRange: drag.range,
        drag: drag.status
      }));
    })), !!isLoading && /*#__PURE__*/_react.default.createElement("div", {
      className: "rdrMonthPassiveOverlay"
    }, loadingIndicator ? loadingIndicator : false));
  }

}

Month.defaultProps = {
  isLoading: true
};
Month.propTypes = {
  style: _propTypes.default.object,
  styles: _propTypes.default.object,
  month: _propTypes.default.object,
  drag: _propTypes.default.object,
  dateOptions: _propTypes.default.object,
  disabledDates: _propTypes.default.array,
  disabledDay: _propTypes.default.func,
  preview: _propTypes.default.shape({
    startDate: _propTypes.default.object,
    endDate: _propTypes.default.object
  }),
  showPreview: _propTypes.default.bool,
  displayMode: _propTypes.default.oneOf(['dateRange', 'date']),
  minDate: _propTypes.default.object,
  maxDate: _propTypes.default.object,
  ranges: _propTypes.default.arrayOf(_DayCell.rangeShape),
  focusedRange: _propTypes.default.arrayOf(_propTypes.default.number),
  onDragSelectionStart: _propTypes.default.func,
  onDragSelectionEnd: _propTypes.default.func,
  onDragSelectionMove: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  monthDisplayFormat: _propTypes.default.string,
  weekdayDisplayFormat: _propTypes.default.string,
  dayDisplayFormat: _propTypes.default.string,
  showWeekDays: _propTypes.default.bool,
  showMonthName: _propTypes.default.bool,
  fixedHeight: _propTypes.default.bool,
  isLoading: _propTypes.default.bool,
  loadingIndicator: _propTypes.default.node
};
var _default = Month;
exports.default = _default;