import React, { useState } from "react";
import "./App.css";
import Question from "./components/Question";
import axios from "axios";
import { Button } from "@mui/material";
import ResultModel from "./components/ResultModle";
function App() {
  const [start, setStart] = useState(false);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [resultId, setResultId] = useState();
  const [result, setResult] = useState(null);
  const handleStart = async () => {
    const URL = `https://backend.polbol.in/backend/quiz/start/guest?quizId=5feaf1f9b3907535d4161811`;

    try {
      const res = await axios.get(URL);
      console.log(res.data);
      const Questions = res.data.payload.questions;
      const ResultId = res.data.payload.resultId;
      console.log(Questions, ResultId);
      setQuestions(Questions);
      setStart(true);
      setResultId(ResultId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnd = async () => {
    const URL = `https://backend.polbol.in/backend/quiz/end/guest?resultId=${resultId}`;
    try {
      const res = await axios.get(URL);
      console.log(res.data);
      setResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mainPage">
      {!start ? (
        <Button variant="contained" onClick={handleStart}>
          Start
        </Button>
      ) : questionIdx < 5 ? (
        <Question
          setQuestionIdx={setQuestionIdx}
          question={questions[questionIdx]}
          ResultId={resultId}
        />
      ) : (
        <Button variant="contained" onClick={handleEnd}>
          End Test
        </Button>
      )}
      {result ? <ResultModel result={result} /> : null}
    </div>
  );
}

export default App;
