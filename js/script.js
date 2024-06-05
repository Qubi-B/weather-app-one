function convert_to_float(a) {
        var floatValue = +(a);
        return floatValue;
    }

var button = document.querySelector('.button');
var inputValue = "Kielce"//document.querySelector('.inputValue');
var lang   = navigator.language || navigator.userLanguage;

var name   = document.querySelector('.name'); //city name
var desc   = document.querySelector('.desc'); //weather description
var temp   = document.querySelector('.temp'); //temperature
var humi   = document.querySelector('.humi'); //humidity
var pres   = document.querySelector('.pres'); //pressure
var wspd   = document.querySelector('.wspd'); //wind speed
var wang   = document.querySelector('.wang'); //wind angle
var clds   = document.querySelector('.clds'); //clouds density (%)

var aqi    = document.querySelector('.aqi'); //air quality
var pm10   = document.querySelector('.pm10'); //pm10
var pm25   = document.querySelector('.pm25'); //pm25

var latCls = document.querySelector('.lat'); //air quality
var lonCls = document.querySelector('.lon'); //air quality

var long = 0;
var lati = 0;

var latitude  = 0;
var longitude = 0;

var apiKey = "";

getJSON(); //get the API KEY from a JSON file of format {"key":"(yourkey)"} named openWeatherApiKey.json (this file is untracked)

async function getJSON() {
  const response = await fetch("openWeatherApiKey.json");
  const json = await response.json();
  apiKey = json.key;
  console.log(json.key);
}

lang = lang.substring(0, 2);
console.log("lang: " + lang);

//button.addEventListener('click', function(){

checkwthr();

function checkwthr(){
  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + /*inputValue.value*/ inputValue + '&units=metric&lang=' + lang + '&appid=' + apiKey)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      var nameVal = data['name'];
      var tempVal = data['main']['temp'];
      var descVal = data['weather'][0]['description'];
      var humiVal = data['main']['humidity'];
      var presVal = data['main']['pressure'];
      var wspdVal = data['wind']['speed'];
      var wangVal = data['wind']['deg'];
      var cldsVal = data['clouds']['all'];
      long = data['coord']['lon'];
      lati = data['coord']['lat'];

      name.innerHTML = nameVal;
      desc.innerHTML = descVal;
      temp.innerHTML = Math.round(tempVal*1) + " °C";
      humi.innerHTML = Math.round(humiVal) +    " %";
      pres.innerHTML = Math.round(presVal) +  " hPa";
      wspd.innerHTML = wspdVal +             " km/h";
      wang.innerHTML = wangVal +                " °";

      latCls.innerHTML = lati;
      lonCls.innerHTML = long;
    })

    .then(response => {0})

    console.log(lati);
    console.log(long);

    fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat=' + lati + '&lon=' + long + '&units=metric&appid=86fd47dba861b4b040377dce3a28a1de')

      .then(response => response.json())
      .then(data => {

        console.log('http://api.openweathermap.org/data/2.5/air_pollution?lat=' + lati + '&lon=' + long + '&units=metric&appid=86fd47dba861b4b040377dce3a28a1de')
        console.log(lati);
        console.log(long);
        console.log(data);

        var aqiVal = data['list'][0]['main']['aqi'];
        var pm25Val = data['list'][0]['components']['pm2_5'];
        var pm10Val = data['list'][0]['components']['pm10'];


        aqi.innerHTML = aqiVal;
        pm10.innerHTML = pm10Val;
        pm25.innerHTML = pm25Val;
      })

  .catch(err => alert('"' + inputValue.value + '" is not a valid city name'))
}
