from flask import Flask, render_template, request
import subprocess
import os

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        subprocess.Popen(['python', 'testpython.py'], cwd=os.path.dirname(os.path.abspath(__file__)))
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)