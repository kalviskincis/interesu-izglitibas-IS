  function registracija(){
    var adrese=document.getElementById("Adrese").value;
    var epasts=document.getElementById("Epasts").value;
    var talrunis=document.getElementById("Talrunis").value;
    var specialists=document.getElementById("Specialists").value;
    var klubs=document.getElementById("Nosaukums").value;
    if(adrese==""||epasts==""||talrunis==""||specialists=="") alert("Visiem laukiem jābūt aizpildītājiem");
    else{
    var dict={adrese:adrese, epasts:epasts, talrunis:talrunis, specialists:specialists, klubs:klubs};
    console.log(JSON.stringify(dict));
    fetch('https://interesu-izglitibas-IS.oksanaivanova1.repl.co/registret_IIC', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(dict)
      })
      .then(atb=>atb.json())
      .then(response => {
        console.log(response);
        document.getElementById("iicsaturs").style="display:none";
        document.getElementById("statuss").innerHTML=response.statuss;
        document.getElementById("pulcins").innerHTML=response.pulcins;
              
    });
   }
}
