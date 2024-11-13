import React from "react";
import _ from "lodash";
import "./DetailQuiz.scss";

const Question = (props) => {
  const { data, index } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }
  console.log(data);
  return (
    <>
      {data.img && (
        <div className="q-img">
          <img
            src={`data:image/jpeg;base64,${data.img}`}
            alt=""
            style={({ width: "300px" }, { height: "200px" })}
          />
        </div>
      )}
      <div className="question">
        Question {index + 1}: {data.questionDesc}?
      </div>
      <div className="answer">
        {data.answer &&
          data.answer.length > 0 &&
          data.answer.map((item, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" />
                  <label class="form-check-label">{item.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
