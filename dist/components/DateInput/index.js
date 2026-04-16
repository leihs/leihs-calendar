"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _isEqual = _interopRequireDefault(require("date-fns/isEqual"));
var _isValid = _interopRequireDefault(require("date-fns/isValid"));
var _parse = _interopRequireDefault(require("date-fns/parse"));
var _format = _interopRequireDefault(require("date-fns/format"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class DateInput extends _react.PureComponent {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "onKeyDown", e => {
      const {
        value
      } = this.state;
      if (e.key === 'Enter') {
        this.update(value);
      }
    });
    _defineProperty(this, "onChange", e => {
      this.setState({
        value: e.target.value,
        changed: true,
        invalid: false
      });
    });
    _defineProperty(this, "onBlur", () => {
      const {
        value
      } = this.state;
      this.update(value);
    });
    this.state = {
      invalid: false,
      changed: false,
      value: this.formatDate(props)
    };
  }
  componentDidUpdate(prevProps) {
    const {
      value
    } = prevProps;
    if (!(0, _isEqual.default)(value, this.props.value)) {
      this.setState({
        value: this.formatDate(this.props)
      });
    }
  }
  formatDate({
    value,
    dateDisplayFormat,
    dateOptions
  }) {
    if (value && (0, _isValid.default)(value)) {
      return (0, _format.default)(value, dateDisplayFormat, dateOptions);
    }
    return '';
  }
  update(value) {
    const {
      invalid,
      changed
    } = this.state;
    if (invalid || !changed || !value) {
      return;
    }
    const {
      onChange,
      dateDisplayFormat,
      dateOptions
    } = this.props;
    const parsed = (0, _parse.default)(value, dateDisplayFormat, new Date(), dateOptions);
    if ((0, _isValid.default)(parsed)) {
      this.setState({
        changed: false
      }, () => onChange(parsed));
    } else {
      this.setState({
        invalid: true
      });
    }
  }
  render() {
    const {
      className,
      readOnly,
      placeholder,
      ariaLabel,
      disabled,
      onFocus
    } = this.props;
    const {
      value,
      invalid
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _classnames.default)('rdrDateInput', className)
    }, /*#__PURE__*/_react.default.createElement("input", {
      readOnly: readOnly,
      disabled: disabled,
      value: value,
      placeholder: placeholder,
      "aria-label": ariaLabel,
      onKeyDown: this.onKeyDown,
      onChange: this.onChange,
      onBlur: this.onBlur,
      onFocus: onFocus
    }), invalid && /*#__PURE__*/_react.default.createElement("span", {
      className: "rdrWarning"
    }, "\u26A0"));
  }
}
DateInput.propTypes = {
  value: _propTypes.default.object,
  placeholder: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  dateOptions: _propTypes.default.object,
  dateDisplayFormat: _propTypes.default.string,
  ariaLabel: _propTypes.default.string,
  className: _propTypes.default.string,
  onFocus: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired
};
DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: 'MMM D, YYYY'
};
var _default = exports.default = DateInput;