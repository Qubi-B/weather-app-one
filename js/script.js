//init all basic variables needed
var button = document.querySelector('.button');
var inputValue = "Kielce"; //document.querySelector('.inputValue');
var lang   = navigator.language || navigator.userLanguage;

var icon   = document.querySelector('.curr_icon'); //current icon
var cityname   = document.querySelector('.name'); //city name
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

//forecast
var forecTable = document.querySelector('.forecast-generate');
var forecTableStagedContent = "";

var long = 0;
var lati = 0;

var latitude  = 0;
var longitude = 0;

var apiKey = "";

lang = lang.substring(0, 2);
console.log("lang: " + lang);

function checkwthr(){
  //CURRENT WEATHER
  //oh my god this shit works
  getApiKey().then(apiKey => fetch('http://api.openweathermap.org/data/2.5/weather?q=' + /*inputValue.value*/ inputValue + '&units=metric&lang=' + lang + '&appid=' + apiKey))
    .then(response => response.json())
    .then(data => {
      console.log('http://api.openweathermap.org/data/2.5/weather?q=' + /*inputValue.value*/ inputValue + '&units=metric&lang=' + lang + '&appid=' + apiKey)
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


      cityname.innerHTML = nameVal;
      icon.src = "png/" + data['weather'][0]['icon'] + ".png"; //icons\01d.svg
      desc.innerHTML = descVal;
      temp.innerHTML = Math.round(tempVal*1) + "°";
      humi.innerHTML = Math.round(humiVal) + "%";
      pres.innerHTML = Math.round(presVal) + "hPa";
      wspd.innerHTML = wspdVal;
      wang.innerHTML = wangVal;

      //humi.parentElement.style.borderColor = "rgb(0, 115, 255)"

      latCls.innerHTML = lati;
      lonCls.innerHTML = long;
    })

    .then(response => {0})

    //CURRENT AIR QUALITY
    //OH MY GOD THIS IS WORKING
    getApiKey().then(apiKey => fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat=' + lati + '&lon=' + long + '&units=metric&appid=' + apiKey))
      .then(response => response.json())
      .then(data => {
        var aqiRead = "";
        var aqiColor = "";
        var aqiVal = data['list'][0]['main']['aqi'];
        var pm25Val = data['list'][0]['components']['pm2_5'];
        var pm10Val = data['list'][0]['components']['pm10'];

        if(aqiVal == 1){aqiRead = "Good"; aqiColor = "greenyellow";}
        if(aqiVal == 2){aqiRead = "Mid"; aqiColor = "green";}
        if(aqiVal == 3){aqiRead = "Moderate"; aqiColor = "yellow";}
        if(aqiVal == 4){aqiRead = "Bad"; aqiColor = "orange";}
        if(aqiVal == 5){aqiRead = "Very Bad"; aqiColor = "red";}


        aqi.innerHTML = aqiRead;
        aqi.parentElement.style.borderColor = aqiColor;
        pm10.innerHTML = pm10Val;
        pm25.innerHTML = pm25Val;
      })

      .catch(err => alert('"' + inputValue.value + '" is not a valid city name'))

      .then(response => {0})
};

function getForecastPrintSmallTable(){
  forecTableStagedContent = "";
  forecTable.innerHTML = "Loading...";

  getApiKey().then(apiKey => fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lati + '&lon=' + long + '&units=metric&appid=' + apiKey))
      .then(response => response.json())
      .then(data => {
        //generate the table
        forecTableStagedContent += "<table>";
        forecTableStagedContent += "<tr>";
        forecTableStagedContent += "<td class='table-header' colspan='3'><span class='material-symbols-outlined'>calendar_month</span>&nbsp3-Hour/5-day Forecast</td>";
        forecTableStagedContent += "</tr>";
        for(i = 0; i < 8; i++){
          //generate the table row
          forecTableStagedContent += "<tr>";
          forecTableStagedContent += "<td style='text-align: center'>" + (data['list'][i]['dt_txt']).slice(8, 16) + "</td>";
          forecTableStagedContent += "<td style='text-align: right'><img src='png/" + data['list'][i]['weather'][0]['icon'] + ".png' alt=''></td>";
          forecTableStagedContent += "<td>" + Math.round(parseFloat(data['list'][i]['main']['temp']))  + "°C" + "</td>";
          forecTableStagedContent += "</tr>";
        }
        forecTableStagedContent += "<tr>";
        forecTableStagedContent += "<td class='align-center-td' colspan='3'><button onclick='getForecastPrintFullTable()'>Show more ↓</button></td>";
        forecTableStagedContent += "</tr>";
        forecTableStagedContent += "</table>";
        forecTable.innerHTML = forecTableStagedContent;
      })
}

function getForecastPrintFullTable(){
  forecTableStagedContent = "";
  forecTable.innerHTML = "Loading...";
  
  getApiKey().then(apiKey => fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lati + '&lon=' + long + '&units=metric&appid=' + apiKey))
      .then(response => response.json())
      .then(data => {
        //generate the table
        forecTableStagedContent += "<table>";
        forecTableStagedContent += "<tr>";
        forecTableStagedContent += "<td class='table-header' colspan='3'><span class='material-symbols-outlined'>calendar_month</span>&nbsp3-Hour/5-day Forecast</td>";
        forecTableStagedContent += "</tr>";
        for(i = 0; i < 40; i++){
          //generate the table row
          forecTableStagedContent += "<tr>";
          forecTableStagedContent += "<td style='text-align: center'>" + (data['list'][i]['dt_txt']).slice(8, 16) + "</td>";
          forecTableStagedContent += "<td style='text-align: right'><img src='png/" + data['list'][i]['weather'][0]['icon'] + ".png' alt=''></td>";
          forecTableStagedContent += "<td>" + Math.round(parseFloat(data['list'][i]['main']['temp']))  + "°C" + "</td>";
          forecTableStagedContent += "</tr>";
        }
        forecTableStagedContent += "<tr>";
        forecTableStagedContent += "<td class='align-center-td' colspan='3'><button onclick='getForecastPrintSmallTable()'>Show less ↑</button></td>";
        forecTableStagedContent += "</tr>";
        forecTableStagedContent.innerHTML += "</table>";
        forecTable.innerHTML = forecTableStagedContent;
      })
}