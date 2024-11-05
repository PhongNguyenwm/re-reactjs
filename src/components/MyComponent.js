import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Phong", age: 34 },
      { id: 2, name: "Yên", age: 35 },
      { id: 3, name: "Mint", age: 1 },
    ],
  };

  render() {
    // DRY: don't repeat yourself
    return (
      <div>
        <UserInfo />
        <br />
        <br />
        <DisplayInfo listUsers={this.state.listUsers} />
      </div>
    );
  }
}

export default MyComponent;
