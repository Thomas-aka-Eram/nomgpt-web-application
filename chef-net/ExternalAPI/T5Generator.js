import axios from "axios";

const T5_URL = "http://127.0.0.1:4000/generate";

export const fetchGeneratedRecipe = async (req, res) => {
    try {

        const { items = [], kitchen_tools = [], time } = req.body;

        // Normalize the inputs to arrays
        const normalizedItems = Array.isArray(items) ? items : [items].filter(Boolean);
        const normalizedKitchenTools = Array.isArray(kitchen_tools) ? kitchen_tools : [kitchen_tools].filter(Boolean);

        // Check if items are provided
        if (!normalizedItems || normalizedItems.length === 0) {
            return res.status(400).json({ error: "Food items are required" });
        }

        // Prepare the request body to send to the API
        const requestBody = {
            items: normalizedItems,
            kitchen_tools: normalizedKitchenTools,
            time: time || null,
        };

        // Send the POST request with the body
        const response = await axios.post(T5_URL, requestBody);

        // Send back the response data to the client
        res.json(response.data);

    } catch (error) {
        console.error("Error generating recipe:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
