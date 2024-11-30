from flask import Flask, request, jsonify
from transformers import FlaxAutoModelForSeq2SeqLM, AutoTokenizer
import re

app = Flask(__name__)

# Load the model
model_path = "D:\\T5RecipeGeneration"  # Replace with the actual model path
tokenizer = AutoTokenizer.from_pretrained(model_path, use_fast=True)
model = FlaxAutoModelForSeq2SeqLM.from_pretrained(model_path)


def format_recipe_output(raw_response):
    """Formats the raw response into a structured JSON format."""

    # Title extraction using regex
    title_match = re.search(
        r"title: (.+?)( ingredients:|$)", raw_response, re.IGNORECASE
    )
    title = title_match.group(1).strip() if title_match else "Untitled Recipe"

    # Ingredients extraction using regex
    ingredients_match = re.search(
        r"ingredients: (.+?)( directions:|$)", raw_response, re.IGNORECASE
    )
    ingredients_raw = ingredients_match.group(1).strip() if ingredients_match else ""
    ingredients_list = [ingredient.strip() for ingredient in ingredients_raw.split(",")]

    # Directions extraction using regex
    directions_match = re.search(r"directions: (.+?)$", raw_response, re.IGNORECASE)
    directions_raw = directions_match.group(1).strip() if directions_match else ""
    directions_list = [
        step.strip() for step in directions_raw.split(".") if step.strip()
    ]

    return {
        "recipe": {
            "Title": title,
            "Ingredients": ingredients_list,  # Now a list of ingredients
            "Directions": directions_list,  # Now a list of directions
        }
    }


@app.route("/generate", methods=["POST"])
def generate_recipe():
    data = request.json

    # Validate incoming request
    if not data or "items" not in data:
        return jsonify({"error": "Invalid input. Provide 'items' in the request."}), 400

    # Normalize 'items' and other fields
    items = data.get("items", [])
    kitchen_tools = data.get("kitchen-tools", [])
    time = data.get("time", "")

    # If 'items' is not an array, return an error
    if not isinstance(items, list):
        return jsonify({"error": "'items' should be an array."}), 400

    # Default kitchen tools if none are provided
    kitchen_tools_str = (
        ", ".join(kitchen_tools) if kitchen_tools else "basic kitchen tools"
    )

    # Handle time, if provided
    time_str = f" and takes {time} to cook" if time else ""

    # Format the input text for the model
    input_text = (
        f"items: {', '.join(items)}, kitchen tools: {kitchen_tools_str}{time_str}"
    )

    # Tokenize the input text
    inputs = tokenizer(
        input_text,
        max_length=256,
        padding="max_length",
        truncation=True,
        return_tensors="jax",
    )

    # Generate the recipe using the model
    output_ids = model.generate(
        input_ids=inputs.input_ids, attention_mask=inputs.attention_mask, max_length=256
    )

    # Decode the output and format it
    raw_response = tokenizer.decode(output_ids.sequences[0], skip_special_tokens=True)
    formatted_response = format_recipe_output(raw_response)

    return jsonify(formatted_response)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
