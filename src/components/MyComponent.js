import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <UserInfo />
        <br />
        <br />
        <DisplayInfo name="Mint" age="1" />
        <hr />
        <DisplayInfo name="Yên" age="35" />
      </div>
    );
  }
}

export default MyComponent;
