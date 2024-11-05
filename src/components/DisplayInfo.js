import React, { Component } from "react";

export default class DisplayInfo extends Component {
  render() {
    const { listUsers } = this.props;
    return (
      <div>
        {/* <div>My name is {name}</div>
        <div>I'm {age} years old</div> */}
        {listUsers.map((item) => {
          return (
            <div key={item.id}>
              <div>My name's {item.name} </div>
              <div>I'm {item.age} years old </div>
            </div>
          );
        })}
      </div>
    );
  }
}
