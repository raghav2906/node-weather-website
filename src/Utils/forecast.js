const request = require('request')

const forecast = (Lat, Long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=38e343cfc8a68389a9e6ac8b1573383e&query=${Lat},${Long}&units=m`

    request({url, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to connect !', undefined)
        }
        else if(body.error){
            callback('Unable to get info', undefined)
        }
        else
        {
            const propc = body.current
            const propl = body.location
            const info = `There is  ${propc.weather_descriptions[0]} enviornment with current date & time : ${body.location.localtime}. \nIt is currently  ${propc.temperature} degree out. It feels like ${propc.feelslike} degree out.The humidity level is ${body.current.humidity} . `
            callback(undefined, info)
        }
    })
}



module.exports = forecast