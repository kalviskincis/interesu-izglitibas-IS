function ieliktTekstu(jsonTxt){
    let nosaukums=document.getElementById("nosaukumsIIC");
    //let i=Math.floor(Math.random() * 10);
    let rinda=`<tr><td>${jsonTxt[2].nosaukumsIIC}</td> </tr>
     <tr> <td>Vadītājs ${jsonTxt[2].direktorsIIC}</td></tr>
     <tr> <td>${`Tel: ${jsonTxt[2].IICTel} E-pasts: ${jsonTxt[2].IICEpasts}`}</td></tr>`;
     nosaukums.innerHTML=rinda;
}
fetch('https://kalviskincis.github.io/interesu-izglitibas-IS/views/vecaku_pieteikums.txt')
      .then(res => res.json())
      .then(json=>{console.log(json);ieliktTekstu(json);})

     // .then(data => document.getElementById("top").innerHTML = data.value)
 