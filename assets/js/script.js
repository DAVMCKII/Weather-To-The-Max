// search city variables
// city name variables
var chooseCity1 = document.querySelector("#choose-one")
var chooseCity2 = document.querySelector("#choose-two")
var chooseCity3 = document.querySelector("#choose-three")
var chooseCity3 = document.querySelector("#choose-four")
// variable for searc input
var inputForm = document.querySelector("#search-input")
// city forecast variables
$("#search-button").click(function searchApi() {
  var userSearch = $("#search-input").val();
  // var lat = ""
  // var lon = ""
  //     // appended data variables
  var cityName = document.querySelector("#city-name");
  // var latitude = document.querySelector("#lat")
  // var longitude = document.querySelector("#lon")
  // var coordinates = document.querySelector("#coordinates")
  var temperature = document.querySelector("#temp");
  var wind = document.querySelector("#wind");
  var humidity = document.querySelector("#humidity");
  // var dayOne = document.querySelector("#day-one");
  var forecasttemp = document.querySelector("#fiveday");
  var forecastwind = document.querySelector("#wind1");
  var forecasthumidity = document.querySelector("#humidity1");
  let searchHistory = JSON.parse(localStorage.getItem("cityName")) || [];
  let history = document.getElementById("history");
  if (searchHistory.length <= 8 && !searchHistory.includes(userSearch)) {
    searchHistory.push(userSearch);
  } else {
    if (!searchHistory.includes(userSearch)) {
       searchHistory.shift();
    searchHistory.push(userSearch);
    }

  }
  console.log(searchHistory);

  localStorage.setItem("cityName", JSON.stringify(searchHistory));
  
  let historyText = "";
  for (i = 0; i < searchHistory.length; i++) {
    historyText += "<div class='d-grid gap-2'>";
    historyText += " <button class='btn btn-secondary btn-sm cardbg text-dark fw-bold mt-2 mb-2' id='choose-" + i + "'>" + searchHistory[i] + "</button>";
    historyText += "</div>";
  }

  history.innerHTML = historyText;
  for (i = 0; i < searchHistory.length; i++){
    let btnId = "choose-" + i;
    let historyBtn = document.getElementById(btnId);
    historyBtn.addEventListener("click", () => { 
      document.getElementById("search-input").value = historyBtn.innerText;
      console.log(historyBtn.innerText);
     document.getElementById("search-button").click();
     
     
    })
  }
 

  var citySearch = "https:api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&appid=f076331debaf99d940d8560d805b5e9d&units=imperial";
  fetch(citySearch).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {

        console.log(data.coord)
        cityName.innerHTML = "";
        temperature.innerHTML = "";
        wind.innerHTML = "";
        humidity.innerHTML = "";
        cityName.append(data.name);
        //  latitude.append( data.coord.lat)
        //  longitude.append(data.coord.lon)
        //  coordinates.append("coordinates "+ data.coord.lat +" "+ data.coord.lon)

        temperature.append("Temp: " + data.main.temp + " degrees");
        wind.append("Wind Speed: " + data.wind.speed + " mph");
        humidity.append("Humidity: " + data.main.humidity + "%");
        lat= data.coord.lat;
        lon= data.coord.lon
        var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=a404263aba3930b625ad5e89eb2da3a1"
     fetch(forecastUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data.daily);
          let fiveday = "";
          for (let i = 1; i < data.daily.length - 2; i++) {
            let cityDate = new Date(data.daily[i].dt * 1000);
            // forecasttemp.innerHTML = "";
            fiveday += "<div class='col p-1'>";
            fiveday += "<div class='card navybg text-white '>";
            // dayOne.append(data.list[i].main.temp +" ")
            // forecasttemp.innerHTML += "<div class='headerbg'>";
            fiveday += (cityDate.getMonth() + 1) + "/" + cityDate.getDate() + "/" + cityDate.getFullYear() + "<br />"
            //  forecasttemp.innerHTML +=  data.weather.icon + "<br />"
            fiveday += " Temp: " + data.daily[i].temp.day + "<br class='mb-5'/>";
            fiveday += "Wind: " + data.daily[i].wind_speed + "<br class='mb-5' />";
            fiveday += "Humidity:" + data.daily[i].humidity + "<br class='mb-5' />";
            fiveday += "  </div> </div>";
            
            //  forecasttemp.append(" Temperature: " + data.list[i].main.temp +" " + "Wind: " + data.list[i].wind.speed );
            //  forecastwind.append();
            //  forecasthumidity.append("Humidity:" + data.list[i].main.humidity + "<br>");
            // += </div>
            
          }
          forecasttemp.innerHTML = fiveday;
          
          
          
        });
      } else {
        alert("There was a problem with your request!");
      }
    });
    });
     
      
      } else {
        alert("There was a problem with your request!");
    }
    
    
    

  
  
  

    
    
  
});


})
