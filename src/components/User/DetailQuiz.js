import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async (params) => {
    let res = await getDataQuiz(quizId);
    console.log(res);
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
      console.log(data);
    }
  };

  return <div className="detail-quiz-container">DetailQuiz</div>;
};

export default DetailQuiz;
