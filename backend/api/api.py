from flask import Flask, render_template

app = Flask(__name__)

#write app.config to connect AWS Lambda and PostgreSQL - RR 2/5/2026
#db = SQLAlchemy(app)
#create class User(db.Model), make sure we know what info we're gonna pull from the db - RR 2/5/2026
#going to need to install zappa and a serverless framework if we want to use AWS Lambda and Flask

#honestly not sure why i have this here, but its an api thing - RR 2/5/2026
@app.route('/')
# ensure this is connected to the yet-to-be-created static file and the templates folder that should be within. i can resolve this if reminded - RR 2/5/2026
def home():
    return render_template('test.html')

if __name__ == '__main__':
    app.run(debug=True)