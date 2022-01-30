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
   
    currentTemperature=response.data.main.temp

    document.querySelector(".temp").innerHTML = Math.round(currentTemperature) 
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
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    axios.get(url).then(handleTemp);
}
 
function convertToFaren(event){
    event.preventDefault();
    convert.classList.add("active")
    converted.classList.remove("active")
    let nowDeg =document.querySelector(".temp")
    let convertLink = Math.round( currentTemperature* 9/5) + 32
    nowDeg.innerHTML= convertLink
  
}

function convertToDeg(event){
    event.preventDefault();
    converted.classList.add("active")
    convert.classList.remove("active")
    let nowFarhent=document.querySelector(".temp")
    nowFarhent.innerHTML=Math.round(currentTemperature)  
}

let currentTemperature= null;

let form=document.querySelector("#submission")
form.addEventListener("submit", getTemperature)


let convert=document.querySelector("#farhent-link");
convert.addEventListener("click" , convertToFaren)

let converted=document.querySelector("#celcius-link");
converted.addEventListener("click" , convertToDeg) 

search("Kenya")
