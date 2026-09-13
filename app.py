import os
import random
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get-signal', methods=['GET'])
def get_signal():
    pair = request.args.get('pair', 'AUD_USD')
    tf = request.args.get('tf', '10s')

    is_call = random.choice([True, False])
    confidence = random.randint(91, 99)

    return jsonify({
        "status": "success",
        "pair": pair,
        "tf": tf,
        "signal": "CALL" if is_call else "PUT",
        "confidence": confidence
    })

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

