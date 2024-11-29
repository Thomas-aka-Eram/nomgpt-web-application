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

    items = data.get("items", "")
    input_text = f"items: {items}"

    inputs = tokenizer(
        input_text,
        max_length=256,
        padding="max_length",
        truncation=True,
        return_tensors="jax",
    )
    output_ids = model.generate(
        input_ids=inputs.input_ids, attention_mask=inputs.attention_mask, max_length=256
    )

    raw_response = tokenizer.decode(output_ids.sequences[0], skip_special_tokens=True)
    formatted_response = format_recipe_output(raw_response)

    return jsonify(formatted_response)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
