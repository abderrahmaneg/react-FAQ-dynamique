
import React from 'react';

const AnswerDisplay = ({ notFound, answer,answerARABic,answerFrench }) => {
  return (
    <div className="answer">
      <p>{answerARABic}{answerFrench}:</p>
      {notFound ? <p>Answer not found</p> : <p>{answer}</p>}
    </div>
  );
};

export default AnswerDisplay;
