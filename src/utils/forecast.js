const request = require('postman-request') 


const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=0463fd8dc018d41ea38dc45a6c07e76b&query='+latitude +' , '+ longitude +' &units=f'   
    request( {url, json:true}, (error, {body}= {}) =>{
        //console.log(body)
        if(error){
            callback("No Network Connection!!!", undefined) 
        }
        else if(body.error) {
            callback("Search Not Found!!!", undefined)
        }
        else{
            callback(undefined, 'It is Currently ' + body.current.temperature + ' degrees out. '+ 'It feels like '+ body.current.feelslike + ' degrees out.' + "Humidity is"+ " " + body.current.humidity)
         }
       
       // callback(undefined, 'It is Currently ' + body.current.temperature + ' degrees out. '+ 'It feels like '+ body.current.feelslike + ' degrees out.' )

    })


}

module.exports = forecast