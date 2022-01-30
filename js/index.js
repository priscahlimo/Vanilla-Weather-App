// find time by city input
function getTime(timestamp){
    let date= new Date(timestamp);
    let hours= date.getHours();
    let minutes=date.getMinutes();

    let days=["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day= days[date.getDay()]
    if(minutes<10){
        return `Date updated: ${day} ${hours}:0${minutes}`
    };
    if(hours<=10){
        return `Date updated: ${day} 0${hours}:${minutes} AM`

    };
    if(hours>12){
        return `Date updated: ${day} ${hours}:${minutes} PM`

    };
    if(hours<=12){
        return `Date updated: ${day} 0${hours}:${minutes} AM`

    }
   else{
    return `Date updated: ${day} ${hours}:${minutes}`
   }
   
}



// Getting weather updates through search city

function handleTemp (response){
   console.log(response.data)


    document.querySelector(".temp").innerHTML = Math.round(response.data.main.temp) + "°C"
    document.querySelector(".city-name").innerHTML = response.data.name
    document.querySelector("#humid").innerHTML=response.data.main.humidity+"%"
    document.querySelector("#windy").innerHTML=response.data.wind.speed +"km/h"
    document.querySelector("#prep").innerHTML=response.data.weather[0].description
    let dateElement=document.querySelector("#date")
    dateElement.innerHTML= getTime(response.data.dt*1000)
    let icons=document.querySelector("#icon");
    icons.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    
}

function getTemperature(event){
event.preventDefault();
let cityElement=document.querySelector("#search-input").value
search(cityElement)
}

function search(city) {
    let key = "d987c3e70953ea07826bfce27d61b157";
    // let city=document.querySelector("#search-input").value
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    axios.get(url).then(handleTemp);
}
 
search("Kenya")

let form=document.querySelector("#submission")
form.addEventListener("submit", getTemperature)




    



    // getTemperature("kenya");

    // getting response through coodinates

    // function getByCoords(position){
    //     let key = "d987c3e70953ea07826bfce27d61b157"
    //     let latitudes=position.coords.latitude
    //     let longitudes=position.coords.longitude
    //     let endpoint = "http://api.openweathermap.org/data/2.5/weather?"
    //     let lurl = `${endpoint}lat=${latitudes}&lon=${longitudes}&appid=${key}&units=metric`
       
       
    // }

    // navigator.geolocation.getCurrentPosition(getByCoords)

    // // let searchCoords = document.querySelector("#search-current")
    // // searchCoords.addEventListener("click", getByCoords)

    // function search(city) {
    //     let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    //     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    //     axios.get(apiUrl).then(displayTemperature);
    //   }
      
    //   function handleSubmit(event) {
    //     event.preventDefault();
    //     let cityInputElement = document.querySelector("#city-input");
    //     search(cityInputElement.value);
    //   }
      
   
      
    