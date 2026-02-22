import React, { useState } from 'react';
import './index.css';
import { HomeView } from './components/HomeView';
import { InterviewView } from './components/InterviewView';
import { ResultView } from './components/ResultView';

function App() {
  const [view, setView] = useState('home');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [interviewResult, setInterviewResult] = useState(null);

  const startInterview = (question) => {
    setActiveQuestion(question);
    setView('interview');
  };

  const finishInterview = (result) => {
    setInterviewResult(result);
    setView('result');
  };

  const goHome = () => {
    setActiveQuestion(null);
    setInterviewResult(null);
    setView('home');
  };

  return (
    <div className="app-container">
      <header>
        <h1>Out-Loud Grader</h1>
      </header>
      <main className="content">
        {view === 'home' && <HomeView onStart={startInterview} />}
        {view === 'interview' && activeQuestion &&
          <InterviewView
            question={activeQuestion}
            onFinish={finishInterview}
            onCancel={goHome}
          />}
        {view === 'result' && interviewResult &&
          <ResultView
            result={interviewResult}
            onHome={goHome}
          />}
      </main>
    </div>
  );
}

export default App;
