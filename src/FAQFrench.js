
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import QueryForm from './QueryForm';
import AnswerDisplay from './AnswerDisplay';
import FAQList from './FAQList';


    const FAQFrench = ({ firestore }) => {
        const [answer, setAnswer] = useState('');
        const [notFound, setNotFound] = useState(false);
        const [faqData, setFaqData] = useState([]);
        const answerFrench='reponse';
        const QueryFrn="Query";
        useEffect(() => {
          fetchInitialData();
        }, []);
      
        const fetchInitialData = async () => {
          try {
            const collectionRef = collection(firestore, 'questions');
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
            const collectionRef = collection(firestore, 'questions');
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
          const excludedKeywords = ['you','',""];
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
            <h2>FAQ French</h2>
            <QueryForm onQuery={handleQuery} QueryFrn={QueryFrn} />
            <AnswerDisplay notFound={notFound} answer={answer} answerFrench={answerFrench} />
            <FAQList faqData={faqData} />
          </div>
        );
      };
export default FAQFrench;
