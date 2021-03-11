from flask import Flask, render_template, jsonify, json, request

app = Flask(__name__)
app.config['JSON_AS_ASCII']=False

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/skolenu_izvelne')
def skIzvele():
  return render_template('skolenu_izvelne.html')

@app.route('/vecaku_pieteikums')
def vecPiet():
  return render_template('vecaku_pieteikums.html')

@app.route('/IIC')
def centrs():
  return render_template('IIC.html')

@app.route('/registret_IIC',methods=['POST'])
def regIIC():
  print ("ParbaudeParbaude")
  with open("dati/regi.json", "r", encoding='utf-8') as f:
    dati = json.loads(f.read())
  jaunsIIC= json.loads(request.data)
  print ("Parbaude")
  for d in dati:
    if d["klubs"]==jaunsIIC["klubs"]:
      #d["forma"]=render_template("forma.html")
      atbilde={"statuss":"Šī IIC jau ir reģistrēta"}
      atbilde["pulcins"]=render_template('pulcina_info.html')
      return jsonify(atbilde)

  dati.append(jaunsIIC)

  with open("dati/regi.json", "w", encoding='utf-8') as f:
    f.write(json.dumps(dati))

  atbilde={"statuss":"IIC veiksmīgi piereģistrēta"}
  atbilde["pulcins"]=render_template('pulcina_info.html')
  return jsonify(atbilde)

  atbilde={"statuss":"IIC veiksmīgi piereģistrēta"}
  atbilde["pulcins"]=render_template('pulcina_info.html')
  return jsonify(atbilde)

if __name__ == "__main__":
  app.run("0.0.0.0", debug=True)
