import React from "react";
import { deleteQuizForAdmin } from "../../../../services/apiService";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete } = props;
  const handleClose = () => setShow(false);

  const handleDeleteQuiz = async () => {
    let data = await deleteQuizForAdmin(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchQuiz();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete the quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure delete this quiz? id=
          <b>{dataDelete ? dataDelete.id : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDeleteQuiz()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
