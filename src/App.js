import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import FAQFrench from './FAQFrench'; 
import FAQArabic from './FAQArabic'; 
import './QueryApp.css'; 

const firebaseConfig = {
  apiKey: "AIzaSyA4BbOqXuQz6zE2wsFjptgJBFLh1VdQ4uk",
  authDomain: "faq-en-ligne.firebaseapp.com",
  projectId: "faq-en-ligne",
  storageBucket: "faq-en-ligne.appspot.com",
  messagingSenderId: "176590844815",
  appId: "1:176590844815:web:81fd9c9922741d0f0bd1fa",
  measurementId: "G-SPSCFVXDW4"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp); 

function App() {
  return (
    
    <Router>
      <div className="App">
        <h1>FAQ EN LIGNE</h1>
        <nav>
          <ul>
           
            <li>
              <Link to="/french">Frances</Link>
            </li>
            <li>
              <Link to="/arabic">العربية</Link>
            </li>
           
          </ul>
        </nav>

        <Routes>
          <Route path="/french" element={<FAQFrench firestore={firestore} />}>
          </Route>
          <Route path="/arabic" element={<FAQArabic firestore={firestore} />}>
          </Route>
         
        </Routes>
      </div>
    </Router>
  
    
    
  );
}

export default App;

