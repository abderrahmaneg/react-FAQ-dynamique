import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import QueryForm from './QueryForm';
import AnswerDisplay from './AnswerDisplay';
import FAQList from './FAQList';

  
const FAQArabic = ({ firestore }) => {
    const [answer, setAnswer] = useState('');
    const [notFound, setNotFound] = useState(false);
    const [faqData, setFaqData] = useState([]);
    const answerARABic='الجواب';
    const QueryArb="بحت";
    useEffect(() => {
      fetchInitialData();
    }, []);
  
    const fetchInitialData = async () => {
      try {
        const collectionRef = collection(firestore, 'questionarb');
        const querySnapshot = await getDocs(collectionRef);
        const initialData = querySnapshot.docs.map((doc) => doc.data());
        setFaqData(initialData);
        console.log('Initial Data:', initialData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
  
    const handleQuery = async (question) => {
      try {
        const collectionRef = collection(firestore, 'questionarb');
        const keywords = question.toLowerCase().split(' ');
        const querySnapshot = await getDocs(collectionRef);
  
        const matchingDocs = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((data) => hasMatchingKeyword(data, keywords));
  
        updateAnswerAndNotFound(matchingDocs);
      } catch (error) {
        console.error('Error querying database:', error);
      }
    };
  
    const hasMatchingKeyword = (data, keywords) => {
      const excludedKeywords = [' ','في','ماذا',''];
      const filteredKeywords = keywords.filter((keyword) => !excludedKeywords.includes(keyword));
  
      return filteredKeywords.some((keyword) => {
        const text = data.text && data.text.toLowerCase();
        const answer = data.answer && data.answer.toLowerCase();
        return (text && text.includes(keyword)) || (answer && answer.includes(keyword));
      });
    };
  
    const updateAnswerAndNotFound = (matchingDocs) => {
      if (matchingDocs.length === 0) {
        setNotFound(true);
        setAnswer('Answer not found');
      } else {
        const firstMatchingDoc = matchingDocs[0];
        setNotFound(false);
        setAnswer(firstMatchingDoc.answer);
        setFaqData(matchingDocs);
        console.log(firstMatchingDoc.answer);
      }
    };
  
    return (
      <div className="QueryApp">
        <h2>فضاء الاسئلة</h2>
        <QueryForm onQuery={handleQuery} QueryArb={QueryArb} />
        <AnswerDisplay notFound={notFound} answer={answer}  answerARABic={answerARABic} />
        <FAQList faqData={faqData} />
      </div>
    );
  };
  

export default FAQArabic;
