function ieliktTekstu(jsonTxt){
    let nosaukums=document.getElementById("nosaukumsIIC");
    let i=Math.floor(Math.random() * 10);
    let nosrinda=jsonTxt[i].nosaukumsIIC;
    nosaukums.innerHTML="<p>"+nosrinda+"</p>";
    nosaukums=document.getElementById("direktors");
    nosrinda="Vadītājs "+jsonTxt[i].direktorsIIC;
    nosaukums.innerHTML="<p>"+nosrinda+"</p>";
    nosaukums=document.getElementById("telIIC");
    nosrinda=`Tel: ${jsonTxt[i].IICTel} E-pasts: ${jsonTxt[i].IICEpasts}`;
    nosaukums.innerHTML="<p>"+nosrinda+"</p>";
}
fetch('https://kalviskincis.github.io/interesu-izglitibas-IS/views/vecaku_pieteikums.txt')
      .then(res => res.json())
      .then(json=>{console.log(json);ieliktTekstu(json);})

     // .then(data => document.getElementById("top").innerHTML = data.value)
 