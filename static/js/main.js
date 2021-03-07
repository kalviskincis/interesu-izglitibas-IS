// no faila lasaPulcinuSarakstu.js

async function labotPulcinuA(pulcins) {
    fetch('/api/visipulcini')
        .then(res => res.json())
        .then(data => { ieliktTabula(data); })
}


// funkcija pulciņa lauku nolasīšanai un atvēršanai labošanas skatā.
async function labotPulcinu(pulcins) {
    // var pulcins = element.parentNode.parentNode.rowIndex-1;
    let request = await fetch('/api/atvertlabosanai/' + pulcins,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    let pulcDati = await request.json();
    // ielasitDatus(pulcDati);

    // console.log(pulcDati);



    var pulcinaInfoLapa = window.open("/labot_pulcinu/" + pulcins);


    pulcinaInfoLapa.onload = function () {

        var nedela = { "pirmdiena": "pirmdiena", "otrdiena": "otrdiena", "trešdiena": "tresdiena", "ceturtdiena": "ceturtdiena", "piektdiena": "piektdiena", "sestdiena": "sestdiena", "svētdiena": "svetdiena" };
        //this.id.value = pulcDati.id;
        this.joma.value = pulcDati.joma;
        this.joma.text = pulcDati.joma;
        this.nosaukums.value = pulcDati.nosaukums;
        this.stunduSkaits.value = pulcDati.stunduSkaits;
        this.vecumsNo.value = pulcDati.vecums.no;
        this.vecumsLidz.value = pulcDati.vecums.lidz;
        this.skolotajs.value = pulcDati.skolotajs;
        this.epasts.value = pulcDati.epasts;
        this.talrunis.value = pulcDati.talrunis;
        this.adrese.value = pulcDati.adrese;
        this.maxAudzekni.value = pulcDati.maxAudzekni;
        for (let j = 0; j < pulcDati.laiks.length; j++) {
            console.log(pulcDati.laiks[j]);
            //var diena = nedela.pulcDati.laiks[j].diena;
            //console.log(diena);

            var diena = pulcDati.laiks[j].diena;
            ddiena = nedela.diena;
            var no = pulcDati.laiks[j].no;
            var lidz = pulcDati.laiks[j].lidz;
            //console.log(ddiena, no, lidz);

        }
    };
}

function ielasitDatus(pulcins) {
    var pulcinaInfoLapa = window.open("/labot_pulcinu/" + pulcins.id);
    pulcinaInfoLapa.dati = pulcins;
    let pulcinaForma = pulcinaInfoLapa.getElementById("forma");
    pulcinaForma.nosaukums.value = pulcins.nosaukums;

}

async function dzestPulcinu(pulcins) {
    if (confirm('Dzēst?')) {
        let request = await fetch('/api/dzestPulcinu/' + pulcins,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

        let atbilde = await request.json();
        alert('Ieraksts izdzēsts');

        location.reload();
    }
}

function ieliktTabula(visiPulcini) {
    pulcDati = visiPulcini;
    let tabulasBody = document.getElementById("tbody");
    let pulcins;
    for (let i = 0; i < visiPulcini.length; i++) {
        let laiks = "";
        pulcins = "<tr><td id=\"" + visiPulcini[i].id + "\">";
        pulcins += visiPulcini[i].id;
        pulcins += "</td><td><input type=\"button\" class=\"btn btn-primary\" onclick=\"labotPulcinu(" + visiPulcini[i].id + ")\" value=\"✎\" data-toggle=\"tooltip\" title=\"Labot\">&nbsp; <input type=\"button\" class=\"btn btn-primary\" value=\"✘\" onclick=\"dzestPulcinu(" + visiPulcini[i].id + ")\" data-toggle=\"tooltip\" title=\"Dzēst\"></td><td name=\"joma\" id=\"joma\">";
        pulcins += visiPulcini[i].joma + "</td><td name=\"nosaukums\" id=\"nosaukums\">" +
            visiPulcini[i].nosaukums + "</td><td>" +
            visiPulcini[i].stunduSkaits + "</td><td>" +
            visiPulcini[i].vecums.no + "—" + visiPulcini[i].vecums.lidz + "</td><td>" +
            visiPulcini[i].skolotajs + "</td><td>" +
            visiPulcini[i].epasts + "</td><td>" +
            visiPulcini[i].talrunis + "</td><td>" +
            visiPulcini[i].adrese + "</td><td>" +
            visiPulcini[i].maxAudzekni + "</td><td>";
        for (let j = 0; j < visiPulcini[i].laiks.length; j++) {
            laiks += visiPulcini[i].laiks[j].diena + ": " + visiPulcini[i].laiks[j].no + "—" + visiPulcini[i].laiks[j].lidz + "<br>";
        }
        pulcins += laiks + "</td></tr>";
        tabulasBody.innerHTML += pulcins;
    }
}


fetch('/api/visipulcini')
    .then(res => res.json())
    .then(data => { ieliktTabula(data); })

// no faila registracija.js

function registracija() {
    var adrese = document.getElementById("Adrese").value;
    var epasts = document.getElementById("Epasts").value;
    var talrunis = document.getElementById("Talrunis").value;
    var specialists = document.getElementById("Specialists").value;
    var klubs = document.getElementById("iicnosauk").value;
    if (adrese == "" || epasts == "" || talrunis == "" || specialists == "") alert("Visiem laukiem jābūt aizpildītājiem");
    else {
        var dict = { adrese: adrese, epasts: epasts, talrunis: talrunis, specialists: specialists, klubs: klubs };
        console.log(JSON.stringify(dict));
        fetch('https://interesu-izglitibas-IS.nitobenito.repl.co/registret_IIC', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dict)
        })
    }
}

