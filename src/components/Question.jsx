import React, { useState } from "react";
import "../styles/components/Question.css";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from "@mui/material";

import axios from "axios";

function Question({ question, ResultId, setQuestionIdx }) {
  const [select, setSelect] = useState(null);
  const [isSubmitted, setSubmitted] = useState(true);
  const handleSubmit = async () => {
    setSubmitted(false);
    let URL = `https://backend.polbol.in/backend/quiz/submitAnswer/guest?resultId=${ResultId}&quesId=${question._id}&answer=${select}`;
    try {
      const res = await axios.get(URL);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectOption = (e) => {
    e.preventDefault();
    setSelect(e.target.value);
  };

  const handleNext = () => {
    setQuestionIdx((prev) => ++prev);
    setSubmitted(true);
  };
  return (
    <div className="questionContainer">
      <FormControl component="fieldset">
        <FormLabel component="legend">{question.content.question}</FormLabel>
        <RadioGroup
          aria-label="gender"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={handleSelectOption}
          required
        >
          <FormControlLabel
            value={question.options[0]._id}
            control={<Radio />}
            label={question.options[0].text}
          />
          <FormControlLabel
            value={question.options[1]._id}
            control={<Radio />}
            label={question.options[1].text}
          />
          <FormControlLabel
            value={question.options[2]._id}
            control={<Radio />}
            label={question.options[2].text}
          />
          <FormControlLabel
            value={question.options[3]._id}
            control={<Radio />}
            label={question.options[3].text}
          />
        </RadioGroup>
        {isSubmitted ? (
          <div>
            <Button
              className="submmit"
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button className="submmit" variant="outlined" disabled>
              Next
            </Button>
          </div>
        ) : (
          <div>
            <Button className="submmit" variant="outlined" disabled>
              Submitted
            </Button>
            <Button
              className="submmit"
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        )}
      </FormControl>
    </div>
  );
}

export default Question;
