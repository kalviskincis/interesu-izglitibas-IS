function vecPietRegistree1(){
    var vecVards=document.getElementById("vec_vards").value;
    var vecUzvards=document.getElementById("vec_uzvards").value;
    var vecEpasts=document.getElementById("vec_epasts").value;
    var vecTelefons=document.getElementById("vec_telefons").value;
    var dzimums=document.getElementById("berns").value;
    var skVards=document.getElementById("sk_vards").value;
    var skUzvards=document.getElementById("sk_uzvards").value;
    var skSkola=document.getElementById("sk_skola").value;
    var skKlase=document.getElementById("sk_klase").value;
    var skPerskods=document.getElementById("sk_perskods").value;
    var skAdrese=document.getElementById("sk_adrese").value;
    var skEpasts=document.getElementById("sk_epasts").value;
    var skTelefons=document.getElementById("sk_telefons").value;
 
    if(vecVards==""||vecUzvards==""||vecTelefons==""||vecEpasts==""||skVards==""||skUzvards==""||skSkola==""||skKlase==""||skPerskods==""||skAdrese==""||skEpasts==""||skTelefons=="") 
        alert("Visiem laukiem jābūt aizpildītājiem")
    else 
        if(document.getElementById('r1').checked==false) alert("Izlasi noteikumus!")
    else{
    var dict={vecVards:vecVards, vecUzvards:vecUzvards, vecEpasts:vecEpasts, vecTelefons:vecTelefons,
        dzimums:dzimums, skVards:skVards, skUzvards:skUzvards, skSkola:skSkola, skKlase:skKlase,
        skPerskods:skPerskods, skAdrese:skAdrese, skEpasts:skEpasts, skTelefons:skTelefons};
        
        jsonData = JSON.stringify(dict);
        console.log(jsonData);
        if (document.getElementById('r1').checked)
        download(jsonData, 'vecakuPieteikumsSuutiit.txt', 'text/plain');
        alert("Visi dati veiksmīgi saglabāti")
    }
    fetch('https://kalviskincis.github.io/interesu-izglitibas-IS/views/vecakuPieteikumsSuutiit.txt', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(dict)
    })    
    .then(res => res.json())
    .then(data => document.getElementById("zinojumi").innerHTML = "Dati saglabāti")
        
}


function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}