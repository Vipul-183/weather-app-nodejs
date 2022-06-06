const request= require('request')


const forecast = (data,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=6b10fb24949bb3bed211bef3bac4e1d9&query='+ data.latitude +','+ data.longitude +'&units=f'
    
    request({ url: url , json: true}, (error, response) => {
        if(error){
            callback('Uh-oh! Something went wrong and system is unable to connect to the server.',undefined)
        }
        else if(response.body.error){
            callback('Unable to find weather at this location!',undefined);
        }
        else{
            const weather_description = response.body.current.weather_descriptions
            const location = data.location
            const temperature = response.body.current.temperature
            const feelslike = response.body.current.feelslike
            const wind_speed = response.body.current.wind_speed
            const humidity = response.body.current.humidity
            callback(undefined,{weather_description,location,temperature,feelslike,wind_speed,humidity})
        }
    })
}

module.exports = forecast