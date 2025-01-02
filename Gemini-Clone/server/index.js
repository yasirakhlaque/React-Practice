require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors'); // Include cors

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS to allow requests from your frontend origin
const allowedOrigins = ['https://front-gamma-one.vercel.app']; // Replace with your frontend URL
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200, // some legacy browsers require this
}

app.use(cors(corsOptions)); // Apply CORS middleware

app.use(express.json()); // Enable parsing JSON request bodies

const apiKey = process.env.GEMINI_API_KEY; // Get API key from .env

if (!apiKey) {
    console.error("GEMINI_API_KEY environment variable is required.");
    process.exit(1); // Exit if API key is not set
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
};

// Handle API call for generation
app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({ error: "Prompt is required." });
        }

        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        const text = await result.response.text();
        res.json({ response: text });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "An error occurred." });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
