const search_input=document.querySelector(".search-texts");
const search=document.getElementById("search");
const temperature=document.querySelector(".temperature");
const description=document.querySelector(".discription");
const weather_img=document.querySelector(".weather_img");
const humidity=document.getElementById("humidity");
const wind=document.getElementById("wind-speed");
const location_not_found=document.querySelector(".location-not-found");
const weather_body=document.querySelector(".weather-body");

async function check_weather(city)
{
    const api_key="187b3afb4ae3d7814c78ba6afabbd4ad";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then(response=>response.json())
    //console.log(weather_data);
    if(weather_data.cod === `404`)
    {
        location_not_found.style.display="flex";
        weather_body.style.display="none";
        return;
    }
    location_not_found.style.display="none";
    weather_body.style.display="flex";
    temperature.innerHTML=`${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML=`${weather_data.weather[0].description}`
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind.innerHTML=`${weather_data.wind.speed}Km/H`;
    switch(weather_data.weather[0].main)
    {
        case 'Clouds':
            weather_img.src= "./assets/cloud.png";
            break;

        case 'Clear':
            weather_img.src="./assets/clear.png";
            break;

        case 'Rain':
            weather_img.src="./assets/rain.png";
            break;

        case 'Snow':
            weather_img.src="./assets/snow.png";
            break;

        case 'Mist':
            weather_img.src="./assets/mist.png";
            break;
    }
}

search.addEventListener('click',()=>{
    check_weather(search_input.value);
})