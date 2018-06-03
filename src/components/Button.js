// modules
import React, { Component } from "react";
import PropTypes from "prop-types";
// styles
import styles from "../css/button.css";

class Button extends Component {
  render() {
    // Resolve Class
    const selectedClass = () => {
      switch (this.props.classy) {
        case "confirm":
          return styles.confirm;
        case "reject":
          return styles.reject;
        case "neutral":
          return styles.neutral;
        case "google":
          return styles.google;
        case "facebook":
          return styles.facebook;
        case "text-only":
          return styles.text;
        default:
          return styles.button;
      }
    };

    return (
      <button
        type={this.props.buttType ? this.props.buttType : "button"}
        className={selectedClass()}
        onClick={this.props.action}>
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  classy: PropTypes.string,
  buttType: PropTypes.string,
  action: PropTypes.func,
  text: PropTypes.string,
};

export default Button;
