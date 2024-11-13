import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async (params) => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answer = [];
          let questionDesc,
            img = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDesc = item.description;
              img = item.image;
            }
            answer.push(item.answer);
          });
          return { questionId: key, answer, questionDesc, img };
        })
        .value();
    }
  };

  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="body">
          <img src="" alt="" />
        </div>
        <div className="content">
          <div className="question">Question 1:How are you doing?</div>
          <div className="answer">
            <div className="a-child">A. đâsdá</div>
            <div className="b-child">B. đâsdá</div>
            <div className="c-child">C. đâsdá</div>
          </div>
        </div>
        <div className="footer my-3">
          <button className="btn btn-secondary">Prev</button>
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
};

export default DetailQuiz;
