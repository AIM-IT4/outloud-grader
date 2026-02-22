import { useState, useEffect, useRef } from 'react';

export function useSpeechRecognition() {
    const [transcript, setTranscript] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Check for browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('Speech Recognition API not supported in this browser.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            setTranscript((prev) => {
                // We only append final results to avoid duplicating the interim ones forever.
                // Actually, for a simple implementation, it's easier to just rebuild the whole string from all final results so far,
                // or just rely on appending. Let's just keep track of the entire transcript.
                const allFinal = Array.from(event.results)
                    .filter(r => r.isFinal)
                    .map(r => r[0].transcript)
                    .join(' ');

                return allFinal + ' ' + interimTranscript;
            });
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setIsRecording(false);
        };

        recognition.onend = () => {
            // If it ends but we still wanted to record, we might want to restart it.
            // But for this simple app, we'll let it stop.
            setIsRecording(false);
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const startRecording = () => {
        if (recognitionRef.current && !isRecording) {
            setTranscript(''); // reset for new session
            recognitionRef.current.start();
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current && isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }
    };

    return {
        transcript,
        isRecording,
        startRecording,
        stopRecording
    };
}
