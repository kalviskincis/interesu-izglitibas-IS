function ieliktTabula(visiPulcini) {
    let tabulasBody = document.getElementById("tbody");
    let rinda;
    let laiks="";
    for (let i = 0; i < visiPulcini.length; i++) {
        rinda = "<tr><td><input type=\"checkbox\" />    &nbsp;   </td><td>";   
        rinda += visiPulcini[i].joma + "</td><td>" +
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
    .then(data => { console.log(data[0].joma); ieliktTabula(data); })

