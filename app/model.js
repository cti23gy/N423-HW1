var baseURL = "http://api.weatherapi.com/v1/";
var key = "2af2ca9438e742d1be7202359222908";

function getCurrentDate() {
    //console.log(utility(name));

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    return `${year}-${month}-${day}`;
}

function getCurrentWeather(location, numDays) {
    //$("#app").empty();
    //For looping local json
    /*

    $.getJSON("data/data.json", function(items) {
        $.each(items.LISTOFDATA, function(index, item) {
            $("#app").append(`<p>${item.name}</p>`);
        });
    }).fail(function (e) {
        alert("Sorry Data did not load!");
        console.log(e); 
    });
    console.log("ok");
    */

    //for retrieving api info
    const currentDate = getCurrentDate()
    $.get(`${baseURL}forecast.json?key=${key}&q=${location}&days=${numDays}&aqi=no&alerts=no`, //FIX LINK TO MATCH SEARCH QUERY!!
    (data) => {
        console.log(data);
        console.log(currentDate);

        console.log(data.location.name);

        var appender = ``;
        for (var i in data.forecast.forecastday) {
            var curDay = data.forecast.forecastday[i];

            //date
            appender += `
            <div class="content">
                <h3>${curDay.date} </h3>
                <h3>${curDay.day.condition.text}</h3>
                <img class="image" src="${curDay.day.condition.icon}" />
                
                <p>Fahrenheit:</p>
                <p>High: ${curDay.day.maxtemp_f} - Low: ${curDay.day.mintemp_f}</p>
                <p>Celsius:</p>
                <p>High: ${curDay.day.maxtemp_c} - Low: ${curDay.day.mintemp_c}</p>

                <p>Chance of Rain: ${curDay.day.daily_chance_of_rain}</p>
                <p>Humidity: ${curDay.day.avghumidity}</p>
            </div>
            `;

         }
        $("#output").empty();
            $("#output").append(`
            <h2>${data.location.name}</h2>
            <div class="outputblock">
                
                ${appender}
            </div>
        `);
    }).fail(function (e) {
        alert("Sorry Data did not load!");
        console.log(e); 
    });
    

}

function utility(name) {
    return name + " Howdy Pard!";
}

export { getCurrentDate, getCurrentWeather };