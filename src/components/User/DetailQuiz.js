import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResultQuiz from "./ModalResultQuiz";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);

  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
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
            item.answers.isSelected = false;
            answer.push(item.answers);
          });
          return { questionId: key, answer, questionDesc, img };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleCheckbox = (answerId, questionId) => {
    //! 1. Tạo bản sao của dữ liệu
    //! let dataQuizClone = _.cloneDeep(dataQuiz);: Dòng này tạo ra một bản sao hoàn toàn mới của mảng dataQuiz bằng cách sử dụng hàm _.cloneDeep của thư viện Lodash. Việc tạo bản sao là rất quan trọng trong React để tránh việc trực tiếp sửa đổi dữ liệu gốc, điều này có thể dẫn đến các vấn đề khó lường.
    let dataQuizClone = _.cloneDeep(dataQuiz);
    //! 2. Tìm câu hỏi tương ứng
    //! Dòng này tìm kiếm trong mảng dataQuizClone để tìm câu hỏi có questionId trùng khớp với questionId được truyền vào hàm. Nếu tìm thấy, kết quả sẽ được gán vào biến question.
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    //! 3. Cập nhật trạng thái đã chọn của câu trả lời
    //! if (question && question.answer) { ... }: Kiểm tra xem câu hỏi đã được tìm thấy và có mảng answer (các lựa chọn trả lời) hay không.
    if (question && question.answer) {
      //! question.answer = question.answer.map((item) => { ... });: Nếu câu hỏi hợp lệ, đoạn code này sẽ duyệt qua từng lựa chọn trả lời trong mảng answer.
      question.answer = question.answer.map((item) => {
        //! if (+item.id === +answerId) { ... }: Kiểm tra xem ID của lựa chọn trả lời hiện tại có trùng khớp với answerId được truyền vào không.
        if (+item.id === +answerId) {
          //! item.isSelected = !item.isSelected;: Nếu trùng khớp, thì đảo ngược giá trị của thuộc tính isSelected của lựa chọn trả lời đó. Tức là nếu trước đó đã được chọn thì sẽ bỏ chọn và ngược lại.
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    //! 4. Cập nhật dữ liệu
    //! let index = dataQuizClone.findIndex((item) => +item.questionId === +questionId);: Tìm vị trí của câu hỏi đã sửa đổi trong mảng dataQuizClone.
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    //! if (index > -1) { ... }: Nếu tìm thấy vị trí, cập nhật lại phần tử tại vị trí đó trong mảng dataQuizClone bằng câu hỏi đã được sửa đổi.
    if (index > -1) {
      dataQuizClone[index] = question;
      //! setDataQuiz(dataQuizClone);: Cuối cùng, cập nhật lại state dataQuiz bằng bản sao đã được sửa đổi. Việc này sẽ kích hoạt lại quá trình render của component, hiển thị giao diện với các checkbox đã được cập nhật trạng thái.
      setDataQuiz(dataQuizClone);
    }
  };

  const handleFinishQuiz = async () => {
    let result = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let questionId = item.questionId;
        let userAnswerId = [];
        item.answer.forEach((item) => {
          if (item.isSelected) {
            userAnswerId.push(item.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId,
        });
      });
      result.answers = answers;
      // submit api
      let res = await postSubmitQuiz(result);
      console.log("check res", res);
      if (res && res.EC === 0) {
        setIsShowModalResult(true);
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
      } else {
        alert("something wrong...");
      }
    }
  };

  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />

        <div className="content">
          <Question
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            index={index}
            handleCheckbox={handleCheckbox}
          />
        </div>
        <div className="footer my-3">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleFinishQuiz()}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">count down</div>
      <ModalResultQuiz
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};

export default DetailQuiz;
