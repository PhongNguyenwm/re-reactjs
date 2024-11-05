import React, { Component } from "react";

export default class DisplayInfo extends Component {
  render() {
    const { name, age } = this.props;
    return (
      <div>
        <div>My name is {name}</div>
        <div>I'm {age} years old</div>
      </div>
    );
  }
}
