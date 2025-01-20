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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      } // reverse dates if startDate before endDate


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
        [selectedRange.key || `range${focusedRangeIndex + 1}`]: { ...selectedRange,
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
        preview: { ...val.range,
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
DateRange.propTypes = { ..._Calendar.default.propTypes,
  onChange: _propTypes.default.func,
  onRangeFocusChange: _propTypes.default.func,
  className: _propTypes.default.string,
  ranges: _propTypes.default.arrayOf(_DayCell.rangeShape),
  moveRangeOnFirstSelection: _propTypes.default.bool,
  retainEndDateOnFirstSelection: _propTypes.default.bool
};
var _default = DateRange;
exports.default = _default;