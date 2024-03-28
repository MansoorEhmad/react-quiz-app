import questions from "./data/questions.json";
import React from "react";

function App() {
  let [allQuestions, setAllQuestion] = React.useState(questions);
  const [qIndex, setIndex] = React.useState(0);

  const onSelectedOption = (qid, op) => {
    const copyQuestions = [...allQuestions];
    const question = copyQuestions.find((q) => q.id === qid);
    question.selectedOption = op;
    setAllQuestion(copyQuestions);
  };

  const getOptionStyle = (q, op) => {
    const style = "btn btn-primary";
    if (op !== q.selectedOption) return style;

    if (op === q.answer) return style + " bg-success text-white";
    else return style + " bg-danger text-white";
  };

  const q = allQuestions[qIndex];

  const onSelectNext = () => {
    setIndex(qIndex + 1);
  };
  return (
    <>
      <div className="container">
        {
          <div className="card text-center mt-4" key={q.id}>
            <div className="card-header bg-primary text-white">
              {q.id}. {questions[0].statement}
            </div>
            <div className="card-body">
              <h5 className="card-title">
                <img src={questions[0].image} />
              </h5>
              <div className="row">
                {q.options.map((op) => (
                  <div className="col-md-6 mt-4" key={op}>
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
              <a href="#" className="btn btn-primary mt-4" onClick={onSelectNext}>
                Next
              </a>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default App;
