import React, { useState } from "react";
import Select from "react-select";
import "./Question.scss";
import { MdPostAdd } from "react-icons/md";
import { CgFileRemove } from "react-icons/cg";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";

const Question = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <div className="add-new-question">
        <div className="form-group col-6">
          <label>Select quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3">Add Question:</div>
        <div>
          <div className="questions-content">
            <div className="form-floating desc">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="question description..."
              />
              <label>Description</label>
            </div>
            <div className="upload-img">
              <label className="content-upload">Upload Image</label>
              <input type={"file"} hidden />
              <span>myImage.png</span>
            </div>
            <div className="btn-add">
              <span>
                <MdPostAdd className="icon-add" />
              </span>
              <span>
                <CgFileRemove className="icon-remove" />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <input className="form-check-input iscorrect" type="checkbox" />
            <div className="form-floating answer-content">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="answer 1"
              />
              <label>answer 1</label>
            </div>
            <div className="btn-answer">
              <span>
                <AiFillPlusSquare className="icon-add" />
              </span>
              <span>
                <AiFillMinusSquare className="icon-remove" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
