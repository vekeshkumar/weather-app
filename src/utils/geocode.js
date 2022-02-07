const request = require('postman-request')


const geocoding = (address,callback) =>{
    const latlongUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoidms3NiIsImEiOiJja3dicDUzeGIyeDM0MnFwOG4xbHRsa3o4In0.PCgpvQfaPqxthurfGVvfLQ&limit=1'
    request({url:latlongUrl,json:true},(error,{body})=>{
      
        if(error){
            callback('Unable to connect with the weather service',undefined)
        }else if(body.features.length===0)
        {
            callback('Unable to find the co-ordinates for the given location',undefined)
        }else{
            callback(undefined,{
                //sendback- lat, long, and address
                 latitude:body.features[0].center[1],
                 longitude:body.features[0].center[0],
                 location :body.features[0].place_name
            })
        }
    })
}


module.exports = geocoding
