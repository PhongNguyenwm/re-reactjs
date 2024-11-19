import React from "react";
import CountDown from "./CountDown";
import { toast } from "react-toastify";

const RightContent = (props) => {
  const { dataQuiz } = props;
  console.log(dataQuiz);
  const onTimeUp = () => {
    props.handleFinishQuiz();
    toast.warning("Time's up!");
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
              <div key={`Question-${index}`} className="question">
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
