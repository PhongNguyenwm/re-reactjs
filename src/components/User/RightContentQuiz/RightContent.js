import React, { useRef } from "react";
import CountDown from "./CountDown";
import { toast } from "react-toastify";

const RightContent = (props) => {
  const { dataQuiz } = props;
  const refDiv = useRef([]);

  const onTimeUp = () => {
    props.handleFinishQuiz();
    toast.warning("Time's up!");
  };

  const getClassQuestion = (question, index) => {
    //! check answer the question
    if (question && question.answer.length > 0) {
      let checkAnswered = question.answer.find((a) => a.isSelected === true);
      if (checkAnswered) {
        return "question selected";
      }
    }
    return "question";
  };

  const hanldeClickHoldCurrentQuestion = (question, index) => {
    props.setIndex(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }
    if (question && question.answer.length > 0) {
      let isAnswered = question.answer.find((a) => a.isSelected === true);
      if (isAnswered) {
        return;
      }
    }
    refDiv.current[index].className = "question clicked";
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                key={`Question-${index}`}
                className={getClassQuestion(item, index)}
                onClick={() => hanldeClickHoldCurrentQuestion(item, index)}
                ref={(element) => (refDiv.current[index] = element)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
