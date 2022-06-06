var apiBIT = "codingbootcamp";
var apiOpenWeather = "26430011a9e304ff62d863402ab09fcc";
var bandBtn = document.querySelector('#bandBtn');

function populateBands() {
    //clear innerHTML of #content

    //read bands from localStorage
    var delimBandString = localStorage.getItem("Bands");
    if (delimBandString != "") {
        //turn the delimited string into a string array
        var bands = delimBandString.split("***")
        //loop through the string array
        for (i = 0; i < bands.length; i++) {
            //create band header row
            createBandRow(bands[i],"","",i);
            
            //make API call to get info
            //if API call is successful
            //fill fields in band header
            //make API call to event info
            //if API call returns event records
            //create detail rows  
        }
    }

}

function saveBand(bandName) {
    //add band to localStorage, if no duplicates are found
    bandName = bandName.trim();

    var delimBandString = localStorage.getItem("Bands");


    if (delimBandString != "" && delimBandString != null) {
        //turn the delimited string into a string array

        if(delimBandString.includes("***")){
            var bands = delimBandString.split("***")
            //loop through the string array
            var match = false;
            for (i = 0; i < bands.length; i++) {
                if (bands[i].toUpperCase() == bandName.toUpperCase()) {
                    match = true;
                }
            }
            if (!match) {
                delimBandString = delimBandString + "***" + bandName
                localStorage.setItem("Bands", delimBandString);
                //there was a non-duplicate band, so refresh the band list
                populateBands();
            }
        } else {
            if(delimBandString.toUpperCase()!=bandName.toUpperCase()){
                localStorage.setItem("Bands", delimBandString+"***"+bandName);
            }
        }
        
    } else {
        //if no bands were in localstorage, add this one
        localStorage.setItem("Bands", bandName);
        populateBands();
    }
}

function createBandRow(bandName, imageURL, bandURL, index) {
    //grab proto-artist-row
    var protoArtistRow=$(".proto-artist-row")
    var protoHeaderRow=$(".proto-header-row")
    var protoConcertRow=$(".proto-concert-row")

    //clone the artist row
    var newArtistRow=protoArtistRow.clone();
    //newArtistRow.attr("id","artist-head-"+index);
    newArtistRow.removeClass("proto-artist-row")
    newArtistRow.removeClass("visually-hidden")
    newArtistRow.children().eq(0).children().eq(1).text(bandName);
    $("#content").append(newArtistRow);

    //clone the header row
    var newHeaderRow=protoHeaderRow.clone();
    newHeaderRow.removeClass("proto-header-row")
    newHeaderRow.removeClass("visually-hidden")
    $("#content").append(newHeaderRow);

    //get concerts
    //loop through the concerts
    //clone the concert rows
    //hardcoded for now
    var newConcertRow=protoConcertRow.clone();
    newConcertRow.removeClass("proto-concert-row")
    newConcertRow.removeClass("visually-hidden")
    newConcertRow.children().eq(0).text("6/10/1980")
    newConcertRow.children().eq(1).text("Charlotte")
    newConcertRow.children().eq(2).text("Filmore")
    $("#content").append(newConcertRow);
    var newConcertRow=protoConcertRow.clone();
    newConcertRow.removeClass("proto-concert-row")
    newConcertRow.removeClass("visually-hidden")
    newConcertRow.children().eq(0).text("6/12/1980")
    newConcertRow.children().eq(1).text("Raleigh")
    newConcertRow.children().eq(2).text("Red Hat Amphitheater")
    $("#content").append(newConcertRow);


    //add an image element, displaying imageURL (remember alt text), and band name as an a href to the bandURL
    //add the element to content

    
}

function createEventRow(parentRow, eventDateTime, eventCity, eventVenue, ticketURL) {
    //create row element 

    //add column for eventDateTime

    //call getWeather, passing eventCity, eventDateTime, and the new row element
    var containerElement;
    getWeather(eventCity, eventDateTime, containerElement)

    //add column for city

    //create column for venue

    //if ticketURL!=""
    //create button for purchasing tickets

    //add row element to parentRow
}

function getWeather(city, dateEvent, containerElement) {
    var dateForecastLimit = new Date();
    dateForecastLimit.setDate(dateForecastLimit.getDate() + 7);
    //if dateEvent<=(today's date+7 days)
    if (dateEvent < dateForecastLimit) {
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
    var dateNow = new Date();
    var intDateDiff = Math.floor((dateNow.getTime() - dateWeather.getTime()) / (24 * 3600 * 1000)) * -1 - 1

    console.log("gwcgcs", intDateDiff)

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



$(".proto-artist-row").addClass("visually-hidden")
$(".proto-header-row").addClass("visually-hidden")
$(".proto-concert-row").addClass("visually-hidden")

//var eventDateTime=new Date("6/10/2022");
//getWeather("Charlotte",eventDateTime,"");
saveBand("Slipknot");
saveBand("Spritbox");
saveBand("Grimes");
saveBand("Speedy Ortiz");
populateBands();
