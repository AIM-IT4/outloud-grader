import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { gradeTranscript } from '../utils/grader';

export function InterviewView({ question, onFinish, onCancel }) {
    const { transcript, isRecording, startRecording, stopRecording } = useSpeechRecognition();
    const [timeLeft, setTimeLeft] = useState(180); // 3 mins

    useEffect(() => {
        let timer;
        if (isRecording && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRecording) {
            handleFinish();
        }
        return () => clearInterval(timer);
    }, [isRecording, timeLeft]);

    const handleFinish = () => {
        stopRecording();
        const result = gradeTranscript(transcript, question);
        onFinish({ ...result, question, finalTranscript: transcript });
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="view interview-view">
            <div className="header-actions">
                <button className="btn-icon" onClick={onCancel}>← Back</button>
                <div className={`timer ${timeLeft < 30 ? 'danger' : ''}`}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="question-prompt glass-panel">
                <span className="topic-badge">{question.topic}</span>
                <h3>{question.title}</h3>
                <p>{question.text}</p>
            </div>

            <div className="recording-container">
                <div className={`mic-button ${isRecording ? 'recording' : ''}`} onClick={isRecording ? stopRecording : startRecording}>
                    <div className="mic-icon"></div>
                </div>
                <p className="status-text">{isRecording ? "Listening..." : "Tap to start speaking"}</p>
            </div>

            <div className="transcript-preview glass-panel">
                <h4>Live Transcript</h4>
                <p className="transcript-text">
                    {transcript || <span className="placeholder">Your words will appear here...</span>}
                </p>
            </div>

            <div className="action-footer">
                {(isRecording || transcript.length > 0) && (
                    <button className="btn-primary" onClick={handleFinish}>Finish & Grade</button>
                )}
            </div>
        </div>
    );
}
