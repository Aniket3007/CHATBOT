from flask import Flask, render_template, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json['userInput']
    # Append data to an Excel file
    try:
        existing_df = pd.read_excel('user_data.xlsx')
    except FileNotFoundError:
        existing_df = pd.DataFrame()

    new_data = pd.DataFrame([data], columns=['User Input'])     
    df = pd.concat([existing_df, new_data])
    df.to_excel('user_data.xlsx', index=False)

    return jsonify("Received: " + data)

if __name__ == '__main__':
    app.run(debug=True)
