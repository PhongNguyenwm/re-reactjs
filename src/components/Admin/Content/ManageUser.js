import React, { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});

  const [listUsers, setListUsers] = useState([]);

  const LIMIT_USER = 5;
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    // fetchListUsers();
    fetchListUsersWithPaginate(1);
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };
  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  const handleClickViewUser = (user) => {
    setShowModalViewUser(true);
    setDataUpdate(user);
  };

  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus /> Add new User
          </button>
          <div className="table-user-container">
            {/* <TableUser
              listUsers={listUsers}
              handleClickBtnUpdate={handleClickBtnUpdate}
              handleClickViewUser={handleClickViewUser}
              handleClickBtnDelete={handleClickBtnDelete}
            /> */}
            <TableUserPaginate
              listUsers={listUsers}
              handleClickBtnUpdate={handleClickBtnUpdate}
              handleClickViewUser={handleClickViewUser}
              handleClickBtnDelete={handleClickBtnDelete}
              fetchListUsersWithPaginate={fetchListUsersWithPaginate}
              pageCount={pageCount}
            />
          </div>
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
          fetchListUsers={fetchListUsers}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataUpdate={dataUpdate}
          fetchListUsers={fetchListUsers}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  );
};

export default ManageUser;
