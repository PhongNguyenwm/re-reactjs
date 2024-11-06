import React, { useEffect, useState } from "react";
import "./DisplayInfo.scss";
import logo from "../logo.svg";

const DisplayInfo = (props) => {
  const { listUsers } = props;
  const [isShowHideUserList, setShowHideUserList] = useState(true);
  const handleHideShowUserList = () => {
    setShowHideUserList(!isShowHideUserList);
  };

  useEffect(() => {
    setTimeout(() => {
      document.title = "Learning ReactJS";
    }, 3000);
    if (listUsers.length === 0) {
      alert("List users is empty!");
    }
  }, [listUsers]);

  return (
    <div className="display-info-container">
      <div>
        <button
          onClick={() => handleHideShowUserList()}
          className={isShowHideUserList === true ? "purple" : "green"}
        >
          {isShowHideUserList === true ? "Hide list users" : "Show list users"}
        </button>
      </div>
      {isShowHideUserList && (
        <>
          {listUsers.map((item) => {
            return (
              <div key={item.id} className={+item.age > 18 ? "green" : "red"}>
                <div>
                  <div>My name's {item.name} </div>
                  <div>I'm {item.age} years old </div>
                </div>
                <div>
                  <button onClick={() => props.handleDeleteUser(item.id)}>
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
};

export default DisplayInfo;
