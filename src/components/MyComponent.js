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

  handleOnChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age}
        <form
          onSubmit={(event) => {
            this.handleOnSubmit(event);
          }}
        >
          <input
            type="text"
            onChange={(event) => {
              this.handleOnChange(event);
            }}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default MyComponent;
