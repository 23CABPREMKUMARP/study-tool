const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

exports.generateQuiz = async (req, res) => {
    const { category, difficulty } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

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
        console.error('Quiz AI Error:', error);
        if (error.status === 429) {
            return res.status(429).json({ 
                message: 'Neural Core Rate Limited. Please wait 60 seconds.',
                isQuotaError: true
            });
        }
        res.status(500).json({ message: 'Failed to generate quiz' });
    }
};
