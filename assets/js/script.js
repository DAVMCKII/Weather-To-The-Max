// search city variables
// city name variables
var chooseCity1 = document.querySelector("#choose-one")
var chooseCity2 = document.querySelector("#choose-two")
var chooseCity3 = document.querySelector("#choose-three")
var chooseCity3 = document.querySelector("#choose-four")
// variable for searc input
var inputForm = document.querySelector("#search-input")
// city forecast variables
$("#search-button").click( function searchApi(){
  var userSearch = $("#search-input").val();
  var lat = $("#lat").val() 
   var lon = $("#lon").val() 
//     // appended data variables
var cityName = document.querySelector("#city-name");
var latitude = document.querySelector("#lat")
var longitude = document.querySelector("#lon")
// var coordinates = document.querySelector("#coordinates")
var temperature = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var dayOne = document.querySelector("#day-one");
var forecasttemp = document.querySelector("#temp1");
var forecastwind = document.querySelector("#wind1");
var forecasthumidity = document.querySelector("#humidity1")


  localStorage.setItem("city-name", userSearch)


    
    var citySearch = "https:api.openweathermap.org/data/2.5/weather?q="+userSearch+"&appid=f076331debaf99d940d8560d805b5e9d&units=imperial";
    fetch(citySearch).then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {

          console.log(data.coord)
      
           cityName.append(data.name);
           latitude.append( data.coord.lat)
           longitude.append(data.coord.lon)
          //  coordinates.append("coordinates "+ data.coord.lat +" "+ data.coord.lon)
           temperature.append("Temperature: " + data.main.temp + " degrees");
           wind.append("Wind Speed: " + data.wind.speed + " mph");
           humidity.append("Humidity: " +data.main.humidity + "%");
        });
      }
      else {
        alert("There was a problem with your request!");
      }
    });
    
    
    
    var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+ lon + "&exclude=hourly&units=imperial&appid=a404263aba3930b625ad5e89eb2da3a1"

  
    fetch(forecastUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
      console.log(data.daily);
      for ( let i = 1; i < data.daily.length - 2; i++){


        // dayOne.append(data.list[i].main.temp +" ")
         forecasttemp.innerHTML += "<div>";
         forecasttemp.innerHTML += "Date: " + data.daily[i].dt + "<br />"
        //  forecasttemp.innerHTML +=  data.weather.icon + "<br />"
         forecasttemp.innerHTML += " Temperature: " + data.daily[i].temp.day + "<br />";
         forecasttemp.innerHTML += "Wind: " + data.daily[i].wind_speed  + "<br />";
         forecasttemp.innerHTML += "Humidity:" + data.daily[i].humidity  + "<br />";
         forecasttemp.innerHTML += " <hr> </div>";

        //  forecasttemp.append(" Temperature: " + data.list[i].main.temp +" " + "Wind: " + data.list[i].wind.speed );
        //  forecastwind.append();
        //  forecasthumidity.append("Humidity:" + data.list[i].main.humidity + "<br>"); 
         // += </div>

        

      };
  
        });
      }
      else {
        alert("There was a problem with your request!");
      }
    });
  })