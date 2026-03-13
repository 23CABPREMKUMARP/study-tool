const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

exports.generateQuiz = async (req, res) => {
    const { category, difficulty } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json([
            {
                question: "Demo Question: What is Javascript?",
                options: ["A language", "A coffee", "A car", "A movie"],
                correct: 0,
                explanation: "Javascript is a programming language."
            }
        ]);
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `
      Generate a technical quiz for: ${category} with ${difficulty} difficulty.
      Provide 5 multiple choice questions.
      
      Format response STRICTLY as a JSON array of objects, each with:
      - question: string
      - options: array of 4 strings
      - correct: number (0-3 index)
      - explanation: string
      
      Return ONLY the JSON array.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanJson = text.replace(/```json|```/g, '').trim();
        const data = JSON.parse(cleanJson);

        res.json(data);
    } catch (error) {
        console.error('Quiz AI Error:', error);
        res.status(500).json({ message: 'Failed to generate quiz' });
    }
};
