import React, { useState } from 'react';

const QueryForm = ({ onQuery ,QueryArb,QueryFrn}) => {
  const [question, setQuestion] = useState('');

  const handleQuery = () => {
    onQuery(question);
  };

  return (
    <div className="query-form">
      <input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleQuery}>{QueryArb}{QueryFrn}</button>
    </div>
  
  );
};

export default QueryForm;
