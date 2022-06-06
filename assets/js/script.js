var apiBIT = "codingbootcamp";
var apiOpenWeather = "26430011a9e304ff62d863402ab09fcc";
var bandBtn = document.querySelector('#bandBtn');

function populateBands(){
    //clear innerHTML of #content
    $('#content').remove();
    //read bands from localStorage
    var bands = localStorage.getItem('bands');
    //if there are no bands
        //add row to add first band
    if (bands = '') {

    }
    //else
        //loop through them, 
            //create header row
            //make API call to get info
            //if API call is successful
                //fill fields in band header
                //make API call to event info
                //if API call returns event records
                    //create detail rows  
}

function saveBand(bandName){
    //trim bandName
    //if bandName != ""
        //check for duplicate in localStorage
        //if no duplicate found
            //add bandName to localStorage
    //call populateBands
}

function createBandRow(bandName, imageURL, bandURL){
    //create full-width row
    //if bandName==""
        //append a button element to "Add your first band!"
    //else 
        //add an image element, displaying imageURL (remember alt text), and band name as an a href to the bandURL
    //add the element to content
}

function createEventRow(parentRow, eventDateTime, eventCity, eventVenue, ticketURL){
    //create row element 

    //add column for eventDateTime

    //call getWeather, passing eventCity, eventDateTime, and the new row element
    var containerElement;
    getWeather(eventCity,eventDateTime,containerElement)

    //add column for city

    //create column for venue

    //if ticketURL!=""
        //create button for purchasing tickets
        
    //add row element to parentRow
}

function getWeather(city,dateEvent,containerElement){
    var dateForecastLimit=new Date();
    dateForecastLimit.setDate(dateForecastLimit.getDate() + 7);
    //if dateEvent<=(today's date+7 days)
    if(dateEvent<dateForecastLimit){
        //get lat/long from city, state?, country?
        //if data, add image of 1x weather icon, setting alt text to text description, and add high temperature element
        //https://openweathermap.org/api/geocoding-api
        //get lat, long off of response, test for bad response - limit to 1 city returned
        var params = "q=" + city + "&limit=1&appid=" + apiOpenWeather
        fetch("https://api.openweathermap.org/geo/1.0/direct?" + params)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.length > 0) {
                    var item = data[0]
                    // make the next call to get the weather
                    // call getWeatherByGCS, passing city name, latitude, and longitude
                     getWeatherByGCS(containerElement, dateEvent, item.lat, item.lon);
                }
            });
    }
}

function getWeatherByGCS(containerElement, dateWeather, lattitude, longitude) {
    var dateNow= new Date();
    var intDateDiff= Math.floor((dateNow.getTime()-dateWeather.getTime())/(24*3600*1000))*-1-1
    
    console.log("gwcgcs",intDateDiff)

    //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    //set units to imperial - degrees F/wind mph
    var params = "lat=" + lattitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiOpenWeather
    fetch("https://api.openweathermap.org/data/2.5/onecall?" + params)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var forecast = data.daily[intDateDiff];
            //TODO: 
            console.log(intDateDiff, forecast.temp.max, forecast.wind_speed, forecast.humidity, forecast.weather[0].main, forecast.weather[0].icon)
        })
}


var eventDateTime=new Date("6/10/2022");
getWeather("Charlotte",eventDateTime,"");

// bandBtn.addEventListener('click', )