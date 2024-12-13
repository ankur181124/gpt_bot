// openaiClient.js
const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Make sure to set your API key in environment variables
});

// Maximum number of retries for handling rate limit errors
const MAX_RETRIES = 5;

// Retry logic for OpenAI API calls in case of rate-limiting (HTTP 429)
async function analyzeResponseWithRetry(question, userResponse, prompt, retries = 0) {
    try {
       

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",  
            messages: [{ role: "user", content: prompt }],
        });
console.log(completion.choices[0].message)


        return completion.choices[0].message.content.trim(); 
    } catch (error) {
        // Check if the error is a rate limit error (429)
        if (error.response && error.response.status === 429 && retries < MAX_RETRIES) {
            console.log("Rate limit exceeded, retrying...");
            const delay = Math.pow(2, retries) * 1000; 
            await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
            return analyzeResponseWithRetry(question, userResponse, prompt, retries + 1); // Retry the request
        } else {
            console.error("Error:", error.message);  // Handle other errors
            return "Error processing the response with AI."; // Fallback response
        }
    }
}

module.exports = { analyzeResponseWithRetry };
