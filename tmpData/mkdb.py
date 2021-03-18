import sqlite3, json

conn = sqlite3.connect('iiiis.db')
c = conn.cursor()

c.execute('CREATE TABLE IF NOT EXISTS iic (adrese TEXT, epasts TEXT, iicID INTEGER PRIMARY KEY, klubs TEXT, specialists TEXT, talrunis TEXT)')
iic_json = json.load(open('tmpData/iic.json'))
iic_kolonnas = ['adrese', 'epasts', 'iicID', 'klubs', 'specialists', 'talrunis']
for data in iic_json:
    dati = tuple(data[c] for c in iic_kolonnas)
    c.execute('INSERT INTO Iic values (?,?,?,?,?,?)', dati)

c.execute('CREATE TABLE IF NOT EXISTS skolotaji (epasts TEXT, skolotID INTEGER PRIMARY KEY, skolotajs TEXT, talrunis TEXT)')
skol_json = json.load(open('tmpData/skolotajuTabula.json'))
skol_kolonnas = ['epasts', 'skolotID', 'skolotajs', 'talrunis']
for data in skol_json:
    dati = tuple(data[c] for c in skol_kolonnas)
    c.execute('INSERT INTO skolotaji values (?,?,?,?)', dati)

c.execute('CREATE TABLE IF NOT EXISTS laiks (id INTEGER PRIMARY KEY AUTOINCREMENT, adrese TEXT, diena TEXT, lidz TEXT, no TEXT, pulcID INTEGER, skolotID INTEGER)')
laiks_json = json.load(open('tmpData/laikaTabula.json'))
laiks_kolonnas = ['id', 'adrese', 'diena', 'lidz', 'no', 'pulcID', 'skolotID']
for data in laiks_json:
    dati = tuple(data[c] for c in laiks_kolonnas)
    c.execute('INSERT INTO laiks values (?,?,?,?,?,?,?)', dati)

c.execute('CREATE TABLE IF NOT EXISTS pulcini (joma TEXT, maxAudzekni INTEGER, nosaukums TEXT, pulcID INTEGER PRIMARY KEY, skolotID INTEGER, iicID INTEGER, stunduSkaits INTEGER, vecumslidz INTEGER, vecumsno INTEGER)')
pulc_json = json.load(open('tmpData/pulcTabula.json'))
pulc_kolonnas = ['joma', 'maxAudzekni', 'nosaukums', 'pulcID', 'skolotID', 'iicID', 'stunduSkaits', 'vecumslidz', 'vecumsno']
for data in pulc_json:
    dati = tuple(data[c] for c in pulc_kolonnas)
    c.execute('INSERT INTO pulcini values (?,?,?,?,?,?,?,?,?)', dati)


c.execute('CREATE TABLE IF NOT EXISTS pieteikumi (pietID INTEGER PRIMARY KEY AUTOINCREMENT, pulcID INTEGER, dzimums TEXT, skAdrese TEXT, skEpasts TEXT, skKlase TEXT, skPerskods TEXT, skSkola TEXT, skTelefons TEXT, skUzvards TEXT, skVards TEXT, vecEpasts TEXT, vecTelefons TEXT, vecUzvards TEXT, vecVards TEXT)')
piet_json = json.load(open('tmpData/vecPietGatavs.json'))
piet_kolonnas = ['pulcID', 'dzimums', 'skAdrese', 'skEpasts', 'skKlase', 'skPerskods', 'skSkola', 'skTelefons', 'skUzvards', 'skVards', 'vecEpasts', 'vecTelefons', 'vecUzvards', 'vecVards']
for data in piet_json:
    dati = tuple(data[c] for c in piet_kolonnas)
    c.execute('INSERT INTO pieteikumi values (null, ?,?,?,?,?,?,?,?,?,?,?,?,?,?)', dati)

conn.commit()

c.close()
conn.close()