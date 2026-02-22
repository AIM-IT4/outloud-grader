import React from 'react';
import { questions } from '../data/questions';

export function HomeView({ onStart }) {
    return (
        <div className="view home-view">
            <h2>Select a Brainteaser</h2>
            <p className="subtitle">Practice explaining your logic out loud. Speak clearly, as if you were in a real interview.</p>

            <div className="question-list">
                {questions.map((q) => (
                    <div key={q.id} className="question-card" onClick={() => onStart(q)}>
                        <div className="card-header">
                            <span className="topic-badge">{q.topic}</span>
                        </div>
                        <h3>{q.title}</h3>
                        <p className="preview">{q.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
