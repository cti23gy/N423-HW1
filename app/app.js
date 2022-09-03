import * as MODEL from "./model.js";

function route() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#/", "");
    
    if(!pageID) {
        navToPage("home");
    }
    else {
        navToPage(pageID);
    }
}

function navToPage(pageName) {
    $.get(`pages/${pageName}.html`, function(data) {
        $("#app").html(data);

        
    });
} 



function initListeners() {
    $(window).on("hashchange", route);
    route();

    $("#gw").click((e) => {
        const location = $("#gwInput").val();
        const numDays = $("#gwInput2").val();
        if(location != "" && numDays != "") {
            getWeather(location, numDays);
        } else {
            alert("You need to fill in the blanks first!!");
        }
    });
}

function getWeather(location, numDays) {
    console.log("weather " + location + numDays);
    MODEL.getCurrentWeather(location, numDays);
    $("#gwInput").val("");
    $("#gwInput2").val("");
}

$(document).ready(function() {
    initListeners();
});