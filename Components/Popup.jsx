import React, { Component } from 'react';

export default class Popup extends Component {
  componentDidMount() {
    let time = 0;
    this.timer = setInterval(() => {
      time++;
      if (time >= 5) {
        clearInterval(this.timer);
        this.props.hidePopup();
      };
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="popup">
        {this.props.text}
      </div>
    );
  }
}