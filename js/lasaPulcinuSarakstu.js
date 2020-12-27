function labotPulcinu(x) {
    window.alert("Row index is: " + x.rowIndex);
    var i = document.getElementById(0).id;
    console.log(i);
    console.log(pulcDati[i]);
}

function atvertPulcinu() {

    var pulcinaInfoLapa = window.open("pulcina_info.html");
    pulcinaInfoLapa.onload = function() {
        pulcinaInfoLapa.joma.value=document.getElementsByName("joma").value;
        pulcinaInfoLapa.nosaukums.value=document.getElementsByName("nosaukums").value;
        window.alert(document.getElementById("joma").value);
    };
// funkcija nolasīs padotā pulciņa laukus un atvērs pulcina_info.html skatu ar datiem
}

function dzestPulcinu(pulcins) {
// funkcija izdzēsīs ierakstu un vēlreiz nolasīs datus tabulā
// varbūt tad fetch jāliek kā funkcija.
}

function ieliktTabula(visiPulcini) {
    pulcDati = visiPulcini;
    let tabulasBody = document.getElementById("tbody");
    let rinda;
    let laiks="";
    for (let i = 0; i < visiPulcini.length; i++) {  
        iDati = i;      
        rinda = "<tr><td id=\""+i+"\">" + (i+1);        
        rinda += "</td><td><input type=\"button\" class=\"btn btn-primary\" value=\"✎\" onclick=\"labotPulcinu(this)\" data-toggle=\"tooltip\" title=\"Labot\">&nbsp; <input type=\"button\" class=\"btn btn-primary\" value=\"✘\" onclick=\"dzestPulcinu(visiPulcini[i])\" data-toggle=\"tooltip\" title=\"Dzēst\"></td><td name=\"joma\" id=\"joma\">";        
        console.log(rinda);
        // rinda = "<tr><td><big><a href=\"javascript:\" onclick=\"labotPulcinu(visiPulcini[i])\" data-toggle=\"tooltip\" title=\"Labot\" >✎</a> &nbsp; <a href=\"javascript:\" onclick=\"dzestPulcinu(visiPulcini[i])\" data-toggle=\"tooltip\" title=\"Dzēst\">✘</a> </big></td><td name=\"joma\" id=\"joma\">";
        rinda += visiPulcini[i].joma + "</td><td name=\"nosaukums\" id=\"nosaukums\">" +
            visiPulcini[i].nosaukums + "</td><td>" +
            visiPulcini[i].stunduSkaits + "</td><td>" +
            visiPulcini[i].vecums.no + "—" + visiPulcini[i].vecums.lidz + "</td><td>" +
            visiPulcini[i].skolotajs + "</td><td>" +
            visiPulcini[i].epasts + "</td><td>" +
            visiPulcini[i].talrunis + "</td><td>" +
            visiPulcini[i].adrese + "</td><td>" +
            visiPulcini[i].maxAudzekni + "</td><td>";
            for (let j=0; j<visiPulcini[i].laiks.length; j++) {
                //console.log(visiPulcini[i].laiks[j].diena, visiPulcini[i].laiks[j].no, visiPulcini[i].laiks[j].lidz);
                laiks += visiPulcini[i].laiks[j].diena + ": " + visiPulcini[i].laiks[j].no + "—" + visiPulcini[i].laiks[j].lidz + "<br>";
                //console.log(laiks);
            }
            rinda += laiks + "</td></tr>";
        tabulasBody.innerHTML += rinda;
    }
}


fetch(' https://kalviskincis.github.io/interesu-izglitibas-IS/pulcini.json')
    .then(res => res.json())
    .then(data => {ieliktTabula(data); })


$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});