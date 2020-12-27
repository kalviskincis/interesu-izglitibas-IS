// funkcija pulciņa lauku nolasīšanai un atvēršanai labošanas skatā.
// lauku nolasīšana strādā, atvēršana strādā, bet dati tur nenonāk.
function labotPulcinu(element) {
    var nedela = {1: "pirmdiena", 2: "otrdiena", 3: "tresdiena", 4: "ceturtdiena", 5: "piektdiena", 6: "sestdiena", 7: "svetdiena"};
    var rinda = element.parentNode.parentNode.rowIndex-1;
    var pulcinaInfoLapa = window.open("fake_pulcina_info.html");
    pulcinaInfoLapa.onload = function () { 
        this.joma.value = pulcDati[rinda].joma;        
        this.nosaukums.value = pulcDati[rinda].nosaukums;        
        this.stunduSkaits.value = pulcDati[rinda].stunduSkaits;
        this.vecumsNo.value = pulcDati[rinda].no;
        this.vecumsLidz.value = pulcDati[rinda].lidz;
        this.skolotajs.value = pulcDati[rinda].skolotajs;
        this.epasts.value = pulcDati[rinda].epasts;
        this.talrunis.value = pulcDati[rinda].talrunis;
        this.adrese.value = pulcDati[rinda].adrese;
        this.maxAudzekni.value = pulcDati[rinda].maxAudzekni;
        for (let j = 0; j < pulcDati[rinda].laiks.length; j++) {
            var dienasNr = pulcDati[rinda].laiks[j].diena;
            var diena = nedela.dienasNr;
            console.log(nedela);
            var no = pulcDati[rinda].laiks[j].no;
            var lidz = pulcDati[rinda].laiks[j].lidz;             
        }
    };
}

function dzestPulcinu(pulcins) {
    // funkcija izdzēsīs ierakstu un vēlreiz nolasīs datus tabulā
    // varbūt tad fetch jāliek kā funkcija.
}

function ieliktTabula(visiPulcini) {
    pulcDati = visiPulcini;
    let tabulasBody = document.getElementById("tbody");
    let rinda;
    let laiks = "";
    for (let i = 0; i < visiPulcini.length; i++) {
        iDati = i;
        rinda = "<tr><td id=\"" + i + "\">" + (i + 1);        
        rinda += "</td><td><input type=\"button\" class=\"btn btn-primary\" onclick=\"labotPulcinu(this)\" value=\"✎\" data-toggle=\"tooltip\" title=\"Labot\">&nbsp; <input type=\"button\" class=\"btn btn-primary\" value=\"✘\" onclick=\"dzestPulcinu(visiPulcini[i])\" data-toggle=\"tooltip\" title=\"Dzēst\"></td><td name=\"joma\" id=\"joma\">";
        rinda += visiPulcini[i].joma + "</td><td name=\"nosaukums\" id=\"nosaukums\">" +
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
        rinda += laiks + "</td></tr>";
        tabulasBody.innerHTML += rinda;
    }
}


fetch(' https://kalviskincis.github.io/interesu-izglitibas-IS/pulcini.json')
    .then(res => res.json())
    .then(data => { ieliktTabula(data); })
