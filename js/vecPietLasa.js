function ieliktTekstu(jsonTxt){
    let nosaukums=document.getElementById("nosaukums");
    let i=Math.floor(Math.random() * 10);
    if(i>=9){i=0;};
    let rinda="<tr><td>"+jsonTxt[i].nosaukumsIIC+"</td> </tr>"+
     "<tr> <td> Vadītājs " +jsonTxt[i].direktorsIIC+"</td></tr>"+
     "<tr> <td> Tel: "+jsonTxt[i].IICTel+" E-pasts: "+jsonTxt[i].IICEpasts+"</td></tr>";
     nosaukums.innerHTML=rinda;
     let nosIzvele=document.getElementById("izvele");
     let rinda2="<tr><td> interešu izglītības programmas  - "+jsonTxt[i].jomasNos+" - pulciņā - " + 
     jsonTxt[i].pulcinaNosaukums +" - </tr></td> <tr><td> pie pedagoga "+
     jsonTxt[i].skolotajaVards +" "+jsonTxt[i].skolotajaUzvards+". </td></tr>";
     nosIzvele.innerHTML=rinda2;
}
fetch('https://kalviskincis.github.io/interesu-izglitibas-IS/views/vecaku_pieteikums.txt')
      .then(res => res.json())
      .then(json=>{console.log(json);ieliktTekstu(json);})

function vecPietRegistree(){
        var vecVards=document.getElementById("vec_vards").value;
        var vecUzvards=document.getElementById("vec_uzvards").value;
        var vecEpasts=document.getElementById("vec_epasts").value;
        var vecTelefons=document.getElementById("vec_telefons").value;
        var dzimums=document.form.getElementById("berns").value;
        var skVards=document.getElementById("sk_vards").value;
        var skUzvards=document.getElementById("sk_uzvards").value;
        var skSkola=document.getElementById("sk_skola").value;
        var skKlase=document.getElementById("sk_klase").value;
        var skPerskods=document.getElementById("sk_perskods").value;
        var skAdrese=document.getElementById("sk_adrese").value;
        var skEpasts=document.getElementById("sk_epasts").value;
        var skTelefons=document.getElementById("sk_telefons").value;
        var noteikumi=document.getElementById("not_ja").value;
        if(vecVards==""||vecUzvards==""||vecTelefons==""||vecEpasts==""||
        skVards==""||skUzvards==""||skSkola==""||skKlase==""||skPerskods==""||
        skAdrese==""||skEpasts==""||skTelefons==""&&noteikumi=="Ja") alert("Visiem laukiem jābūt aizpildītājiem");
        else{
        var dict={vecVards:vecVards, vecUzvards:vecUzvards, vecEpasts:vecEpasts, vecTelefons:vecTelefons,
            dzimums:dzimums, skVards:skVards, skUzvards:skUzvards, skSkola:skSkola, skKlase:skKlase,
            skPerskods:skPerskods, skAdrese:skAdrese, skEpasts:skEpasts, skTelefons:skTelefons};
           
            //console.log(JSON.stringify(dict));
            jsonData = JSON.stringify(dict);
            console.log(jsonData);
            download(jsonData, 'vecakuPieteikumsSuutiit.txt', 'text/plain');

        fetch('https://kalviskincis.github.io/interesu-izglitibas-IS/views/vecakuPieteikumsSuutiit.txt', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(dict)
        })
            .then(res => res.json())
            .then(data => document.getElementById("zinojumi").innerHTML = "Dati saglabāti")
       }

    }