function ieliktTekstu(jsonTxt){
    let nosaukums=document.getElementById("nosaukums");
    //let i=Math.floor(Math.random() * 10);
    let rinda="<tr><td>"+jsonTxt[0].nosaukumsIIC+"</td> </tr>"+
     "<tr> <td> Vadītājs " +jsonTxt[0].direktorsIIC+"</td></tr>"+
     "<tr> <td> Tel: "+jsonTxt[0].IICTel+" E-pasts: "+jsonTxt[0].IICEpasts+"</td></tr>";
     nosaukums.innerHTML=rinda;
}
fetch('https://kalviskincis.github.io/interesu-izglitibas-IS/views/vecaku_pieteikums.txt')
      .then(res => res.json())
      .then(json=>{console.log(json);ieliktTekstu(json);})

     // .then(data => document.getElementById("top").innerHTML = data.value)
 