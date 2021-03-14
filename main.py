from flask import Flask, json, jsonify, render_template, request, send_from_directory

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

# routes uz failiem


@app.route('/dati/<path>')
def lasaFailu(path):
    return send_from_directory('dati', path)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/skolenu_izvelne')
def skIzvele():
    return render_template('skolenu_izvelne.html')


@app.route('/IIC')
def iic():
    return render_template('IIC.html')


@app.route('/vecaku_pieteikums')
def vPieteikums():
    return render_template('vecaku_pieteikums.html')

@app.route('/vecaku_pieteikums', methods=['POST'])
# jāparsauc rūte
def jaunsPieteikums():
    with open("dati/vecPietGatavs.json", "r", encoding='utf-8') as f:
        dati = json.loads(f.read())

    # ielasām ienākošos datus un pārvēršam par json
    jaunsPieteikums = json.loads(request.data)
    # šeit vajadzētu veikt pārbaudi vai ir visi nepieciešamie dati
    if len(jaunsPieteikums) < 13:
        return jsonify("Aizpildiet visus laukus!")
    # pievienojam jauno pieteikumu pie datiem
    dati.append(jaunsPieteikums)
    # ierakstam atjaunotos datus atpakaļ datnē
    with open("dati/vecPietGatavs.json", "w", encoding='utf-8') as f:
        # šeit nevar izmantot jsonify, jo rakstām datnē nevis atgriežam no Flask
        f.write(json.dumps(dati))
    # atgriežam jauno ID
    return jsonify(jaunsPieteikums)


@app.route('/jauns_pulcins', methods=['POST'])
def jaunsPulcins():
    nosaukums = json.loads(request.data)
    atbilde = {}    
    atbilde['iic'] = nosaukums['iicnosaukums']    
    atbilde["pulcins"] = render_template('pulcina_info.html')    
    return jsonify(atbilde)


@app.route('/labot_pulcinu/<id>')
def labotPulcinu(id):
    return render_template('pulcina_info.html')


@app.route('/pulcinu_saraksts')
def pulcinuSaraksts():
    return render_template('pulcinu_saraksts.html')


@app.route('/registret_IIC', methods=['POST'])
def regIIC():
    with open("dati/iic.json", "r", encoding='utf-8') as f:
        dati = json.loads(f.read())
    jaunsIIC = json.loads(request.data)    
    for d in dati:
        print(d)
        if d["iicnosaukums"] == jaunsIIC["iicnosaukums"]:            
            atbilde = {"statuss": "Šī IIC jau ir reģistrēta"}
            atbilde["pulcins"] = render_template('pulcina_info.html')
            return jsonify(atbilde)

    
    pedejaisID = dati[-1]['id']
    jaunsID = pedejaisID+1
    
    jaunsIIC['id'] = jaunsID
    
    dati.append(jaunsIIC)

    with open("dati/iic.json", "w", encoding='utf-8') as f:
        f.write(json.dumps(dati))

    atbilde = {"statuss": "IIC veiksmīgi piereģistrēta"}
    atbilde["iic"] = jaunsIIC["iicnosaukums"]
    atbilde["pulcins"] = render_template('pulcina_info.html')    
    return jsonify(atbilde)


@app.route('/api/iicnosaukumi', methods=['GET'])
def nosaukumi():
    with open('dati/pulcini.json', 'r', encoding='utf-8') as f:
        dati = json.loads(f.read())

    return jsonify(dati)


@app.route('/api/visipulcini', methods=['GET'])
def visi():
    with open('dati/pulcini.json', 'r', encoding='utf-8') as f:
        dati = json.loads(f.read())

    return jsonify(dati)

@app.route('/api/izveletiPulcini/', methods=['POST'])
def atlasiti():
    filtrs = json.loads(request.data)    
    with open('dati/pulcini.json', 'r', encoding='utf-8') as f:
        visiPu = json.loads(f.read())

    atlasitie = list(visiPu)
    for katrs in visiPu:
        if filtrs['joma'] != '---' and katrs['joma'] != filtrs['joma']:
            atlasitie.remove(katrs)
        elif filtrs['vecums'] != '---' and int(filtrs['vecums']) not in range(int(katrs['vecums']['no']),int(katrs['vecums']['lidz'])+1):
            atlasitie.remove(katrs)

        # print(atlasitie)
    
    return jsonify(atlasitie)


@app.route('/api/atvertlabosanai/<id>', methods=['POST'])
def atverVienu(id):
    with open('dati/pulcini.json', 'r', encoding='utf-8') as f:
        dati = json.loads(f.read())

    labojamais = ''
    for katrs in dati:
        if str(katrs['id']) == id:
            labojamais = katrs

    labojamais['lapa'] = render_template('pulcina_info.html')
    return jsonify(labojamais)    


@app.route('/api/jaunsPulcins', methods=['POST'])
def pievienot():
    with open('dati/pulcini.json', 'r', encoding='utf-8') as f:
        dati = json.loads(f.read())

    pedejaisID = dati[-1]['id']
    jaunsID = pedejaisID+1
    jauns = json.loads(request.data)

    with open('dati/iic.json', 'r', encoding='utf-8') as f:
        pulcini = json.loads(f.read())
    for d in pulcini:
        if d['iicnosaukums'] == jauns['iicnosaukums']:
            jauns['iicID'] = d['id']

    if jauns['id'] == -1:
        jauns['id'] = jaunsID
        dati.append(jauns)
    else:
        id = jauns['id']-1
        dati[id].update(jauns)

    
    with open('dati/pulcini.json', 'w', encoding='utf-8') as f:
        f.write(json.dumps(dati))

    return '1881'


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
