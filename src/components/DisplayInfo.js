import React, { Component } from "react";

export default class DisplayInfo extends Component {
  state = {
    isShowListUser: true,
  };
  handleHideShow = () => {
    this.setState({
      isShowListUser: !this.state.isShowListUser,
    });
  };
  render() {
    const { listUsers } = this.props;
    return (
      <div>
        <div>
          <span
            onClick={() => {
              this.handleHideShow();
            }}
            className={this.state.isShowListUser === true ? "purple" : "green"}
          >
            {this.state.isShowListUser === true
              ? "Hide User List"
              : "Show User List"}
          </span>
        </div>
        {this.state.isShowListUser && (
          <div>
            {listUsers.map((item) => {
              return (
                <div>
                  <div
                    key={item.id}
                    className={+item.age > 18 ? "green" : "red"}
                  >
                    <div>My name's {item.name} </div>
                    <div>I'm {item.age} years old </div>
                    <br />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}