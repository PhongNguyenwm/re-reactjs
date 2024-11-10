import React from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";

const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div>
          <button>Add new User</button>
          <button>table User</button>
        </div>
        <ModalCreateUser />
      </div>
    </div>
  );
};

export default ManageUser;
