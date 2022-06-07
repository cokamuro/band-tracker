var apiBIT = "codingbootcamp";
var apiOpenWeather = "26430011a9e304ff62d863402ab09fcc";

$(document).ready( function(){

    function populateBands() {
        //clear existing artist blocks on refresh
        $(".dynamically-populated").remove();
    
        //read bands from localStorage
        var delimBandString = localStorage.getItem("Bands");
        if (delimBandString != "") {
            //turn the delimited string into a string array
            var bands = delimBandString.split("***")
            //loop through the string array
            //for (i = 0; i < bands.length; i++) {
                //split out the code to create the dynamic HTML elements
                // createBandSection(bands[i], i)
                //put the 
                getBandInfo(bands, 0);
           // }
        }
    }
    
    function getBandInfo(bandArray, index) {
        //need to URL encode the band name?
        createBandSection(bandArray[index], index);
        //https://rest.bandsintown.com/artists/{{artist_name}}/?app_id=
        var params = "app_id=" + apiBIT
        fetch("https://rest.bandsintown.com/artists/" + bandArray[index] + "/?" + params)
            .then(function (response) {
                return (response.text());
            })
            .then(function (data) {
                if (!data.includes("Not Found")) {
                    var retJSON = JSON.parse(data)
                    //createBandSection(bandName, retBandObj.artistID, retBandObj.eventCount);
                    populateBandSection(index, bandArray[index], retJSON.id, retJSON.upcoming_event_count, retJSON.thumb_url, retJSON.url);
                    if(index<bandArray.length-1) {
                        getBandInfo(bandArray, index+1);
                    }
                }
            });
    }
    
    function saveBand(bandName) {
        //add band to localStorage, if no duplicates are found
        bandName = bandName.trim();
    
        var delimBandString = localStorage.getItem("Bands");
    
        if (delimBandString != "" && delimBandString != null) {
            //turn the delimited string into a string array
    
            if (delimBandString.includes("***")) {
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
                if (delimBandString.toUpperCase() != bandName.toUpperCase()) {
                    localStorage.setItem("Bands", delimBandString + "***" + bandName);
                }
            }
    
        } else {
            //if no bands were in localstorage, add this one
            localStorage.setItem("Bands", bandName);
            populateBands();
        }
    }
    
    function createBandSection(bandName, index) {
        //grab proto-artist-row
        var protoArtistBlock = $(".proto-artist-block")
        var newArtistBlock = protoArtistBlock.clone();
    
        newArtistBlock.removeClass("proto-artist-block")
        newArtistBlock.removeClass("visually-hidden")
        //newArtistBlock.addClass("artist-id-"+artistID)
        newArtistBlock.addClass("artist-index-" + index)
        newArtistBlock.addClass("dynamically-populated")
        var newArtistRow = newArtistBlock.find(".proto-artist-row")
        newArtistBlock.remove(".proto-header-row")
        newArtistBlock.remove(".proto-concert-row")
        var protoHeaderRow = $(".proto-header-row")
        var protoConcertRow = $(".proto-concert-row")
    
        newArtistRow.removeClass("proto-artist-row")
        newArtistRow.removeClass("visually-hidden")
        newArtistRow.addClass("dynamically-populated")
        newArtistRow.children().eq(0).children().eq(1).text(bandName);
        //clone the header row
        var newHeaderRow = protoHeaderRow.first().clone();
        newHeaderRow.removeClass("proto-header-row")
        newHeaderRow.removeClass("visually-hidden")
        newHeaderRow.addClass("dynamically-populated")
        newArtistBlock.append(newHeaderRow)
    
        $("#content").append(newArtistBlock)
    }
    
    function populateBandSection(index, bandName, artistID, eventCount, thumbnailURL, websiteURL) {
        //grab artist block by class
    
        var artistBlock = $(".artist-index-" + index)
        artistBlock.addClass("artist-id-" + artistID)
        var imgEl=artistBlock.find("img").eq(0);
        imgEl.attr("src",thumbnailURL)
        imgEl.attr("alt",bandName+" band thumbnail")
    
        if (eventCount != 0) {
            //get concerts
            //need to URL encode the band name?
    
            //https://rest.bandsintown.com/artists/{{artist_name}}/events/?app_id=
            var params = "app_id=" + apiBIT
            fetch("https://rest.bandsintown.com/artists/" + bandName + "/events/?" + params)
                .then(function (response) {
                    return (response.text());
                })
                .then(function (data) {
                    var retJSON = JSON.parse(data)
                    for (i = 0; i < retJSON.length; i++) {
                        var thisEvent = retJSON[i]
    
                        //loop through the concerts
                        //clone the concert rows
                        var newConcertRow = $(".proto-concert-row").first().clone();
                        newConcertRow.removeClass("proto-concert-row")
                        newConcertRow.removeClass("visually-hidden")
                        newConcertRow.addClass("dynamically-populated")                        
                        newConcertRow.children().eq(0).text(moment(thisEvent.datetime).format("M/D/YY H:mmA"));
                        newConcertRow.children().eq(1).text(thisEvent.venue.city)
                        newConcertRow.children().eq(2).text(thisEvent.venue.name +" ("+thisEvent.lineup+")")
                        getWeatherByGCS(newConcertRow.children().eq(1),thisEvent.datetime,thisEvent.venue.latitude,thisEvent.venue.longitude);
                        $('<a>', {text:'click', href: thisEvent.offers[0].url, target: '_blank'}).appendTo(newConcertRow.children().eq(3));
                        console.log(thisEvent)
                        $(".artist-id-" + thisEvent.artist_id).first().append(newConcertRow);
                    }
                });
        }
    }
    
    //add an image element, displaying imageURL (remember alt text), and band name as an a href to the bandURL
    //add the element to content
      
    function getWeatherByGCS(containerElement, dateEventString, lattitude, longitude) {
        var dateEvent=new Date(dateEventString);
        var dateNow = new Date();

        var intDateDiff = Math.floor((dateNow.getTime() - dateEvent.getTime()) / (24 * 3600 * 1000)) * -1 - 1
        
        console.log(dateEvent,intDateDiff)
        if (intDateDiff<=6) {

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
                containerElement.append("<img src='http://openweathermap.org/img/wn/" + forecast.weather[0].icon + ".png' class='weather-icons'>")
                containerElement.append("("+forecast.temp.max+"°F)")
                
                
                //$("#fcast-icon-" + index).attr("src", "http://openweathermap.org/img/wn/" + icon + ".png")
                console.log(intDateDiff, forecast.temp.max, forecast.wind_speed, forecast.humidity, forecast.weather[0].main, forecast.weather[0].icon)
            })
        }
    }
    
    
    
    $(".proto-artist-row").addClass("visually-hidden")
    $(".proto-header-row").addClass("visually-hidden")
    $(".proto-concert-row").addClass("visually-hidden")
    
    //var eventDateTime=new Date("6/10/2022");
    //getWeather("Charlotte",eventDateTime,"");
    populateBands();

    $("#add-band").on("click", function(event){
        //alert($("#bandNameInput").val())
        saveBand($("#bandNameInput").val());
        location.replace("index.html")
    })
    $("#content").on("click", function(event){
        event.log(event.target)
        //remove band
        var classes=$(event.target).parent().parent().parent().attr("class").split(" ");
        var indexToRemove=-1
        for(i=0;i<classes.length;i++){
            if(classes[i].includes("artist-index-")){
                indexToRemove=classes[i].substring(13).trim();
            }
        }
        if(indexToRemove!=-1){
            var delimBandString = localStorage.getItem("Bands");
            var bandArray=delimBandString.split("***")
            bandArray.splice(indexToRemove,1)
            localStorage.setItem("Bands",bandArray.join("***"));
            populateBands();
        }
    })
})
