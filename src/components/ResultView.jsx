import React from 'react';

export function ResultView({ result, onHome }) {
    const { score, feedback, matchedKeywords, finalTranscript } = result;

    return (
        <div className="view result-view">
            <div className="result-header">
                <h2>Interview Complete</h2>
                <div className="score-ring glass-panel">
                    <div className="score-value">{score}%</div>
                    <div className="score-label">Clarity Score</div>
                </div>
            </div>

            <div className="feedback-section glass-panel">
                <h3>AI Feedback</h3>
                <p className="feedback-text">{feedback}</p>
            </div>

            <div className="keywords-section glass-panel">
                <h3>Key Concepts Mentioned</h3>
                {matchedKeywords.length > 0 ? (
                    <div className="tags">
                        {matchedKeywords.map((kw, idx) => (
                            <span key={idx} className="tag">{kw}</span>
                        ))}
                    </div>
                ) : (
                    <p className="placeholder">No expected keywords were detected.</p>
                )}
            </div>

            <div className="transcript-section glass-panel">
                <h3>Your Output</h3>
                <p className="transcript-text">{finalTranscript || "(No audio recorded)"}</p>
            </div>

            <button className="btn-primary full-width" onClick={onHome}>Practice Another</button>
        </div>
    );
}
