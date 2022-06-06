

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#first')
const msg2 = document.querySelector('#second')
const msg3 = document.querySelector('#third')
const msg4 = document.querySelector('#fourth')
const msg5 = document.querySelector('#fifth')
const msg6 = document.querySelector('#sixth')
 

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;

    msg1.textContent ='Loading...'
    msg2.textContent =''
    msg3.textContent =''
    msg4.textContent =''
    msg5.textContent =''
    msg6.textContent =''
    
    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;
            }
            else {
                msg1.textContent = data.location;
                msg2.textContent = 'Forecast: '+ data.weather_description
                msg3.textContent = 'Temperature: '+ data.temperature + '\u00B0C'
                msg4.textContent = 'Feels Like: ' + data.feelslike + '\u00B0C'
                msg5.textContent = 'Wind Speed: ' + data.wind_speed + ' km/h'
                msg6.textContent = 'Humidity: ' + data.humidity  + '\%'        
                
            }
        })

    })
})