# Izmaiņu apraksts

## 15.—19. marts 2021
* Esošie json pārrakstīti uz DB (mkdb.py faili)
* Lielais vairums esošās funkcionalitātes pārnests, lai strādatu ar DB:
  * Jauna IIC ierakstīšana
  * Visu pulciņu parādīšana un dzēšana pa vienam
  * Skolēnu izvēle + vecāku pieteikuma skats.
  * Vecāku pieteikums
* Darāmais, lai iedzītu līdz šim padarīto:
  * Pieslēgt UPDATE pieprasījumu, lai strādātu pulciņu pievienošana un labošana
* Darāmais vispār, lai tiektos uz pilnību:
  * Lietotāji, viņu lomas
  * Vecāku pieteikumu apstrāde + brīvo vietu menedžments
  * Lielāka pulciņu DB


## 14. marts 2021
* Vecāku pieteikuma forma saņem datus no skolēnu izvēles, vecPietGatavs.json pieraksta arī izvēlētā pulciņa ID

## 11. marts 2021
* Skolēnu izvēles skats strādā datu laukiem "joma" un "vecums". Pieteikšanās poga "zina" atlasītā pulciņa datus, tie būtu padodami vecāku pieteikuma formai
* Vizuālas izmaiņas — "logo" atkal redzams visās lapās.


## 10. marts 2021
* IIC lapa māk atvērt pulciņa reģistrēšanas lapu gan ar jaunu iestādi, gan kādu no esošajām
* No cita zara pārnesta iestādes reģistrēšanas funkcionalitāte
* Divus iepriekšējos darot, nebūtiskas izmaiņas skatā IIC.html
* Strādā pulciņa labošana un dzēšana
* Pulciņa ievades skaitā pulcina_info.html mainīta lietotāja saskarne laika ievadīšanai. Datu integritāte no tā necieš
* pulcina_info.html skats strādā tikai padots ar POST metodi un "tīrā veidā" nav atverams


## 7. marts 2021
* Visi JS apkopoti vienā datnē. Tas vietām rada neērtības konsoles kļūdu paziņojumu izskatā, bet ir nepieciešams, izmantojot "render template"



