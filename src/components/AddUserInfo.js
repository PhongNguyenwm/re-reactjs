import React, { Component } from "react";

export default class AddUserInfo extends Component {
  state = {
    name: "",
    address: "HCM",
    age: "",
  };

  handleOnChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: this.state.name,
      age: this.state.age,
    });
  };

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  handleChangeAge = (event) => {
    this.setState({
      age: parseInt(event.target.value),
    });
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
          <label>
            Your name:
            <input
              value={this.state.name}
              type="text"
              onChange={(event) => {
                this.handleChangeName(event);
              }}
            />
          </label>
          <label>
            Your age:
            <input
              value={this.state.age}
              type="text"
              onChange={(event) => {
                this.handleChangeAge(event);
              }}
            />
          </label>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
