import React, { Component } from "react";
import "./DisplayInfo.scss";
import logo from "../logo.svg";

export default class DisplayInfo extends Component {
  // syntax OOB:
  constructor(props) {
    console.log("constructor:1");
    super(props);
    // babel compiler
    this.state = {
      isShowListUser: true,
    };
  }

  componentDidMount() {
    console.log("Component did mount");
    setTimeout(() => {
      document.title = "did mount";
    }, 3000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate", this.props, prevProps);
    if (this.props.listUsers !== prevProps.listUsers) {
      if (this.props.listUsers.length === 5) {
        console.log("you got five users");
      }
    }
  }
  handleHideShow = () => {
    this.setState({
      isShowListUser: !this.state.isShowListUser,
    });
  };
  render() {
    console.log("render");
    const { listUsers } = this.props;
    return (
      <div className="display-info-container">
        {/* <img src={logo} alt="" /> */}
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
          <>
            {listUsers.map((item) => {
              return (
                <div key={item.id} className={+item.age > 18 ? "green" : "red"}>
                  <div>
                    <div>My name's {item.name} </div>
                    <div>I'm {item.age} years old </div>
                  </div>
                  <div>
                    <button
                      onClick={() => this.props.handleDeleteUser(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <br />
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}
