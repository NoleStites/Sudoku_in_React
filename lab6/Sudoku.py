from flask import Flask
from flask_cors import CORS
import time
import random

app = Flask(__name__)
CORS(app) # Allows the Recat app on port 3000 to access this script on port 5000

@app.route('/data')
def send_data():
    # Simulate some computation
    time.sleep(1)  # Simulate 1 second of computation time
    # Generate some random data
    #data = {'value1': random.random(), 'value2': random.random()}
    grid.append(random.randint(1, 10))
    # Return the data as JSON
    return grid

if __name__ == '__main__':
    grid = []
    app.run(debug=True)
