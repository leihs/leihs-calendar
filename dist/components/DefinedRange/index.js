"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styles = _interopRequireDefault(require("../../styles"));
var _defaultRanges = require("../../defaultRanges");
var _DayCell = require("../DayCell");
var _InputRangeField = _interopRequireDefault(require("../InputRangeField"));
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class DefinedRange extends _react.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleRangeChange", range => {
      const {
        onChange,
        ranges,
        focusedRange
      } = this.props;
      const selectedRange = ranges[focusedRange[0]];
      if (!onChange || !selectedRange) return;
      onChange({
        [selectedRange.key || `range${focusedRange[0] + 1}`]: {
          ...selectedRange,
          ...range
        }
      });
    });
    this.state = {
      rangeOffset: 0,
      focusedInput: -1
    };
  }
  getRangeOptionValue(option) {
    const {
      ranges = [],
      focusedRange = []
    } = this.props;
    if (typeof option.getCurrentValue !== 'function') {
      return '';
    }
    const selectedRange = ranges[focusedRange[0]] || {};
    return option.getCurrentValue(selectedRange) || '';
  }
  getSelectedRange(ranges, staticRange) {
    const focusedRangeIndex = ranges.findIndex(range => {
      if (!range.startDate || !range.endDate || range.disabled) return false;
      return staticRange.isSelected(range);
    });
    const selectedRange = ranges[focusedRangeIndex];
    return {
      selectedRange,
      focusedRangeIndex
    };
  }
  render() {
    const {
      headerContent,
      footerContent,
      onPreviewChange,
      inputRanges,
      staticRanges,
      ranges,
      renderStaticRangeLabel,
      rangeColors,
      className
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(_styles.default.definedRangesWrapper, className)
    }, headerContent, /*#__PURE__*/_react.default.createElement("div", {
      className: _styles.default.staticRanges
    }, staticRanges.map((staticRange, i) => {
      const {
        selectedRange,
        focusedRangeIndex
      } = this.getSelectedRange(ranges, staticRange);
      let labelContent;
      if (staticRange.hasCustomRendering) {
        labelContent = renderStaticRangeLabel(staticRange);
      } else {
        labelContent = staticRange.label;
      }
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: (0, _classnames.default)(_styles.default.staticRange, {
          [_styles.default.staticRangeSelected]: Boolean(selectedRange)
        }),
        style: {
          color: selectedRange ? selectedRange.color || rangeColors[focusedRangeIndex] : null
        },
        key: i,
        onClick: () => this.handleRangeChange(staticRange.range(this.props)),
        onFocus: () => onPreviewChange && onPreviewChange(staticRange.range(this.props)),
        onMouseOver: () => onPreviewChange && onPreviewChange(staticRange.range(this.props)),
        onMouseLeave: () => {
          onPreviewChange && onPreviewChange();
        }
      }, /*#__PURE__*/_react.default.createElement("span", {
        tabIndex: -1,
        className: _styles.default.staticRangeLabel
      }, labelContent));
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: _styles.default.inputRanges
    }, inputRanges.map((rangeOption, i) => /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      key: i,
      styles: _styles.default,
      label: rangeOption.label,
      onFocus: () => this.setState({
        focusedInput: i,
        rangeOffset: 0
      }),
      onBlur: () => this.setState({
        rangeOffset: 0
      }),
      onChange: value => this.handleRangeChange(rangeOption.range(value, this.props)),
      value: this.getRangeOptionValue(rangeOption)
    }))), footerContent);
  }
}
DefinedRange.propTypes = {
  inputRanges: _propTypes.default.array,
  staticRanges: _propTypes.default.array,
  ranges: _propTypes.default.arrayOf(_DayCell.rangeShape),
  focusedRange: _propTypes.default.arrayOf(_propTypes.default.number),
  onPreviewChange: _propTypes.default.func,
  onChange: _propTypes.default.func,
  footerContent: _propTypes.default.any,
  headerContent: _propTypes.default.any,
  rangeColors: _propTypes.default.arrayOf(_propTypes.default.string),
  className: _propTypes.default.string,
  renderStaticRangeLabel: _propTypes.default.func
};
DefinedRange.defaultProps = {
  inputRanges: _defaultRanges.defaultInputRanges,
  staticRanges: _defaultRanges.defaultStaticRanges,
  ranges: [],
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  focusedRange: [0, 0]
};
var _default = exports.default = DefinedRange;