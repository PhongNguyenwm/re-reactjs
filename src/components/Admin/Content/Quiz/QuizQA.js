import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import { MdPostAdd } from "react-icons/md";
import { CgFileRemove } from "react-icons/cg";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const QuizQA = (props) => {
  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      image: "",
      imageName: "",
      answers: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ];
  const [questions, setQuestions] = useState(initQuestion);
  const [isPreviewIgm, setIsPreviewIgm] = useState(false);
  const [dataImgPreview, setDataImgPreview] = useState({
    title: "",
    url: "",
  });
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

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

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, e) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      questionsClone[index].image = e.target.files[0];
      questionsClone[index].imageName = e.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      setQuestions(questionsClone);
    }
  };

  const hanldeSubmitQuestionForQuiz = async () => {
    console.log(questions, selectedQuiz.value);
    // validate selectedQuiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please select a quiz");
      return;
    }

    // validate question
    let isValidQ = true;
    let indexQuestion = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQuestion = i;
        break;
      }
    }
    if (isValidQ === false) {
      toast.error(`Must fill value for question ${indexQuestion + 1}`);
      return;
    }

    // validate answer:
    let isValidAnswer = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidAnswer === false) break;
    }
    if (isValidAnswer === false) {
      toast.error(
        `Must fill value for answer: ${indexA + 1} at question ${indexQ + 1}`
      );
      return;
    }

    // submit question
    for (const question of questions) {
      const resQuestion = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.image
      );
      // submit answers
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          resQuestion.DT.id
        );
      }
    }
    toast.success("Question & Answer was created successfully!");
    setQuestions(initQuestion);
  };

  const handlePreviewImg = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImgPreview({
        title: questionsClone[index].imageName,
        url: URL.createObjectURL(questionsClone[index].image),
      });
      setIsPreviewIgm(true);
    }
  };

  return (
    <div className="questions-container">
      <div className="add-new-question">
        <div className="form-group col-6">
          <label className="mb-2">Select quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
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
                      onChange={(e) =>
                        handleOnChange("QUESTION", question.id, e.target.value)
                      }
                    />
                    <label>Question {index + 1} 's description</label>
                  </div>
                  <div className="upload-img">
                    <label htmlFor={`${question.id}`}>
                      <RiImageAddFill className="content-upload" />
                    </label>
                    <input
                      id={question.id}
                      type={"file"}
                      hidden
                      onChange={(e) =>
                        handleOnChangeFileQuestion(question.id, e)
                      }
                    />
                    <span>
                      {question.imageName ? (
                        <span
                          className="mx-3"
                          style={{
                            cursor: "pointer",
                            color: "seagreen",
                            textDecoration: "underline",
                          }}
                          onClick={() => handlePreviewImg(question.id)}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
                    </span>
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
                          checked={answer.isCorrect}
                          onChange={(e) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              question.id,
                              e.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-content">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="answer 1"
                            value={answer.description}
                            onChange={(e) =>
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                e.target.value
                              )
                            }
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
        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-warning"
              onClick={() => hanldeSubmitQuestionForQuiz()}
            >
              Save Question
            </button>
          </div>
        )}
      </div>
      {isPreviewIgm === true && (
        <Lightbox
          image={dataImgPreview.url}
          title={dataImgPreview.title}
          onClose={() => setIsPreviewIgm(false)}
        />
      )}
    </div>
  );
};

export default QuizQA;
