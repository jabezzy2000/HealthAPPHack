from flask import Flask, request, jsonify
import pandas as pd
from sqlalchemy import create_engine
import json

app = Flask(__name__)

# Database setup (adjust the URL to your database)
DATABASE_URI = 'sqlite:///diseases.db'
engine = create_engine(DATABASE_URI)

@app.route('/submit', methods=['POST'])
def submit_data():
    data = request.json  # Assuming data is submitted as JSON
    # Convert the incoming JSON data to a Pandas DataFrame
    df = pd.DataFrame(data)

    # Unique combination of 'disease name' and 'age'
    df['unique_combination'] = df['disease_name'] + '_' + df['age'].astype(str)
    grouped_df = df.groupby('unique_combination').agg(
        count=('disease_name', 'count'),  # Count of disease occurrences
        latitude=('latitude', 'first'),   # Assuming each record has lat and long
        longitude=('longitude', 'first')
    ).reset_index()

    # Convert to CSV (optional, based on needs)
    csv_data = grouped_df.to_csv(index=False)

    grouped_df.to_sql('disease_info', engine, if_exists='append', index=False)

    return jsonify({'message': 'Data processed and saved successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
