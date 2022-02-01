// find time by city input
function getTime(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()]
    if (minutes < 10) {
        return `Date updated: ${day} ${hours}:0${minutes}`
    };
    if (hours <= 10) {
        return `Date updated: ${day} 0${hours}:${minutes} AM`

    };
    if (hours > 12) {
        return `Date updated: ${day} ${hours}:${minutes} PM`

    };
    if (hours <= 12) {
        return `Date updated: ${day} 0${hours}:${minutes} AM`

    } else {
        return `Date updated: ${day} ${hours}:${minutes}`
    }

}


function forecastDay(timestamp){

let date=new Date(timestamp*1000)
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day=days[date.getDay()];

return day

}


// add forecast

function displayForecast(response) {
    console.log(response.data.daily)
   let currentForecast=response.data.daily

    let dailyForecast = document.querySelector("#forecast")
    let forecastHtml = `<div class="row">`;

    let days = ["Tue", "Wed", "Thur", "Fri", "Sat", "Sun", "Mon"];

    currentForecast.forEach(function(currentForecastday){
        forecastHtml = forecastHtml +
        `
            <div class="col-1">
                <div class="weather-forecast-date">
                     ${forecastDay(currentForecastday.dt)} 
                </div>
                <div class="weather-forecast-icon">
                      <img src="https://openweathermap.org/img/wn/${currentForecastday.weather[0].icon}@2x.png" height=40px>
                </div>
                <div class="weather-forecast-next">
            
                    <span class="weather-forecast-max">
                       ${Math.round(currentForecastday.temp.max)}°C
                     </span>
            
                    <span class="weather-forecast-min">
                   ${Math.round(currentForecastday.temp.min)}°C
                    </span>
            
                 </div>
             </div>`
    })
     forecastHtml = forecastHtml+`</div>`;
    dailyForecast.innerHTML = forecastHtml
}


function handleForecast(coordinates){
    console.log(coordinates)

    let key="d987c3e70953ea07826bfce27d61b157"
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`
    console.log(apiUrl)
    axios.get(apiUrl).then(displayForecast);
    }

// Getting weather updates through search city

function handleTemp(response) {

    currentTemperature = response.data.main.temp

    document.querySelector(".temp").innerHTML = Math.round(currentTemperature)
    document.querySelector(".city-name").innerHTML = response.data.name
    document.querySelector("#humid").innerHTML = response.data.main.humidity + "%"
    document.querySelector("#windy").innerHTML = Math.round(response.data.wind.speed) + "km/h"
    document.querySelector("#prep").innerHTML = response.data.weather[0].description


    let dateElement = document.querySelector("#date")
    dateElement.innerHTML = getTime(response.data.dt * 1000)
    let icons = document.querySelector("#icon");
    icons.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

    handleForecast(response.data.coord)

}




function getTemperature(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#search-input").value
    search(cityElement)
}

function search(city) {
    let key = "d987c3e70953ea07826bfce27d61b157";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    axios.get(url).then(handleTemp);
}

function convertToFaren(event) {
    event.preventDefault();
    convert.classList.add("active")
    converted.classList.remove("active")
    let nowDeg = document.querySelector(".temp")
    let convertLink = Math.round(currentTemperature * 9 / 5) + 32
    nowDeg.innerHTML = convertLink

}

function convertToDeg(event) {
    event.preventDefault();
    converted.classList.add("active")
    convert.classList.remove("active")
    let nowFarhent = document.querySelector(".temp")
    nowFarhent.innerHTML = Math.round(currentTemperature)
}

let currentTemperature = null;

let form = document.querySelector("#submission")
form.addEventListener("submit", getTemperature)


let convert = document.querySelector("#farhent-link");
convert.addEventListener("click", convertToFaren)

let converted = document.querySelector("#celcius-link");
converted.addEventListener("click", convertToDeg)

search("New York")
