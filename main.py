from flask import Flask, json, jsonify, render_template, request, send_from_directory
import sqlite3

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


# @app.route('/vecaku_pieteikums')
# def vPieteikums():
#     return render_template('vecaku_pieteikums.html')

@app.route('/vecaku_pieteikums', methods=['POST'])
def jaunsPieteikums():
    jp = json.loads(request.data)

    conn = sqlite3.connect('iiiis.db')
    c = conn.cursor()
    c.execute('INSERT INTO pieteikumi (pulcID, dzimums, skAdrese, skEpasts, skKlase, skPerskods, skSkola, skTelefons, skUzvards, skVards, vecEpasts, vecTelefons, vecUzvards, vecVards) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [jp['pulcID'],jp['dzimums'],jp['skAdrese'],jp['skEpasts'],jp['skKlase'],jp['skPerskods'],jp['skSkola'],jp['skTelefons'],jp['skUzvards'],jp['skVards'],jp['vecEpasts'],jp['vecTelefons'],jp['vecUzvards'],jp['vecVards']])
    
    conn.commit()
    c.close()
    conn.close()

    return '1'


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
    jaunsIIC = json.loads(request.data)     
    
    conn = sqlite3.connect('iiiis.db')
    c = conn.cursor()

    nosaukums = jaunsIIC['iicnosaukums']
    c.execute('SELECT klubs FROM iic WHERE klubs=?', (nosaukums,))
    nos = c.fetchall()
    if len(nos)<1:    
        c.execute("INSERT INTO iic (adrese, epasts, iicID, klubs, specialists, talrunis) VALUES (?, ?, null, ?, ?, ?)", [jaunsIIC['adrese'], jaunsIIC['epasts'], jaunsIIC['iicnosaukums'], jaunsIIC['specialists'], jaunsIIC['talrunis']])
        conn.commit()
        c.close()
        conn.close()
        atbilde = {"statuss": "IIC veiksmīgi piereģistrēta"}
        atbilde["iic"] = jaunsIIC["iicnosaukums"]
        atbilde["pulcins"] = render_template('pulcina_info.html')
        return jsonify(atbilde)
    else:
        atbilde = {"statuss": "Šī IIC jau ir reģistrēta"}
        atbilde["pulcins"] = render_template('pulcina_info.html')
        return jsonify(atbilde)


@app.route('/api/iicnosaukumi', methods=['GET'])
def nosaukumi():
    
    conn = sqlite3.connect('iiiis.db')
    c = conn.cursor()
    c.execute('SELECT klubs FROM iic')
    rez = c.fetchall()
    conn.commit()
    c.close()
    conn.close()
    
    dati = []
    for katrs in rez:
        dati.append({"iicnosaukums": katrs[0]})        

    return jsonify(dati)


@app.route('/api/visipulcini', methods=['GET'])
def visi():   
    conn = sqlite3.connect('iiiis.db')
    c = conn.cursor()    
    c.execute('SELECT pulcini.pulcID, iic.klubs, pulcini.joma, pulcini.nosaukums, pulcini.stunduSkaits, pulcini.vecumsno, pulcini.vecumslidz, skolotaji.skolotajs, skolotaji.epasts, skolotaji.talrunis, iic.adrese,  pulcini.maxAudzekni,  laiks.diena, laiks.no, laiks.lidz FROM laiks INNER JOIN skolotaji ON laiks.skolotID=skolotaji.skolotID INNER JOIN pulcini ON pulcini.pulcID=laiks.pulcID LEFT JOIN iic ON pulcini.iicID=iic.iicID;')
    pulcRez = c.fetchall()
    

    virsraksti = ['id', 'iicnosaukums', 'joma','nosaukums', 'stunduSkaits', 'vecumsno', 'vecumslidz','skolotajs','epasts','talrunis','adrese','maxAudzekni','diena','no','lidz']

    dati = []
    for katrs in pulcRez:
        ieraksts = {}
        for i in range(len(virsraksti)):
            ieraksts[virsraksti[i]] = katrs[i]
        dati.append(ieraksts)      
   
    # c.execute("PRAGMA table_info(pulcini)")
    # pulcGalva = c.fetchall()
    # for katrs in pulcGalva:
    #     print(katrs[1])
    # print(pulcGalva)
     
    conn.commit()
    c.close()
    conn.close()

    return jsonify(dati)



@app.route('/api/izveletiPulcini/', methods=['POST'])
def atlasiti():
    filtrs = json.loads(request.data)    
    with open('dati/pulcini.json', 'r', encoding='utf-8') as f:
        visiPu = json.loads(f.read())

    conn = sqlite3.connect('iiiis.db')
    c = conn.cursor()    
    c.execute('SELECT pulcini.pulcID, iic.klubs, pulcini.joma, pulcini.nosaukums, pulcini.stunduSkaits, pulcini.vecumsno, pulcini.vecumslidz, skolotaji.skolotajs, skolotaji.epasts, skolotaji.talrunis, iic.adrese,  pulcini.maxAudzekni,  laiks.diena, laiks.no, laiks.lidz FROM laiks INNER JOIN skolotaji ON laiks.skolotID=skolotaji.skolotID INNER JOIN pulcini ON pulcini.pulcID=laiks.pulcID LEFT JOIN iic ON pulcini.iicID=iic.iicID;')
    virsraksti = ['id', 'iicnosaukums', 'joma','nosaukums', 'stunduSkaits', 'vecumsno', 'vecumslidz','skolotajs','epasts','talrunis','adrese','maxAudzekni','diena','no','lidz']
    visiPu = c.fetchall() 
    
    dati = []
    for katrs in visiPu:
        ieraksts = {}
        for i in range(len(virsraksti)):
            ieraksts[virsraksti[i]] = katrs[i]
        dati.append(ieraksts)    
    
    # print(filtrs)
    atlasitie = list(dati)

    for katrs in dati:
        if filtrs['joma'] != '---' and katrs['joma'] != filtrs['joma']:            
            atlasitie.remove(katrs)
        elif filtrs['vecums'] != '---' and int(filtrs['vecums']) not in range(int(katrs['vecumsno']),int(katrs['vecumslidz'])+1):
            atlasitie.remove(katrs)

    # print(atlasitie)

    conn.commit()
    c.close()
    conn.close()
    
    return jsonify(atlasitie)


@app.route('/api/atvertlabosanai/<id>', methods=['POST'])
def atverVienu(id):  
    conn = sqlite3.connect('iiiis.db')
    c = conn.cursor()

    c.execute('SELECT pulcini.pulcID, iic.klubs, pulcini.joma, pulcini.nosaukums, pulcini.stunduSkaits, pulcini.vecumsno, pulcini.vecumslidz, skolotaji.skolotajs, skolotaji.epasts, skolotaji.talrunis, iic.adrese,  pulcini.maxAudzekni,  laiks.diena, laiks.no, laiks.lidz FROM laiks INNER JOIN skolotaji ON laiks.skolotID=skolotaji.skolotID INNER JOIN pulcini ON pulcini.pulcID=laiks.pulcID LEFT JOIN iic ON pulcini.iicID=iic.iicID;')
    pulcRez = c.fetchall()    

    virsraksti = ['id', 'iicnosaukums', 'joma','nosaukums', 'stunduSkaits', 'vecumsno', 'vecumslidz','skolotajs','epasts','talrunis','adrese','maxAudzekni','diena','no','lidz']

    dati = []
    for katrs in pulcRez:
        ieraksts = {}
        for i in range(len(virsraksti)):
            ieraksts[virsraksti[i]] = katrs[i]
        dati.append(ieraksts)

    # te vajag ierakstīšanas query  

    conn.commit()
    c.close()
    conn.close()
    

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
    conn = sqlite3.connect('iiiis.db')
    c = conn.cursor()
    c.execute("DELETE FROM pulcini WHERE pulcID = ?", id)
    c.execute("DELETE FROM laiks WHERE pulcID = ?", id)
    conn.commit()
    c.close()
    conn.close()

    return '1'


if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)
