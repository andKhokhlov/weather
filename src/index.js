const mainn = document.querySelector('.main')
const search = document.querySelector('.geo')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')


search.addEventListener('click', () => {

    const APIKey = '426e0ccdb58ab419b02dc9160f7751c6'
    const city = document.querySelector('.geo input').value

    if(city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json =>{

        if(json.cod  ==='404'){
            mainn.style.height='400px'
            weatherBox.style.display = 'none'
            weatherDetails.style.display = 'none'
            error404.style.display = 'block'
            error404.classList.add('fadeIn')
            return
        }

        error404.style.display= 'none'
        error404.classList.remove('fadeIn')

        const image = document.querySelector('.weather-box img') 
        const temperature = document.querySelector('.weather-box .temperature') 
        const description = document.querySelector('.weather-box .description') 
        const vlaga = document.querySelector('.weather-details .vlaga span')
        const wind = document.querySelector('.weather-details .wind span')
        
        switch (json.weather[0].main){
            case 'Clear':
            image.src ='images/sun.png'
            break
                
            case 'Rain':
            image.src ='images/rain.png'
            break

            case 'Snow':
            image.src ='images/snow.png'
            break
                
            case 'Clouds':
            image.src ='images/cloudy.png'
            break

            case 'Haze':
            image.src ='images/haze.png'
            break

            default:
            image.src = ''
        }

        temperature.innerHTML= `${parseInt(json.main.temp)} <span>°C</span>`
        description.innerHTML = `${json.weather[0].description}`
        vlaga.innerHTML = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h `

        weatherBox.style.display = ''
        weatherDetails.style.display = ''
        weatherBox.classList.add('fadeIn')
        weatherDetails.classList.add('fadeIn')
        mainn.style.height='590px'


    })
})