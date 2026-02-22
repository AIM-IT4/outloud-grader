export function gradeTranscript(transcript, question) {
    if (!transcript || transcript.trim() === '') {
        return {
            score: 0,
            feedback: "No speech detected. Please try recording again and make sure to speak clearly out loud.",
            matchedKeywords: []
        };
    }

    const text = transcript.toLowerCase();

    // Calculate keyword matches
    const matchedKeywords = question.keywords.filter(kw => text.includes(kw.toLowerCase()));

    // Score out of 100 based on keyword density
    // Max score if you hit at least 4 keywords
    const requiredKeywords = Math.min(4, question.keywords.length);
    let rawScore = (matchedKeywords.length / requiredKeywords) * 100;
    let score = Math.min(100, Math.round(rawScore));

    // Determine feedback based on score
    let feedback = '';
    if (score >= 80) {
        feedback = "Excellent! You clearly communicated the key logical concepts needed to solve this problem.";
    } else if (score >= 50) {
        feedback = "Good attempt. You hit some key concepts, but missing some critical vocabulary or logical steps.";
    } else {
        feedback = "You missed the core logical setup. In an interview, make sure you state your assumptions and base cases clearly.";
    }

    return {
        score,
        feedback: feedback + " \n\nExpected approach: " + question.expectedBaseFeedback,
        matchedKeywords
    };
}
