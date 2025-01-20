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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var _default = DateInput;
exports.default = _default;