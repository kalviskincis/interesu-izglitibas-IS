from flask import Flask, json, jsonify, render_template, request

app = Flask(__name__)
app.config['JSON_AS_ASCII']=False


@app.route('/')
def index():
  return render_template('index.html')

@app.route('/skolenu_izvelne')
def skIzvele():
  return render_template('skolenu_izvelne.html')

@app.route('/IIC')
def iic():
  return render_template('IIC.html')  
  
@app.route('/vecaku_pietekumus')
def vPieteikums():
  return render_template('vecaku_pieteikums.html')

@app.route('/jauns_pulcins')
def jaunsPulcins():
  return render_template('pulcina_info.html')

@app.route('/pulcinu_saraksts')
def pulcinuSaraksts():
  return render_template('pulcinu_saraksts.html')

@app.route('/registret_IIC')
def regIIC():
  return 10

@app.route('/api/visipulcini', methods=['GET'])
def visi():
  with open('dati/pulcini.json', 'r') as f:
    dati = json.loads(f.read())
  
  return jsonify(dati)

@app.route('/api/jaunsPulcins', methods=['POST'])
def pievienot():
  with open('dati/pulcini.json', 'r', encoding='utf-8') as f:
    dati = json.loads(f.read())

  pedejaisID = dati[-1]['id']
  jaunsID = pedejaisID+1
  
  jauns = json.loads(request.data)
  jauns['id'] = jaunsID
  dati.append(jauns)

  with open('dati/pulcini.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(dati))
  
  return '1'
  

@app.route('/api/dzestPulcinu/<id>', methods=['POST'])
def dzest(id):
  with open('dati/pulcini.json', 'r', encoding='utf-8') as f:
    dati = json.loads(f.read())
  
  jauniDati = []
  for katrs in dati:
    if str(katrs['id']) != id:
      jauniDati.append(katrs)
  
  with open('dati/pulcini.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(jauniDati))

  return '1'
  
  


if __name__ == "__main__":
   app.run("0.0.0.0", debug=True)