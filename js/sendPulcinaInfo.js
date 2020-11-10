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

    var dict = {
        joma: joma, nosaukums: nosaukums, stunduSkaits: stunduSkaits,
        vecumsNo: vecumsNo, vecumsLidz: vecumsLidz,
        skolotajs: skolotajs, epasts: epasts, talrunis: talrunis, adrese: adrese, maxAudzekni: maxAudzekni

    };
    if (pirmdienaNo != "none") {
        dict["pirmdienaNo"] = pirmdienaNo;
        dict["pirmdienaLidz"] = pirmdienaLidz;
    }
    if (otrdienaNo != "none") {
        dict["otrdienaNo"] = otrdienaNo;
        dict["otrdienaLidz"] = otrdienaLidz;
    }
    if (tresdienaNo != "none") {
        dict["tresdienaNo"] = tresdienaNo;
        dict["tresdienaLidz"] = tresdienaLidz;
    }
    if (ceturtdienaNo != "none") {
        dict["ceturtdienaNo"] = ceturtdienaNo;
        dict["ceturtdienaLidz"] = ceturtdienaLidz;
    }
    if (piektdienaNo != "none") {
        dict["piektdienaNo"] = piektdienaNo;
        dict["piektdienaLidz"] = piektdienaLidz;
    }
    if (sestdienaNo != "none") {
        dict["sestdienaNo"] = sestdienaNo;
        dict["sestdienaLidz"] = sestdienaLidz;
    }
    if (svetdienaNo != "none") {
        dict["svetdienaNo"] = svetdienaNo;
        dict["svetdienaLidz"] = svetdienaLidz;
    }

    jsonData = JSON.stringify(dict)
    console.log(jsonData);

    download(jsonData, 'json.txt', 'text/plain');



}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
