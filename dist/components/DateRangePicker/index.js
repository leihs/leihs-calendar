"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _DateRange = _interopRequireDefault(require("../DateRange"));
var _DefinedRange = _interopRequireDefault(require("../DefinedRange"));
var _utils = require("../../utils");
var _classnames = _interopRequireDefault(require("classnames"));
var _styles = _interopRequireDefault(require("../../styles"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class DateRangePicker extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedRange: [(0, _utils.findNextRangeIndex)(props.ranges), 0]
    };
    this.styles = (0, _utils.generateStyles)([_styles.default, props.classNames]);
  }
  render() {
    const {
      focusedRange
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(this.styles.dateRangePickerWrapper, this.props.className)
    }, /*#__PURE__*/_react.default.createElement(_DefinedRange.default, _extends({
      focusedRange: focusedRange,
      onPreviewChange: value => this.dateRange.updatePreview(value ? this.dateRange.calcNewSelection(value, typeof value === 'string') : null)
    }, this.props, {
      range: this.props.ranges[focusedRange[0]],
      className: undefined
    })), /*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({
      onRangeFocusChange: focusedRange => this.setState({
        focusedRange
      }),
      focusedRange: focusedRange
    }, this.props, {
      ref: t => this.dateRange = t,
      className: undefined
    })));
  }
}
DateRangePicker.defaultProps = {};
DateRangePicker.propTypes = {
  ..._DateRange.default.propTypes,
  ..._DefinedRange.default.propTypes,
  className: _propTypes.default.string
};
var _default = exports.default = DateRangePicker;