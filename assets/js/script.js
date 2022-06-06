var apiBIT = "something";
var apiOpenWeather = "somethingelse";

function populateBands(){
    //clear innerHTML of #content

    //read bands from localStorage

    //if there are no bands
        //add row to add first band
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
    //add column for city
    //create column for venue
    //if ticketURL!=""
        //create button for purchasing tickets
    //add row element to parentRow
}

function getWeather(city,dateEvent,containerElement){
    //if dateEvent<=(today's date+7 days)
        //get lat/long from city, state, country?
        //if data, add image of 1x weather icon, setting alt text to text description, and add high temperature element
}

