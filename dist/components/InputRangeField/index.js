"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const MIN = 0;
const MAX = 99999;
class InputRangeField extends _react.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "onChange", e => {
      const {
        onChange
      } = this.props;
      let value = parseInt(e.target.value, 10);
      value = isNaN(value) ? 0 : Math.max(Math.min(MAX, value), MIN);
      onChange(value);
    });
  }
  shouldComponentUpdate(nextProps) {
    const {
      value,
      label,
      placeholder
    } = this.props;
    return value !== nextProps.value || label !== nextProps.label || placeholder !== nextProps.placeholder;
  }
  render() {
    const {
      label,
      placeholder,
      value,
      styles,
      onBlur,
      onFocus
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: styles.inputRange
    }, /*#__PURE__*/_react.default.createElement("input", {
      className: styles.inputRangeInput,
      placeholder: placeholder,
      value: value,
      min: MIN,
      max: MAX,
      onChange: this.onChange,
      onFocus: onFocus,
      onBlur: onBlur
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: styles.inputRangeLabel
    }, label));
  }
}
InputRangeField.propTypes = {
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  label: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.node]).isRequired,
  placeholder: _propTypes.default.string,
  styles: _propTypes.default.shape({
    inputRange: _propTypes.default.string,
    inputRangeInput: _propTypes.default.string,
    inputRangeLabel: _propTypes.default.string
  }).isRequired,
  onBlur: _propTypes.default.func.isRequired,
  onFocus: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired
};
InputRangeField.defaultProps = {
  value: '',
  placeholder: '-'
};
var _default = exports.default = InputRangeField;