// find by city input
function getTime(timestamp){
    let date= new Date(timestamp);
    let hours= date.getHours();
    let minutes=date.getMinutes();

    let days=["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day= days[date.getDay()]
    if(minutes<10){
        return `Date updated: ${day} ${hours}:0${minutes}`
    };
    if(hours<10){
        return `Date updated: ${day} 0${hours}:${minutes} `

    };
    if(hours<=12){
        return `Date updated: ${day} 0${hours}:${minutes} AM`

    }
   else{
    return `Date updated: ${day} ${hours}:${minutes}`
   }
   
}






function handleTemp (response){

    document.querySelector(".temp").innerHTML = Math.round(response.data.main.temp) + "°C"
    document.querySelector(".city-name").innerHTML = response.data.name
    document.querySelector("#humid").innerHTML=response.data.main.humidity+"%"
    document.querySelector("#windy").innerHTML=response.data.wind.speed +"km/h"
    document.querySelector("#prep").innerHTML=response.data.weather[0].description
    let dateElement=document.querySelector("#date")
    dateElement.innerHTML= getTime(response.data.dt*1000)
}



function getTemperature() {
    let key = "d987c3e70953ea07826bfce27d61b157"
    let city = document.getElementById("search-input").value
    let endpoint = "http://api.openweathermap.org/data/2.5/weather?"
    let url = `${endpoint}q=${city}&appid=${key}&units=metric`
    axios.get(url).then(handleTemp)
    
}



    let searchResults = document.querySelector("#search-button")
     searchResults.addEventListener("click", getTemperature)


    