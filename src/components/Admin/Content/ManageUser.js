import React from "react";
import ModalCreateUser from "./ModalCreateUser";

const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div>
          <button>Add new User</button>
          <button>
            table User <ModalCreateUser />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
