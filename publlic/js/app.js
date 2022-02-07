const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
//get current location
const $sendLocationButton = document.querySelector('#send-location')


const $error = document.querySelector('#error')
const locationDetails = document.querySelector('#location-wrapper')


//cards
const feelsLike = document.querySelector('#feels-like')
const windDetails = document.querySelector('#wind-details')
const uvIndex = document.querySelector('#uv-index')
const visibility = document.querySelector('#visibility')
const humidity = document.querySelector('#humidity')
const pressure = document.querySelector('#pressure')



function setValues(data) {
    locationDetails.innerHTML = `
    <div class="d-flex justify-content-center"><h1 class="display-1 text-center">` + data.forecast.weather_details.temperature + `&#8451;</h1><img src="`+ data.forecast.weather_details.weather_icons[0] + `" class="rounded ps-1" alt="Weather forecast image"/></div>
    
    <div class="display-6 ><i class="fas fa-location-arrow"></i> `+ data.forecast.location.name + ` ,` + data.forecast.location.region + ` ,` + data.forecast.location.country + ` ` + `</div>
    <p class="fs-4"><i class="far fa-clock"></i> `+ data.forecast.location.localtime + `</p>
    <p class="fs-4">Forecast: `+ data.forecast.weather_details.weather_descriptions[0] + `</p>
    <button class="btn btn-primary btn-md" type="button">To Know more...</button>
</div>
</div>`
    feelsLike.innerHTML = `
               
        <div class="card-header"><i class="fas fa-temperature-high"></i></div>
        <div class="card-body  text-center">
            <h5 class="card-title">FEELS LIKE</h5>
            <p class="card-text display-5">`+data.forecast.weather_details.feelslike+` &#8451;</p>
        </div>`
        windDetails.innerHTML = `
               
        <div class="card-header"><i class="fas fa-wind"></i></div>
        <div class="card-body text-center">
            <h5 class="card-title">WIND</h5>
            <p class="card-text">
            W.Speed: <i class="fas fa-tachometer-alt"></i>`+data.forecast.weather_details.wind_speed+`km/h<br>
            W.Dir: <i class="fas fa-compass"></i> `+data.forecast.weather_details.wind_dir+`<br>
            W.Degree: <i class="fas fa-sync"></i> `+data.forecast.weather_details.wind_degree+`
            </p>
            
        </div>`
        uvIndex.innerHTML = `
               
        <div class="card-header"><i class="fas fa-sun"></i> </div>
        <div class="card-body text-center">
            <h5 class="card-title">UV </h5>
            <p class="card-text display-5 ">`+data.forecast.weather_details.uv_index+` &#8451;</p>
        </div>`
        visibility.innerHTML = `
               
        <div class="card-header"><i class="fas fa-eye"></i></div>
        <div class="card-body text-center">
            <h5 class="card-title">VISIBILITY</h5>
            <p class="card-text display-5 text-center">`+data.forecast.weather_details.visibility+ `km</p>
        </div>`
        humidity.innerHTML = `
               
        <div class="card-header"><i class="fas fa-tint"></i></div>
        <div class="card-body text-center">
            <h5 class="card-title">HUMIDITY</h5>
            <p class="card-text display-5 text-center">`+data.forecast.weather_details.humidity+` %</p>
        </div>`
        pressure.innerHTML = `
               
        <div class="card-header"><i class="fas fa-tachometer-alt"></i></div>
        <div class="card-body text-center">
            <h5 class="card-title">PRESSURE</h5>
            <p class="card-text display-5 text-center">`+data.forecast.weather_details.pressure+` hpa</p>
        </div>`


}

//Click event to get the current location and forecast
$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by browser')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        $sendLocationButton.setAttribute('disabled', 'disabled')
        //fetch method for current location
        const currentCords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        //convert the object to string and parse to get the co-ordinates and show it.
        fetch('/weather/current?address=' + JSON.stringify(currentCords)).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    // messageOne.textContent = data.error
                } else {
                    //displaying the forecast
                    console.log(data)
                    //messageOne.textContent = data.forecast.location
                    //messageTwo.textContent = data.forecast.weather_details

                    setValues(data)
                    $sendLocationButton.removeAttribute('disabled')


                }
            })
        })

    }, () => { //Removing disabled after retrieving the information from the service
        console.log('Current  location weather forecast is calculated!')

    })
})

//Get Weather forecast for given location
weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const location = searchElement.value
    //Fetch weather for Boston
    fetch('/weather?address=' + location).then((response) => {
        //Reset object values
        //messageOne.textContent = ''
        // messageTwo.textContent = ''
        response.json().then((data) => {
            if (data.error) {
                erorr.textContent = data.error
            } else {
                console.log(data)
                setValues(data)
            }
        })
    })
})



//Tried sample code 
/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{ //callback
        console.log(data)
    })
}) //client side o.peration- fetch
*/