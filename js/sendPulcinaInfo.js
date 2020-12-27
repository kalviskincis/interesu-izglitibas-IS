function nosutitPulcinaInfo() {
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
        joma: joma, nosaukums: nosaukums, stunduSkaits: stunduSkaits,
        vecums: { no: vecumsNo, lidz: vecumsLidz },
        skolotajs: skolotajs, epasts: epasts, talrunis: talrunis, adrese: adrese, maxAudzekni: maxAudzekni
    };

    dict["laiks"] = laiks;


    jsonData = JSON.stringify(dict)
    console.log(jsonData);

    download(jsonData, 'json.txt', 'text/plain');

    // nākamās divas rindas šajā vietā ir tikai pagaidām, jo vispār tās dzīvo tur zemāk ar .then utt., 
    // be tā kā dati uz serveri nesūtas, tad nākamie .then nekad laikam neizpildās, tātad f-jas nestrādā.
    // Tāpēc iemānīts šeit.
    window.alert("Dati saglabāti");
    location.href="pulcinu_saraksts.html"
    // Mānīšanās beigas

    
    fetch('https://kalviskincis.github.io/interesu-izglitibas-IS/views/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dict)
    })
        .then(res => res.json())
        .then(data => document.getElementById("saglabats").innerHTML = "Dati saglabāti")
        .then(data => location.href="pulcinu_saraksts.html")

}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

