import React, { useState } from "react";
import _ from "lodash";
import "./DetailQuiz.scss";
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
  const { data, index } = props;

  const [isPreviewImg, setIsPreviewImg] = useState(false);

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleCheckbox = (e, aId, qId) => {
    props.handleCheckbox(aId, qId);
  };

  return (
    <>
      {data.img ? (
        <div className="q-img">
          <img
            onClick={() => setIsPreviewImg(true)}
            src={`data:image/jpeg;base64,${data.img}`}
            alt=""
            style={{ cursor: "pointer" }}
          />
          {isPreviewImg === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.img}`}
              title={`Question image`}
              onClose={() => setIsPreviewImg(false)}
            />
          )}
        </div>
      ) : (
        <div className="q-img"></div>
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
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.isSelected}
                    onChange={(e) =>
                      handleCheckbox(e, item.id, data.questionId)
                    }
                  />
                  <label className="form-check-label">{item.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
