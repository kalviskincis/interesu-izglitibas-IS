from flask import Flask, render_template, jsonify

app = Flask(__name__)
app.config['JSON_AS_ASCII']=False


@app.route('/')
def index():
  return render_template('index.html')

@app.route('/skolenu_izvelne')
def skIzvele():
  return render_template('skolenu_izvelne.html')

if __name__ == "__main__":
   app.run("0.0.0.0", debug=True)