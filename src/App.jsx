import questions from "./data/questions.json";
import React, { useEffect, useState } from "react";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
// npm install --save react-circular-progressbar
//import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

function App() {
  let [allQuestions, setAllQuestion] = React.useState(questions);
  const [qIndex, setIndex] = React.useState(0);

  const q = allQuestions[qIndex];

  const [correct, setCorrect] = useState(0);

  const onSelectedOption = (qid, op) => {
    const copyQuestions = [...allQuestions];
    const question = copyQuestions.find((q) => q.id === qid);
    question.selectedOption = op;
    if (op === question.answer) {
      setCorrect(correct + 1);
    }
    setAllQuestion(copyQuestions);
  };

  const getOptionStyle = (q, op) => {
    const style = "btn btn-primary";
    if (op !== q.selectedOption) return style;

    if (op === q.answer) return style + " bg-success text-white";
    else return style + " bg-danger text-white";
  };

  let [t, setT] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setT((t) => {
        if (t > 1) {
          return t - 1;
        } else if (qIndex < questions.length) {
          console.log(questions.length);
          setIndex((prevIndex) => prevIndex + 1);
          return 5;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [qIndex, questions.length]);

  const imgSrc = q ? `./images/${q.image}` : "";

  let [details, setDetails] = useState(false);
  const handlDetails = () => {
    alert("Hello");
    if (details) {
      setDetails(false);
    } else {
      setDetails(true);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setT(5);
    setDetails(false);
    setAllQuestion(
      questions.map((question) => ({ ...question, selectedOption: null }))
    );
    setCorrect(0);
  };

  if (qIndex > questions.length - 1) {
    return (
      <>
        <div className="container">
          <div className="card text-center mt-4">
            <div className="card-header bg-primary text-white">Results</div>
            <div className="card-body">
              <h5 className="card-title">
                Total Questions{" "}
                <span className="badge bg-info text-dark">{questions.length}</span>
              </h5>
              <p className="card-text">
                Correct Answer's:{" "}
                <span className="badge bg-success">{correct}</span> <br />
                Click on details button to check details thank you. <br />
              </p>
              <a href="#" className="btn btn-primary" onClick={handlDetails}>
                Details
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="#" className="btn btn-primary" onClick={handleRestart}>
                Restart
              </a>
            </div>
            <div className="card-footer text-muted">
              Developed by Khalid Mansoor{" "}
              <a className="badge bg-success" href="https://wa.me/+923402817001/?text=Hey">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-whatsapp"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
              </a>
            </div>
          </div>
          {details ? (
            <div className="row mt-4">
              <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Question</th>
                      <th scope="col">Answer</th>
                      <th scope="col">Selected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allQuestions.map((detail) => (
                      <tr key={detail.id}>
                        <td>{detail.id}</td>
                        <td>{detail.statement}</td>
                        <td>{detail.answer}</td>
                        <td>{detail.selectedOption}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="card text-center mt-4">
          <div className="card-header bg-primary text-white">
            {q.id}. {q.statement}
          </div>

          <div className="row">
            <div className="col-md-6 col-6 mt-4">
              <div
                style={{ width: 60, height: 60 }}
                className="d-grid gap-2 col-6 mx-auto"
              >
                <CircularProgressbar
                  value={q.id}
                  maxValue={questions.length}
                  strokeWidth={50}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                    pathColor: "rgb(13, 110, 253)",
                    // backgroundColor: "rgb(13, 110, 253)",
                  })}
                />
              </div>
            </div>
            <div className="col-md-6 col-6 mt-4">
              <div
                style={{ width: 60, height: 60 }}
                className="d-grid gap-2 col-6 mx-auto"
              >
                <CircularProgressbar
                  value={t}
                  text={`${t}`}
                  background
                  backgroundPadding={6}
                  maxValue={5}
                  styles={buildStyles({
                    backgroundColor: "rgb(13, 110, 253)",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent",
                  })}
                />
              </div>
            </div>
          </div>

          <div className="card-body">
            <h5 className="card-title">
              <img
                src={imgSrc}
                className="img-thumbnail rounded"
                style={{ width: "350px" }}
              />
            </h5>
            <div className="row">
              {q.options.map((op) => (
                <div className="col-md-6 mt-4 mb-2" key={op}>
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button
                      className={getOptionStyle(q, op)}
                      type="button"
                      onClick={() => {
                        onSelectedOption(q.id, op);
                      }}
                    >
                      {op}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* <a href="#" className="btn btn-primary mt-4" onClick={onSelectNext}>
              Next
            </a> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
