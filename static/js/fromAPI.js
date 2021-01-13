function ieliktTabula(jsonTxt, veids){
    let tabulasBody=document.getElementById("tbody");
    let rinda;
    for(let i=0;i<jsonTxt.length;i++){
        // ciklā veido jaunu tabulas rindu ar 6 elementiem
        // ar + sakabinot kopā tagus un datus
        rinda="<tr class=" + veids + "><td>"+
        jsonTxt[i].id + "</td><td>" +
        jsonTxt[i].nosaukums + "</td><td>" +
        jsonTxt[i].tips + "</td><td>" +
        jsonTxt[i].apakstips + "</td><td>" +
        jsonTxt[i].skaits + "</td><td>" +
        jsonTxt[i].komentari +
        "</td></tr>";
        // jauno tabulas rindu pievieno jau esošajām
        tabulasBody.innerHTML+=rinda;
    }
}


fetch(' https://kalviskincis.github.io/interesu-izglitibas-IS/vielas.txt')
.then(res=>res.json())
.then(json=>{console.log(json);ieliktTabula(json,"viela");})

fetch('https://pytonc.eu.pythonanywhere.com/api/v1/inventars')
.then(atb=>atb.json())
.then(masivs=>{console.log(masivs);ieliktTabula(masivs,"aprikojums");})