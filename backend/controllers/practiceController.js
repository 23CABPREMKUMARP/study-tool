const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

exports.generateProblem = async (req, res) => {
    const { topic, difficulty, language } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
      As a technical interviewer, generate a coding challenge about ${topic} in ${language} with ${difficulty} difficulty.
      
      Format the response STRICTLY as a JSON object with:
      - title: A professional problem title
      - difficulty: ${difficulty}
      - category: ${topic}
      - description: A clear problem statement with requirements
      - examples: Array of 2-3 objects {input: string, output: string}
      - constraints: Array of time/space complexity or input size constraints
      - hints: Array of 2 helpful hints
      - initialCode: Boilerplate code for the solve function
      
      Return ONLY the JSON. No markdown blocks.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanJson = text.replace(/```json|```/g, '').trim();
        let data;
        try {
            data = JSON.parse(cleanJson);
        } catch (parseError) {
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                data = JSON.parse(jsonMatch[0]);
            } else {
                throw parseError;
            }
        }

        res.json(data);
    } catch (error) {
        console.error('Practice AI Error:', error);
        if (error.status === 429) {
            return res.status(429).json({ 
                message: 'Neural Core Rate Limited. Please wait 60 seconds.',
                isQuotaError: true
            });
        }
        res.status(500).json({ message: 'Failed to generate problem' });
    }
};

exports.compileAndRun = async (req, res) => {
    const { code, language, problem } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
      Act as a code compiler and test runner.
      Problem: ${problem.title}
      Description: ${problem.description}
      Language: ${language}
      Code to evaluate:
      ${code}

      Task:
      1. Analyze the code for correctness against the problem description.
      2. Run the provided examples from the problem through the logic.
      3. Return a detailed terminal-style output showing test results.

      Format response STRICTLY as a JSON object with:
      - output: string (Terminal-style output with passes/fails)
      - status: "success" or "error"
      
      Return ONLY the JSON.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanJson = text.replace(/```json|```/g, '').trim();
        let data;
        try {
            data = JSON.parse(cleanJson);
        } catch (parseError) {
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                data = JSON.parse(jsonMatch[0]);
            } else {
                throw parseError;
            }
        }
        res.json(data);
    } catch (error) {
        console.error('Execution Error:', error);
        if (error.status === 429) {
            return res.status(429).json({ 
                message: 'Neural Core Rate Limited. Please wait 60 seconds.',
                isQuotaError: true
            });
        }
        res.status(500).json({ message: 'Failed to execute code' });
    }
};

exports.generateFlashcards = async (req, res) => {
    const { topic, difficulty, count = 4 } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
      Generate ${count} educational flashcards for: ${topic} with ${difficulty} difficulty.
      
      Format response STRICTLY as a JSON array of objects, each with:
      - category: string (the general topic area)
      - difficulty: string (e.g., 'Beginner', 'Hard')
      - question: string (a concise question or term)
      - answer: string (a clear, detailed explanation or definition)
      
      Return ONLY the JSON array.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanJson = text.replace(/```json|```/g, '').trim();
        let data;
        try {
            data = JSON.parse(cleanJson);
        } catch (parseError) {
            const jsonMatch = text.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                data = JSON.parse(jsonMatch[0]);
            } else {
                throw parseError;
            }
        }

        res.json(data);
    } catch (error) {
        console.error('Flashcards AI Error:', error);
        if (error.status === 429) {
            return res.status(429).json({ 
                message: 'Neural Core Rate Limited. Please wait 60 seconds.',
                isQuotaError: true
            });
        }
        res.status(500).json({ message: 'Failed to generate flashcards' });
    }
};
