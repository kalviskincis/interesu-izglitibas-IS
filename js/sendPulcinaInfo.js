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
        laiks.push({ diena: 1, no: pirmdienaNo, lidz: pirmdienaLidz })
    }
    if (otrdienaNo != "none") {
        laiks.push({ diena: 2, no: otrdienaNo, lidz: otrdienaLidz })
    }

    if (tresdienaNo != "none") {
        laiks.push({ diena: 3, no: tresdienaNo, lidz: tresdienaLidz })
    }
    if (ceturtdienaNo != "none") {
        laiks.push({ diena: 4, no: ceturtdienaNo, lidz: ceturtdienaLidz })
    }
    if (piektdienaNo != "none") {
        laiks.push({ diena: 5, no: piektdienaNo, lidz: piektdienaLidz })
    }
    if (sestdienaNo != "none") {
        laiks.push({ diena: 6, no: sestdienaNo, lidz: sestdienaLidz })
    }
    if (svetdienaNo != "none") {
        laiks.push({ diena: 7, no: svetdienaNo, lidz: svetdienaLidz })
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

    fetch('https://kalviskincis.github.io/interesu-izglitibas-IS/views/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dict)
    })
        .then(res => res.json())
        .then(data => document.getElementById("saglabats").innerHTML = "Dati saglabāti")

}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

