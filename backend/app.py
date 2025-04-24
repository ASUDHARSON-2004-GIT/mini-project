from flask import Flask, jsonify
from flask_cors import CORS
import joblib
import random
from utils.traffic_generator import generate_traffic_data

app = Flask(__name__)
CORS(app)

# Load the trained Random Forest model
model = joblib.load('model/dos_rf_model.pkl')

@app.route('/api/traffic', methods=['GET'])
def get_traffic_status():
    data = generate_traffic_data()

    features = [[
        data['packet_rate'],
        data['avg_packet_size'],
        data['syn_count']
    ]]

    prediction = model.predict(features)[0]

    return jsonify({
        'status': 'attack' if prediction == 1 else 'normal',
        'data': data
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
