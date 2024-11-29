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
    title_match = re.search(
        r"title: (.+?)( ingredients:|$)", raw_response, re.IGNORECASE
    )
    title = title_match.group(1).strip() if title_match else "Untitled Recipe"

    ingredients_match = re.search(
        r"ingredients: (.+?)( directions:|$)", raw_response, re.IGNORECASE
    )
    ingredients_raw = ingredients_match.group(1).strip() if ingredients_match else ""
    ingredients_list = re.split(r"\s*(?<=\d)\s*(?=\d)", ingredients_raw)
    ingredients = {
        str(i + 1): ingredient.strip() for i, ingredient in enumerate(ingredients_list)
    }

    directions_match = re.search(r"directions: (.+?)$", raw_response, re.IGNORECASE)
    directions_raw = directions_match.group(1).strip() if directions_match else ""
    directions_list = directions_raw.split(". ")
    directions = {str(i + 1): step.strip() for i, step in enumerate(directions_list)}

    return {
        "recipe": {
            "Title": title,
            "Ingredients": ingredients,
            "Directions": directions,
        }
    }


@app.route("/generate", methods=["POST"])
def generate_recipe():
    data = request.json

    if not data or "items" not in data:
        return jsonify({"error": "Invalid input. Provide 'items' in the request."}), 400

    # Ensure 'items' is an array and join them into a string if it is an array
    items = data["items"]
    kitchen_tools = data.get("kitchen-tools", [])
    time = data.get("time", None)

    if isinstance(items, list):
        items_str = ", ".join(items)  # Join array into a comma-separated string
    else:
        return jsonify({"error": "'items' should be an array."}), 400

    if kitchen_tools and isinstance(kitchen_tools, list):
        kitchen_tools_str = ", ".join(kitchen_tools)  # Join kitchen tools into a string
    else:
        kitchen_tools_str = "basic kitchen tools"  # Default if no tools provided

    if time:
        time_str = f" and takes {time} to cook"
    else:
        time_str = ""

    # Construct the input text for the model
    input_text = f"items: {items_str}, kitchen tools: {kitchen_tools_str}{time_str}"

    # Tokenize input text
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

    # Decode the output and format the response
    raw_response = tokenizer.decode(output_ids.sequences[0], skip_special_tokens=True)
    formatted_response = format_recipe_output(raw_response)

    return jsonify(formatted_response)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
