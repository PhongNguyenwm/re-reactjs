import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import _ from "lodash";
import { putUpdateQuiz } from "../../../../services/apiService";

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, setDataUpdate } = props;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [img, setImg] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
    setShow(false);
    setName("");
    setDesc("");
    setType(null);
    setImg(null);
    setPreviewImage("");
    setDataUpdate({});
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setDesc(dataUpdate.description);
      setType(dataUpdate.difficulty);
      setImg("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImg(event.target.files[0]);
    } else {
      // setPreviewImage("");
    }
  };

  const handleUpdateQuiz = async () => {
    if (!name) {
      toast.error("invalid name");
      return;
    }
    if (!desc) {
      toast.error("invalid description");
      return;
    }
    let data = await putUpdateQuiz(dataUpdate.id, desc, name, type, img);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      await props.fetchQuiz();
      handleClose();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Quiz name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Quiz description</label>
              <input
                type="text"
                className="form-control"
                value={desc}
                onChange={(event) => setDesc(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                onChange={(event) => setType(event.target.value)}
                value={type}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus /> Upload Quiz Image
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="user avatar" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