// no faila sendPulcinaInfo.js

async function nosutitPulcinaInfo() {
    var id = -1;
    var joma = document.forma.joma.value;
    var nosaukums = document.forma.nosaukums.value;
    var stunduSkaits = Number(document.forma.stunduSkaits.value);
    var vecumsNo = Number(document.forma.vecumsNo.value);
    var vecumsLidz = Number(document.forma.vecumsLidz.value);
    var skolotajs = document.forma.skolotajs.value;
    var epasts = document.forma.epasts.value;
    var talrunis = document.forma.talrunis.value;
    var adrese = document.forma.adrese.value;
    var maxAudzekni = Number(document.forma.maxAudzekni.value);

    var pirmdienaNo = document.forma.pirmdienaNo.value;
    var pirmdienaLidz = document.forma.pirmdienaLidz.value;
    var otrdienaNo = document.forma.otrdienaNo.value;
    var otrdienaLidz = document.forma.otrdienaLidz.value;
    var tresdienaNo = document.forma.tresdienaNo.value;
    var tresdienaLidz = document.forma.tresdienaLidz.value;
    var ceturtdienaNo = document.forma.ceturtdienaNo.value;
    var ceturtdienaLidz = document.forma.ceturtdienaLidz.value;
    var piektdienaNo = document.forma.piektdienaNo.value;
    var piektdienaLidz = document.forma.piektdienaLidz.value;
    var sestdienaNo = document.forma.sestdienaNo.value;
    var sestdienaLidz = document.forma.sestdienaLidz.value;
    var svetdienaNo = document.forma.svetdienaNo.value;
    var svetdienaLidz = document.forma.svetdienaLidz.value;

    var laiks = [];

    if (pirmdienaNo != "none") {
        laiks.push({ diena: "pirmdiena", no: pirmdienaNo, lidz: pirmdienaLidz })
    }
    if (otrdienaNo != "none") {
        laiks.push({ diena: "otrdiena", no: otrdienaNo, lidz: otrdienaLidz })
    }

    if (tresdienaNo != "none") {
        laiks.push({ diena: "trešdiena", no: tresdienaNo, lidz: tresdienaLidz })
    }
    if (ceturtdienaNo != "none") {
        laiks.push({ diena: "ceturtdiena", no: ceturtdienaNo, lidz: ceturtdienaLidz })
    }
    if (piektdienaNo != "none") {
        laiks.push({ diena: "piektdiena", no: piektdienaNo, lidz: piektdienaLidz })
    }
    if (sestdienaNo != "none") {
        laiks.push({ diena: "sestdiena", no: sestdienaNo, lidz: sestdienaLidz })
    }
    if (svetdienaNo != "none") {
        laiks.push({ diena: "svētdiena", no: svetdienaNo, lidz: svetdienaLidz })
    }

    var dict = {
        id: id, joma: joma, nosaukums: nosaukums, stunduSkaits: stunduSkaits,
        vecums: { no: vecumsNo, lidz: vecumsLidz },
        skolotajs: skolotajs, epasts: epasts, talrunis: talrunis, adrese: adrese, maxAudzekni: maxAudzekni
    };

    dict["laiks"] = laiks;


    var jsonData = JSON.stringify(dict)


    var request = await fetch('/api/jaunsPulcins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonData
    });


    var atbilde = await request.json();


    alert('Ieraksts saglabāts');
    window.setTimeout(atverSarakstu, 1000);



} // beigas

