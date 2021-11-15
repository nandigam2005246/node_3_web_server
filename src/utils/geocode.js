const request = require ('postman-request') 

const geocode = (address, callback) => {

    //const map_url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieXpkZXYiLCJhIjoiY2p0enB3dDAwMm9iejN6cW5kbjFkcTNodyJ9.uZKJN23voJOcAHfgLAScyQ&limit=1' 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmFuZGlnYXMiLCJhIjoiY2t2ZzR6N2VvMTh1NjJ3bzA1MWJsNTJ4ZCJ9.WohsUAWsfpRgxvqxA_E7Gg&limit=1'
    
    request( {url, json:true} , ( error, {body}= {} ) => {
      if(error){
        callback('No Network Connection!', undefined)
      } 
      else if(body.features.length === 0){
        callback('Search Result Not Found!!!', undefined)
      } 
      else{
        console.log(body.features[0].center[1])
        console.log(body.features[0].center[0])
        console.log(body.features[0]. place_name)
        callback(undefined, {
          latitude:  body.features[0].center[1],
          longitude: body.features[0].center[0],
          location:  body.features[0]. place_name
        })
      }

  }) 

}

module.exports = geocode