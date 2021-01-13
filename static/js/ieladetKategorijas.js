joma = ["---", "💃 Dejas", "🎼 Mūzika", "🎬 Teātra māksla", "⚽️ Sports", "🎨 Vizuālā māksla", "🔧 Tehniskā jaunrade", "🌿 Vides izglītība", "💻 Informācijas tehnoloģijas", "📚 Akadēmiskā izglītība", " ❗ Citas programmas"]
for (var i = 0; i < joma.length; i++) {
    var option = document.createElement("option");
    option.value = joma[i];
    option.textContent = joma[i];
    document.getElementById("joma").appendChild(option);
}