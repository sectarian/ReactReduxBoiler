import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../css/input.css";

class Input extends Component {
  // Resolve Class
  selectedClass = () => {
    switch (this.props.classy) {
      case "reset":
        return styles.reset;

      default:
        return styles.input;
    }
  };

  // create Label
  label = () => {
    if (this.props.label) {
      return (
        <label className={styles.label} htmlFor={this.props.name}>
          {this.props.label}
        </label>
      );
    }
  };

  setClass = () => {
    if (this.props.inType) {
      switch (this.props.inType) {
        case "checkbox":
          return styles.checkbox;
        default:
          return styles.wrapper;
      }
    }
    return styles.wrapper;
  };

  render() {
    return (
      <div className={this.setClass()}>
        {this.label()}
        {this.props.inType === "textarea" ? (
          <textarea
            name={this.props.name}
            value={this.props.val}
            className={this.selectedClass()}
            placeholder={this.props.place}
            onChange={this.props.action}
          />
        ) : (
          <input
            type={this.props.inType ? this.props.inType : "text"}
            name={this.props.name}
            value={this.props.val}
            className={this.selectedClass()}
            placeholder={this.props.place}
            onChange={this.props.action}
            min={this.props.min}
            max={this.props.max}
          />
        )}
      </div>
    );
  }
}

Input.propTypes = {
  classy: PropTypes.string,
  inType: PropTypes.string,
  val: PropTypes.string,
  place: PropTypes.string,
  action: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
