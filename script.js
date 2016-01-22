//Constants

var C_URL = "http://host.bisswanger.com/dhbw/calendar.php";
//var C_USER = "6079153";
var C_USER = "ramon";
var C_FORMAT_XML = "xml";
var C_FORMAT_JSON = "json";
var C_ACTION_LIST_EVENTS = "list";
var C_ACTION_LIST_EVENTS_METHOD = "GET";
var C_ACTION_DELETE_EVENT = "delete";
var C_ACTION_DELETE_EVENT_METHOD = "GET";
var C_ACTION_ADD_EVENT = "add";
var C_ACTION_ADD_EVENT_METHOD = "POST";
var C_ACTION_UPDATE_EVENT = "update";
var C_ACTION_UPDATE_EVENT_METHOD = "POST";
var C_ACTION_LIST_CATEGORIES = "list-categories";
var C_ACTION_LIST_CATEGORIES = "GET";
var C_ACTION_DELETE_CATEGORY = "delete-category";
var C_ACTION_DELETE_CATEGORY_METHOD = "GET";
var C_ACTION_ADD_CATEGORY = "add-categorie";
var C_ACTION_ADD_CATEGORY_METHOD = "POST";
var C_ACTION_UPLOAD_IMAGE = "upload-image";
var C_ACTION_UPLOAD_IMAGE_METHOD = "POST";
var C_ACTION_DELETE_IMAGE = "delete-image";
var C_ACTION_DELETE_IMAGE_METHOD = "GET";
var C_ACTION_REMOVE_CATEGORY_FROM_EVENT = "remove-category";
var C_ACTION_REMOVE_CATEGORY_FROM_EVENT_METHOD = "GET";
var C_ACTION_ADD_CATEGORY_TO_EVENT = "put-category";
var C_ACTION_ADD_CATEGORY_TO_EVENT_METHOD = "GET";

//Functions

function actionListEvents(callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_LIST_EVENTS_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_LIST_EVENTS, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
/*    var formData = new FormData();
        formData.append("user",C_USER);
        formData.append("action", C_ACTION_LIST_EVENTS);
        formData.append("format", C_FORMAT_JSON);
    request.send(formData); */
    request.send(null);
}

function actionAddEvent(formData, callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_ADD_EVENT_METHOD, C_URL, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(formData);    
}

function loadingError() {
    alert("Error while loading data! Come back later.");
}

function serviceError() {
    alert("Error in the web service! Come back later.");
}

function clearView() {
    var views = document.getElementsByClassName("view");
    for(var i=0; i<views.length; i++) {
        views[i].style.display="none";
    }
    
}

//Functions for Event Handlers

function onClickMonth() {
    
}

function onClickWeek() {
    
}

function onClickDay() {
    
}

function onClickList() {
    actionListEvents(function(e){
        var response = JSON.parse(e.srcElement.responseText); 
        if("error" in response){
            serviceError();
            return;
        }
        clearView();
        document.getElementById("listView").style.display="block";
        var table = document.getElementById("listTable");
        var events = response.events.events;
        for(var i=0; i < events.length; i++) {
            var row = document.createElement("tr");
            var tdTitle = document.createElement("td");
                tdTitle.textContent = events[i].title;
                row.appendChild(tdTitle);
            var tdStart = document.createElement("td");
                tdStart.textContent = events[i].start;
                row.appendChild(tdStart);
            var tdEnd = document.createElement("td");
                tdEnd.textContent = events[i].end;
                row.appendChild(tdEnd);
            var tdStatus = document.createElement("td");
                tdStatus.textContent = events[i].status;
                row.appendChild(tdStatus);
            var tdAllday = document.createElement("td");
                tdAllday.textContent = events[i].allday;
                row.appendChild(tdAllday);
            var tdOrganizer = document.createElement("td");
                tdOrganizer.textContent = events[i].organizer;
                row.appendChild(tdOrganizer);
            var tdWebpage = document.createElement("td");
                tdWebpage.textContent = events[i].webpage;
                row.appendChild(tdWebpage);
            var tdLocation = document.createElement("td");
                tdLocation.textContent = events[i].location;
                row.appendChild(tdLocation);
            table.appendChild(row);    
        }
    },loadingError, null);
}

function onClickDiary(e) {
    
}

function onClickAddEvent(e) {
    clearView();
    document.getElementById("addEventView").style.display="block";
}

function onClickAddCategory(e) {
    
}

//Script

//clearView();

//Add Event Handler
document.getElementById("monthNavListItem").addEventListener("click",onClickMonth);
document.getElementById("weekNavListItem").addEventListener("click",onClickWeek);
document.getElementById("dayNavListItem").addEventListener("click",onClickDay);
document.getElementById("listNavListItem").addEventListener("click",onClickList);
document.getElementById("diaryNavListItem").addEventListener("click",onClickDiary);
document.getElementById("addEventNavListItem").addEventListener("click",onClickAddEvent);
document.getElementById("addCategoryNavListItem").addEventListener("click", onClickAddCategory);