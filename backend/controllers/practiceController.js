const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

exports.generateProblem = async (req, res) => {
    const { topic, difficulty, language } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({
            title: "In-Place Array Reversal",
            difficulty: "Easy",
            category: topic || "Algorithms",
            description: "Write a function that reverses an array in-place. Do not use built-in reverse functions.",
            examples: [
                { input: "[1, 2, 3, 4, 5]", output: "[5, 4, 3, 2, 1]" },
                { input: "['a', 'b', 'c']", output: "['c', 'b', 'a']" }
            ],
            constraints: ["Time complexity must be O(n)", "Space complexity must be O(1)"],
            hints: ["Use a two-pointer technique.", "Swap elements from both ends toward the middle."],
            initialCode: language === 'python' ? "def solve(arr):\n    # Write your logic here\n    pass" : "function solve(arr) {\n    // Write your logic here\n    return arr;\n}"
        });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

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
        const data = JSON.parse(cleanJson);

        res.json(data);
    } catch (error) {
        console.error('Practice AI Error:', error);
        res.status(500).json({ message: 'Failed to generate problem' });
    }
};

exports.compileAndRun = async (req, res) => {
    const { code, language, problem } = req.body;
    console.log('--- Coding Arena: Run Request ---');
    console.log('Language:', language);
    console.log('Problem:', problem?.title);

    if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({
            output: "✅ Test Case 1: Passed\n✅ Test Case 2: Passed\n\nAll tests passed successfully (Simulated Execution).",
            status: "success"
        });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

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
        console.log('AI Raw Output:', text);

        const cleanJson = text.replace(/```json|```/g, '').trim();
        try {
            const data = JSON.parse(cleanJson);
            res.json(data);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            res.status(500).json({ output: "AI returned malformed output. Please retry.", status: "error" });
        }
    } catch (error) {
        console.error('Execution Error Details:', error);
        res.status(500).json({ output: "Internal Error during code execution.", status: "error" });
    }
};

exports.generateFlashcards = async (req, res) => {
    const { topic, difficulty, count = 4 } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json([
            { category: topic || "Concepts", difficulty: difficulty || "Beginner", question: "What is Encapsulation?", answer: "Encapsulation is the bundling of data and the methods that operate on that data into a single unit, usually a class, while restricting direct access to some components." },
            { category: topic || "React", difficulty: difficulty || "Intermediate", question: "What is Virtual DOM?", answer: "The Virtual DOM is a programming concept where an ideal, or 'virtual', representation of a UI is kept in memory and synced with the 'real' DOM by a library such as ReactDOM." },
            { category: topic || "Distributed Systems", difficulty: difficulty || "Hard", question: "Explain CAP Theorem.", answer: "The CAP theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the three guarantees: Consistency, Availability, and Partition Tolerance." },
            { category: topic || "JavaScript", difficulty: difficulty || "Advanced", question: "What is a Closure in JavaScript?", answer: "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment)." }
        ].slice(0, count));
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

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
        const data = JSON.parse(cleanJson);

        res.json(data);
    } catch (error) {
        console.error('Flashcards AI Error:', error);
        res.status(500).json({ message: 'Failed to generate flashcards' });
    }
};
