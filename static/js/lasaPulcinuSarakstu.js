async function labotPulcinuA(pulcins) {
    fetch('/api/visipulcini')
    .then(res => res.json())
    .then(data => { ieliktTabula(data); })
}


// funkcija pulciņa lauku nolasīšanai un atvēršanai labošanas skatā.
async function labotPulcinu(pulcins) {    
    // var pulcins = element.parentNode.parentNode.rowIndex-1;
    let request = await fetch('/api/atvertlabosanai/'+pulcins ,
    {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
    });
    let pulcDati = await request.json();
    // ielasitDatus(pulcDati);
    
    // console.log(pulcDati);
    

    
    var pulcinaInfoLapa = window.open("/labot_pulcinu/"+pulcins);

    
    pulcinaInfoLapa.onload = function () {                   
        
        var nedela = {"pirmdiena": "pirmdiena", "otrdiena": "otrdiena", "trešdiena": "tresdiena", "ceturtdiena": "ceturtdiena", "piektdiena": "piektdiena", "sestdiena": "sestdiena", "svētdiena": "svetdiena"};        
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
    var pulcinaInfoLapa = window.open("/labot_pulcinu/"+pulcins.id);
    pulcinaInfoLapa.dati = pulcins;
    let pulcinaForma = pulcinaInfoLapa.getElementById("forma");
    pulcinaForma.nosaukums.value = pulcins.nosaukums;

}

async function dzestPulcinu(pulcins) {
    if (confirm('Dzēst?'))
    {
        let request = await fetch('/api/dzestPulcinu/'+pulcins ,
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

