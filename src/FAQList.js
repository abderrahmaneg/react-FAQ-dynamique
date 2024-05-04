import React from 'react';

const FAQList = ({ faqData}) => {
  return (
    <div className="faq-list">
      <h3>FAQs:</h3>
      <ul>
        {faqData.map((faq, index) => (
          <li key={index}>
            <strong>Question:</strong> {faq.text}
            <br />
            <strong>Answer:</strong> {faq.answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQList;
