import React, { useState } from "react";
import Select from "react-select";
import "./Question.scss";
import { MdPostAdd } from "react-icons/md";
import { CgFileRemove } from "react-icons/cg";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const Question = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "question 1",
      image: "",
      imageName: "",
      answers: [{ id: uuidv4(), description: "answer 1", isCorrect: false }],
    },
  ]);

  const hanldeAddRemoveQuestion = (type, id) => {
    console.log(type, id);
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        image: "",
        imageName: "",
        answers: [{ id: uuidv4(), description: "", isCorrect: false }],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  const hanldeAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionsClone);
    }
  };
  console.log(questions);

  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <hr />
      <div className="add-new-question">
        <div className="form-group col-6">
          <label className="mb-2">Select quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3 mb-2">Add Question:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="questions-content">
                  <div className="form-floating desc">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="question description..."
                      value={question.description}
                    />
                    <label>Question {index + 1} 's description</label>
                  </div>
                  <div className="upload-img">
                    <label>
                      <RiImageAddFill className="content-upload" />
                    </label>
                    <input type={"file"} hidden />
                    <span>myImage.png</span>
                  </div>
                  <div className="btn-add">
                    <span onClick={() => hanldeAddRemoveQuestion("ADD", "")}>
                      <MdPostAdd className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          hanldeAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <CgFileRemove className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input iscorrect"
                          type="checkbox"
                        />
                        <div className="form-floating answer-content">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="answer 1"
                            value={answer.description}
                          />
                          <label>answer {index + 1}</label>
                        </div>
                        <div className="btn-answer">
                          <span
                            onClick={() =>
                              hanldeAddRemoveAnswer("ADD", question.id)
                            }
                          >
                            <AiFillPlusSquare className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                hanldeAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <AiFillMinusSquare className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Question;
