require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ['https://front-gamma-one.vercel.app/']; // Replace with your frontend URL
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) { // Allow requests with no origin (like mobile apps or curl requests)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Include all methods
    credentials: true, // Important for cookies, authorization headers with CORS
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

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