function atverSarakstu() {
    location.href = "/pulcinu_saraksts";
}

// no faila vecPietRegistree.js
function vecPietRegistree1() {
    var vecVards = document.getElementById("vec_vards").value;
    var vecUzvards = document.getElementById("vec_uzvards").value;
    var vecEpasts = document.getElementById("vec_epasts").value;
    var vecTelefons = document.getElementById("vec_telefons").value;
    var dzimums = document.getElementById("berns").value;
    var skVards = document.getElementById("sk_vards").value;
    var skUzvards = document.getElementById("sk_uzvards").value;
    var skSkola = document.getElementById("sk_skola").value;
    var skKlase = document.getElementById("sk_klase").value;
    var skPerskods = document.getElementById("sk_perskods").value;
    var skAdrese = document.getElementById("sk_adrese").value;
    var skEpasts = document.getElementById("sk_epasts").value;
    var skTelefons = document.getElementById("sk_telefons").value;

    if (vecVards == "" || vecUzvards == "" || vecTelefons == "" || vecEpasts == "" || skVards == "" || skUzvards == "" || skSkola == "" || skKlase == "" || skPerskods == "" || skAdrese == "" || skEpasts == "" || skTelefons == "")
        alert("Visiem laukiem jābūt aizpildītājiem")
    else
        if (document.getElementById('r1').checked == false) alert("Izlasi noteikumus!")
        else {
            var dict = {
                vecVards: vecVards, vecUzvards: vecUzvards, vecEpasts: vecEpasts, vecTelefons: vecTelefons,
                dzimums: dzimums, skVards: skVards, skUzvards: skUzvards, skSkola: skSkola, skKlase: skKlase,
                skPerskods: skPerskods, skAdrese: skAdrese, skEpasts: skEpasts, skTelefons: skTelefons
            };

            jsonData = JSON.stringify(dict);
            console.log(jsonData);
            if (document.getElementById('r1').checked)
                download(jsonData, 'vecakuPieteikumsSuutiit.txt', 'text/plain');
            alert("Visi dati veiksmīgi saglabāti")
        }
    fetch('https://kalviskincis.github.io/interesu-izglitibas-IS/views/vecakuPieteikumsSuutiit.txt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dict)
    })
        .then(res => res.json())
        .then(data => document.getElementById("zinojumi").innerHTML = "Dati saglabāti")

}


function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}


// no faila vecPietLasa.js -- Vai strādā? -- random ielasīšana ne.
async function lasitTekstu() {
    fetch('../dati/vecaku_pieteikums.txt')
        .then(res => res.json())
        .then(json => { console.log(json); ieliktTekstu(json); })
}

function ieliktTekstu(jsonTxt) {
    let nosaukums = document.getElementById("nosaukums");
    let i = Math.floor(Math.random() * 10);
    if (i >= 9) { i = 0; };
    let rinda = `<tr><td>${jsonTxt[i].nosaukumsIIC}</td> </tr> <tr> <td> Vadītājs: ${jsonTxt[i].direktorsIIC}</td></tr><tr> <td> Tel: ${jsonTxt[i].IICTel} E-pasts: ${jsonTxt[i].IICEpasts}</td></tr>`;
    nosaukums.innerHTML = rinda;
    let nosIzvele = document.getElementById("izvele");
    let rinda2 = "<tr><td> interešu izglītības programmas  - " + jsonTxt[i].jomasNos + " - pulciņā - " + jsonTxt[i].pulcinaNosaukums + " - </tr></td> <tr><td> pie pedagoga " + jsonTxt[i].skolotajaVards + " " + jsonTxt[i].skolotajaUzvards + ". </td></tr>";
    nosIzvele.innerHTML = rinda2;
}

// no datnes ieladetKategorijas.js
function ieladetJomas() {
    joma = ["---", "💃 Dejas", "🎼 Mūzika", "🎬 Teātra māksla", "⚽️ Sports", "🎨 Vizuālā māksla", "🔧 Tehniskā jaunrade", "🌿 Vides izglītība", "💻 Informācijas tehnoloģijas", "📚 Akadēmiskā izglītība", " ❗ Citas programmas"]
    for (var i = 0; i < joma.length; i++) {
        var option = document.createElement("option");
        option.value = joma[i];
        option.textContent = joma[i];
        document.getElementById("joma").appendChild(option);
    }
}