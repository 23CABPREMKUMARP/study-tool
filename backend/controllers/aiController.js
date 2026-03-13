const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

exports.explainConcept = async (req, res) => {
    const { question } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({
            definition: "API Key not configured. This is a demo mode.",
            explanation: "To enable real AI, add GEMINI_API_KEY to your backend .env file.",
            analogy: "Like a car without fuel, it looks good but won't start!",
            code: "console.log('Connect Gemini API');",
            tip: "Configuring environment variables is a key skill.",
            mistakes: "Keeping API keys in source code.",
            followUp: ["How to get Gemini Key?", "What is .env?"]
        });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `
      You are a senior software engineer interview mentor.
      Explain the following technical concept in structured format:
      Question: ${question}

      Format response STRICTLY as a JSON object with these keys:
      - definition: string
      - explanation: string (simple explanation)
      - analogy: string (real-world analogy)
      - code: string (code example)
      - tip: string (interview tip)
      - mistakes: string (common mistakes)
      - followUp: array of strings (3 follow-up questions)
      
      Return ONLY the JSON object.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean JSON from potential markdown blocks
        const cleanJson = text.replace(/```json|```/g, '').trim();
        const data = JSON.parse(cleanJson);

        res.json(data);
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ message: 'AI failed to respond. Check console for details.' });
    }
};

exports.generateRoadmap = async (req, res) => {
    const { goal } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({
            title: `Roadmap to become ${goal} (Demo Mode)`,
            duration: "4-6 Weeks",
            milestones: [
                {
                    week: "Week 1",
                    topic: "Demo Milestone",
                    description: "This is a placeholder because GEMINI_API_KEY is not set.",
                    items: ["Item 1", "Item 2"]
                }
            ]
        });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `
      You are a career coach. Generate a detailed learning roadmap for someone who wants to: ${goal}.
      
      Format response STRICTLY as a JSON object with these keys:
      - title: string
      - duration: string (e.g. "4-8 Weeks")
      - milestones: array of objects, each with:
        - week: string (e.g. "Week 1")
        - topic: string
        - description: string
        - items: array of strings
        
      Keep it to 4-5 major milestones.
      Return ONLY the JSON object.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanJson = text.replace(/```json|```/g, '').trim();
        const data = JSON.parse(cleanJson);

        res.json(data);
    } catch (error) {
        console.error('Roadmap AI Error:', error);
        res.status(500).json({ message: 'Failed to generate roadmap' });
    }
};

exports.analyzeResume = async (req, res) => {
    const { resumeText } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({
            score: 75,
            detectedSkills: ["Sample Skill"],
            summary: "Demo analysis result.",
            sections: []
        });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `
      Analyze this resume text and provide career feedback and interview preparation questions.
      Resume: ${resumeText}

      Format response STRICTLY as a JSON object with these keys:
      - score: number (0-100)
      - detectedSkills: array of strings
      - summary: string (2-3 sentences)
      - sections: array of objects, each with:
        - skill: string
        - questions: array of objects, each with:
          - question: string
          - type: string (e.g. "Technical", "Behavioral")
          - difficulty: string (e.g. "Easy", "Hard")
          
      Return ONLY the JSON object.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanJson = text.replace(/```json|```/g, '').trim();
        const data = JSON.parse(cleanJson);

        res.json(data);
    } catch (error) {
        console.error('Resume AI Error:', error);
        res.status(500).json({ message: 'Failed to analyze resume' });
    }
};

exports.interview = async (req, res) => {
    const { role, messages } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({
            reply: "Insightful approach. Let's shift gears: How would you design a rate-limiting system for a high-traffic microservices architecture?"
        });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        let conversationText = messages.map(m => `${m.role === 'ai' ? 'Interviewer' : 'Candidate'}: ${m.content}`).join('\n');

        const prompt = `
      You are an elite AI technical interviewer conducting an interview for a ${role.title} position.
      Here is the conversation so far:
      ${conversationText}

      Please provide your next response as the interviewer. Keep it challenging but fair.
      Format response STRICTLY as a JSON object with:
      - reply: string (your response to the candidate)
      
      Return ONLY the JSON object.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanJson = text.replace(/```json|```/g, '').trim();
        const data = JSON.parse(cleanJson);

        res.json(data);
    } catch (error) {
        console.error('Interview AI Error:', error);
        res.status(500).json({ message: 'Failed to process interview response' });
    }
};

exports.finalizeInterview = async (req, res) => {
    const { role, messages } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({
            score: 88,
            summary: "Exemplary performance. You demonstrated deep technical intuition and effective communication. Your architectural reasoning is exceptionally structured.",
            improvements: [
                "Specify latency trade-offs in distributed systems.",
                "Mention specific monitoring tools (Prometheus/Grafana).",
                "Strengthen test-driven development focus."
            ],
            strengths: ["Architectural Depth", "Fluid Communication", "Problem Synthesis"]
        });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        let conversationText = messages.map(m => `${m.role === 'ai' ? 'Interviewer' : 'Candidate'}: ${m.content}`).join('\n');

        const prompt = `
      You are an elite AI technical interviewer. You have just completed an interview for a ${role.title} position.
      Here is the entire conversation transcript:
      ${conversationText}

      Evaluate the candidate's performance.
      Format response STRICTLY as a JSON object with:
      - score: number (0-100)
      - summary: string (2-3 sentences of overall feedback)
      - improvements: array of strings (3 specific areas to improve)
      - strengths: array of strings (3 specific strong areas)
      
      Return ONLY the JSON object.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanJson = text.replace(/```json|```/g, '').trim();
        const data = JSON.parse(cleanJson);

        res.json(data);
    } catch (error) {
        console.error('Finalize Interview AI Error:', error);
        res.status(500).json({ message: 'Failed to finalize interview' });
    }
};
