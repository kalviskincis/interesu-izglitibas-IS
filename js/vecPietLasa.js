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

     // .then(data => document.getElementById("top").innerHTML = data.value)
 