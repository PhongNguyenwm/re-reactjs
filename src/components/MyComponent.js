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

    this.setState({
      name: "Yên",
      age: Math.floor(Math.random() * 100 + 1),
    });
  }

  handleOnMouseOver(event) {
    // console.log(event);
  }
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age}
        <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
        <button
          onClick={(event) => {
            this.handleClick(event);
          }}
        >
          Click me
        </button>
      </div>
    );
  }
}

export default MyComponent;
