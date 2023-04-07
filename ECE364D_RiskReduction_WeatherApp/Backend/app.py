# from flask import Flask
#
# app = Flask(__name__)
#
#
# @app.route('/')
# def hello_world():  # put application's code here
#     return 'Hello World!'
#
#
# if __name__ == '__main__':
#     app.run()


# Import flask and datetime module for showing date and time
from flask import Flask
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)


@app.route('/slash')
def get_time2():
    return {
        'Name': "slash",
        "Age": "25",
        "Date": x,
        "programming": "python"
    }


# Route for seeing a data
@app.route('/data')
def get_time():
    # Returning an api for showing in  reactjs
    return {
        'Name': "data",
        "Age": "22",
        "Date": x,
        "programming": "python"
    }


# Running app
if __name__ == '__main__':
    app.run(debug=True)
