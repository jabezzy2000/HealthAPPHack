from flask import Flask, request, jsonify
import pandas as pd
import openai
# Assuming use of an appropriate Parse library or direct REST API interactions
# For example, using requests for direct Parse Server API interactions
import requests

app = Flask(__name__)

# OpenAI API key
openai.api_key = 'zYz3HVC8Gf6nAsrZqDt2T3BlbkFJtLOhi3VlzDsgzGqUx4Np'

# Parse credentials and server URL
PARSE_APPLICATION_ID = "gnQ5OLyRrsSME4wp1F6c1iVa6x5HD5IKIMY2MMBG"
PARSE_REST_API_KEY = "x2KL2OTnMjOhzSXgQJBpxyDq3nTDFEzWMMN7chMX"
PARSE_SERVER_URL = 'https://parseapi.back4app.com/'

# Headers for Parse REST API
PARSE_HEADERS = {
    "X-Parse-Application-Id": PARSE_APPLICATION_ID,
    "X-Parse-REST-API-Key": PARSE_REST_API_KEY,
    "Content-Type": "application/json"
}

@app.route('/compute', methods=['POST'])
def compute_data():
    data = request.json

    processed_data = []
    for entry in data:
        if 'disease_name' not in entry or 'age' not in entry or 'location' not in entry:
            processed_text = process_with_openai(f"{entry}")
            # Process text to convert into a Python dict or an appropriate structure
            # Be cautious with eval() due to security implications
            processed_data.append(eval(processed_text))
        else:
            processed_data.append(entry)

    # Convert processed data to DataFrame
    df = pd.DataFrame(processed_data)

    # Save each entry to Parse
    for _, row in df.iterrows():
        # Construct the object to be saved
        object_data = {
            "disease_name": row['disease_name'],
            "age": row['age'],
            "latitude": row['latitude'],
            "longitude": row['longitude'],
            "count": row['count']
        }
        response = requests.post(f"{PARSE_SERVER_URL}/classes/DiseaseInfo", headers=PARSE_HEADERS, json=object_data)
        if response.status_code != 201:
            print(f"Failed to save: {response.text}")

    return jsonify({'message': 'Data processed and saved to Parse successfully'}), 200

def process_with_openai(text):
    prompt_text = f"{text}\n\nCount all the data that have the same disease name, location, and age. Return it back as data format separated with a comma, e.g., 'Back pain, 20012, 25, 200'."

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt_text,
        temperature=0.7,
        max_tokens=150,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    
    return response.choices[0].text.strip()

if __name__ == '__main__':
    app.run(debug=True)
