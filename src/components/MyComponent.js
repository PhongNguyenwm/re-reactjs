import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Phong",
    address: "HCM",
    age: 35,
  };

  handleClick(event) {
    // console.log("click my button");
    // console.log(event);
    console.log(`My name is ${this.state.name}`);
  }

  handleOnMouseOver(event) {
    console.log(event);
  }
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm from {this.state.address}
        <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}

export default MyComponent;
