import bcrypt
from flask import request, jsonify
from flask_pymongo import PyMongo
from flask import Flask
import os
from dotenv import load_dotenv
from urllib.parse import quote_plus
from functools import wraps

load_dotenv()  

username = quote_plus(os.getenv("MONGO_USERNAME"))
password = quote_plus(os.getenv("MONGO_PASSWORD"))


mongo_uri = f"mongodb+srv://{username}:{password}@healthht.vrsdzaw.mongodb.net/your_db?retryWrites=true&w=majority&appName=HealthHT"

app = Flask(__name__)
app.config["MONGO_URI"] = mongo_uri
mongo = PyMongo(app)

#JSON must have username email and password
#get session ID and save to model for current active session
@app.route('/register', methods=['POST'])
def register():
    users = mongo.db.users
    username = request.json['username']
    email = request.json['email']
    plain_password = request.json['password'].encode('utf-8')

    # Hashing the password
    hashed_password = bcrypt.hashpw(plain_password, bcrypt.gensalt())

    # Check if email already exists
    if users.find_one({'email': email}):
        return jsonify({"error": "Email already exists"}), 400

    user_id = users.insert_one({
        'username': username,
        'email': email,
        'password': hashed_password
    }).inserted_id

    return jsonify({'message': 'User created successfully', 'user_id': str(user_id)}), 201

@app.route('/login', methods=['POST'])
def login():
    users = mongo.db.users
    email = request.json['email']
    password = request.json['password'].encode('utf-8')

    user = users.find_one({'email': email})

    if user and bcrypt.checkpw(password, user['password']):
        # For simplicity, we're just returning a success message.
        # In a real app, you'd return a JWT or similar token for authentication.
        return jsonify({'message': 'Login successful', 'user_id': str(user['_id'])}), 200
    else:
        return jsonify({'error': 'Invalid login credentials'}), 401
    
# comeback to this-------------
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Authentication logic goes here
        # For now, we're skipping this part
        return f(*args, **kwargs)
    return decorated
    
@app.route('/submit/disease', methods=['POST'])
@token_required
def submit_disease():
    diseases = mongo.db.diseases
    user_id = request.json.get('user_id')  # Assuming you pass user ID in request
    name = request.json['name']
    description = request.json.get('description', '')
    location = request.json.get('location', {})

    # Insert the disease information into the database
    disease_id = diseases.insert_one({
        'user_id': user_id,
        'name': name,
        'description': description,
        'location': location,
        'verified': False  # Default to False; needs verification
    }).inserted_id

    return jsonify({'message': 'Disease submitted successfully', 'disease_id': str(disease_id)}), 201

@app.route('/submit/symptom', methods=['POST'])
@token_required
def submit_symptom():
    symptoms = mongo.db.symptoms
    user_id = request.json.get('user_id')  # Assuming you pass user ID in request
    name = request.json['name']
    description = request.json.get('description', '')
    location = request.json.get('location', {})

    # Insert the symptom information into the database
    symptom_id = symptoms.insert_one({
        'user_id': user_id,
        'name': name,
        'description': description,
        'location': location
    }).inserted_id

    return jsonify({'message': 'Symptom submitted successfully', 'symptom_id': str(symptom_id)}), 201

# Get Trends and Statistics
@app.route('/analysis/trends', methods=['GET'])
def get_trends():
    # Perform data analysis and trend calculation here
    # For demonstration, return sample trend data
    sample_data = [
        {"id": 1, "type": "disease", "name": "COVID-19", "location": "New York", "count": 100},
        {"id": 2, "type": "symptom", "name": "Fever", "location": "California", "count": 200},
        {"id": 3, "type": "disease", "name": "Influenza", "location": "Texas", "count": 150},
        {"id": 4, "type": "symptom", "name": "Cough", "location": "Florida", "count": 180}
    ]
    return jsonify({"trends": sample_data})

# Retrieve Data for Map Visualization
@app.route('/analysis/map', methods=['GET'])
def get_map_data():
    type_param = request.args.get('type')
    location_param = request.args.get('location')

    # Perform filtering based on type and location if provided
    query = {}
    if type_param:
        query['type'] = type_param
    if location_param:
        query['location'] = location_param

    # Retrieve data from MongoDB
    map_data = list(mongo.db.map_collection.find(query, {'_id': 0}))

    return jsonify({"mapData": map_data})

# View User's Submissions
@app.route('/users/submissions', methods=['GET'])
def get_user_submissions():
    # Retrieve authenticated user's submissions from MongoDB
    # Replace 'authenticated_user_id' with the ID of the authenticated user
    authenticated_user_id = "replace_with_authenticated_user_id"
    submissions = list(mongo.db.submissions.find({'user_id': authenticated_user_id}, {'_id': 0}))

    return jsonify({"submissions": submissions})

# Delete a User's Submission
@app.route('/users/submissions/<submission_id>', methods=['DELETE'])
def delete_user_submission(submission_id):
    # Delete the specified submission made by the authenticated user
    # Replace 'authenticated_user_id' with the ID of the authenticated user
    authenticated_user_id = "replace_with_authenticated_user_id"
    result = mongo.db.submissions.delete_one({'_id': submission_id, 'user_id': authenticated_user_id})

    if result.deleted_count == 1:
        return jsonify({"message": "Submission deleted successfully"})
    else:
        return jsonify({"error": "Submission not found or unauthorized"}), 404

if __name__ == '__main__':
    app.run(debug=True)