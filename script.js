//Constants

var C_URL = "http://host.bisswanger.com/dhbw/calendar.php";
var C_USER = "6079153";
//var C_USER = "ramon";nt
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
var C_ACTION_LIST_CATEGORIES_METHOD = "GET";
var C_ACTION_DELETE_CATEGORY = "delete-category";
var C_ACTION_DELETE_CATEGORY_METHOD = "GET";
var C_ACTION_ADD_CATEGORY = "add-category";
var C_ACTION_ADD_CATEGORY_METHOD = "POST";
var C_ACTION_UPLOAD_IMAGE = "upload-image";
var C_ACTION_UPLOAD_IMAGE_METHOD = "POST";
var C_ACTION_DELETE_IMAGE = "delete-image";
var C_ACTION_DELETE_IMAGE_METHOD = "GET";
var C_ACTION_REMOVE_CATEGORY_FROM_EVENT = "remove-category";
var C_ACTION_REMOVE_CATEGORY_FROM_EVENT_METHOD = "GET";
var C_ACTION_ADD_CATEGORY_TO_EVENT = "put-category";
var C_ACTION_ADD_CATEGORY_TO_EVENT_METHOD = "GET";

//Functions for Month View

// these are labels for the days of the week
cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// these are human-readable month name labels, in order
cal_months_labels = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];
// these are the days of the week for each month, in order
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// this is the current date
cal_current_date = new Date(); 
//Calender constructor
function Calendar(month, year) {
  this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
  this.year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
  this.html = '';
}
//HTML Generation
Calendar.prototype.generateHTML = function(){
    var firstDay = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay();
    var monthLength = cal_days_in_month[this.month];
    if (this.month == 1) { // February only! in leap year
        if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
        monthLength = 29;
        }
    }
    //HTML Table Header
    var monthName = cal_months_labels[this.month];
    var html = '<table class="calendar-table">';
    html += '<tr><th colspan="7">';
    html += '<a class="btn btn-sm btn-a smooth" id="btnMonthPrev" title="Previous month"><</a>';
    html +=  monthName + "&nbsp;" + this.year;
    html += '<a class="btn btn-sm btn-a smooth" id="btnMonthNext" title="Next month">></a>';
    html += '</th></tr>';
    html += '<tr class="calendar-header">';
    for (var i = 0; i <= 6; i++ ){
        html += '<td class="calendar-header-day">';
        html += cal_days_labels[i];
        html += '</td>';
    }
    html += '</tr><tr>';
    // fill in the days
    var day = 1;
    // this loop is for is weeks (rows)
    for (var i = 0; i < 9; i++) {
        // this loop is for weekdays (cells)
        for (var j = 0; j <= 6; j++) { 
            html += '<td class="calendar-day"';
            if (day <= monthLength && (i > 0 || j >= startingDay)) {
                var id = 'id="cal_day_'+this.year+'_'+this.month+'_'+day.toString()+'"';
                html += id+'>';
                html += day;
                html += '<div class="calendar-entry"></div>'
                day++;
            }
            html += '</td>';
        }
        // stop making rows if we've run out of days
        if (day > monthLength) {
            break;
        } else {
            html += '</tr><tr>';
        }
    }
    html += '</tr></table>';

    this.html = html;
}

Calendar.prototype.getHTML = function() {
  return this.html;
}

//Called to finally build the Calender into the MonthView
Calendar.prototype.build = function() {
    this.generateHTML();
    document.getElementById("month").innerHTML = this.getHTML();
    document.getElementById("btnMonthPrev").addEventListener("click", function(e) {
        var date = new Date(document.getElementById("monthView").getElementsByClassName("hiddenId")[0].textContent);
        var prev = new Date(date.setMonth(date.getMonth() - 1));
        document.getElementById("monthView").getElementsByClassName("hiddenId")[0].textContent=prev.toISOString();
        onClickList();
    });
    document.getElementById("btnMonthNext").addEventListener("click", function(e) {
        var date = new Date(document.getElementById("monthView").getElementsByClassName("hiddenId")[0].textContent);
        var next = new Date(date.setMonth(date.getMonth() + 1));
        document.getElementById("monthView").getElementsByClassName("hiddenId")[0].textContent=next.toISOString();
        onClickList();
    });
}

//Functions for webservice

//Ajax request to list the events
function actionListEvents(callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_LIST_EVENTS_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_LIST_EVENTS, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

//Ajax request to add a new event based on the form data
function actionAddEvent(formData, callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_ADD_EVENT_METHOD, C_URL, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
        formData.append("user",C_USER);
        formData.append("action", C_ACTION_ADD_EVENT);
        formData.append("format", C_FORMAT_JSON);
    request.send(formData);    
}

//Ajax request to add a new category based on the form data
function actionAddCategory(formData, callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_ADD_CATEGORY_METHOD, C_URL, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
        formData.append("user",C_USER);
        formData.append("action", C_ACTION_ADD_CATEGORY);
        formData.append("format", C_FORMAT_JSON);
    request.send(formData);
}

//Ajax request to list all the categories
function actionListCategries(callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_LIST_CATEGORIES_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_LIST_CATEGORIES, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

//Ajax request to delete a category by id
function actionDeleteCategory(id, callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_DELETE_CATEGORY_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_DELETE_CATEGORY+"&id="+id, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

//Wrapper for deleting a category
function deleteCategory(id) {
    //Make ajax request
    actionDeleteCategory(id, function(e) {
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            //error handling
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            //success msg and return to previous view
            succsessMessage("Category deleted successfully.");
            clearView();
            onClickAddCategory();
        }
    }, sendingError, null);
}

//Ajax request for deleting an event by id
function actionDeleteEvent(id, callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_DELETE_EVENT_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_DELETE_EVENT+"&id="+id, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

//wrapper for deleting an event
function deleteEvent(id) {
    //Make ajax request
    actionDeleteEvent(id, function(e) {
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            //error handling
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            //success msg and return to previous view
            succsessMessage("Event deleted successfully.");
            clearView();
            onClickList();
        }
    }, sendingError, null);
}

//Ajax request for updating an event by id based on the form data
function actionUpdateEvent(formData, callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_UPDATE_EVENT_METHOD, C_URL, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
        formData.append("user",C_USER);
        formData.append("action", C_ACTION_UPDATE_EVENT);
        formData.append("format", C_FORMAT_JSON);
    request.send(formData); 
}

//Ajax request for adding a caegory to an event by their ids
function actionAddCategoryToEvent(eventId, categoryId, callbackSuccess, callbackError, callbackProgress) {
     var request = new XMLHttpRequest();
        request.open(C_ACTION_ADD_CATEGORY_TO_EVENT_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_ADD_CATEGORY_TO_EVENT+"&event="+eventId+"&category="+categoryId, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

//Ajax request for upload an image for an event based on th form data
function actionUploadImage(formData, callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_UPLOAD_IMAGE_METHOD, C_URL, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
        formData.append("user",C_USER);
        formData.append("action", C_ACTION_UPLOAD_IMAGE);
        formData.append("format", C_FORMAT_JSON);
    request.send(formData);    
}

//Wrapper for uploading an image
function uploadImage(formData) {
    //Make ajax request
    actionUploadImage(formData, function(e) {
       var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            //Error handling
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            //success msg and return to previous view
            succsessMessage("Image uploaded successfully.");
            clearView();
            onClickList();
        }
    }, sendingError, null);
}

//Ajax request for deleting an image based on ots events id
function actionDeleteImage(id, callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_DELETE_IMAGE_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_DELETE_IMAGE+"&id="+id, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

//Wrapper for deleting an image
function deleteImage(id) {
    //Make ajax request
    actionDeleteImage(id, function(e) {
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            //Error handling
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            //success msg and return to previous view
            succsessMessage("Image deleted successfully.");
            clearView();
            onClickList();
        }
    }, sendingError, null);   
}

//Ajax request for removing a category from an event by their ids
function actionRemoveCategoryFromEvent(eventId, categoryId, callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_REMOVE_CATEGORY_FROM_EVENT_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_REMOVE_CATEGORY_FROM_EVENT+"&event="+eventId+"&category="+categoryId, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

//Wrapper for removing a category from an event
function removeCategoryFromEvent(eventId, categoryId) {
    actionRemoveCategoryFromEvent(eventId, categoryId, function(e) {
        //Make ajax request
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            if(response["error"].id!="0061") {
                //No error if removing a category that does not exist, or is not assigned to the event, or is removed twice
                //this prevents error msgs 
                //Error handling
                serviceError();
                console.log(e.target.responseText);
                return; 
            }
        } else {
            //Nothing to do here    
        }
    }, sendingError, null); 
}

//Ajax request for adding a category to an event
function actionAddCategoryToEvent(eventId, categoryId, callbackSuccess, callbackError, callbackProgress)  {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_ADD_CATEGORY_TO_EVENT_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_ADD_CATEGORY_TO_EVENT+"&event="+eventId+"&category="+categoryId, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

//Wrapper for adding a cstegory to an event
function addCategoryToEvent(eventId, categoryId) {
    //Make ajax request
    actionAddCategoryToEvent(eventId, categoryId, function(e) {
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            if(response["error"].id!="0064") {
                //No error if adding a category that is added twice, or is already assigned to the event
                //this prevents error msgs 
                //Error handling
                serviceError();
                console.log(e.target.responseText);
                return; 
            }
        } else {
            //Nothing to to here
        }
    }, sendingError, null); 
}

//Functions for messages

//Show a error message that indicates loading failures 
function loadingError() {
    document.getElementById("loadingErrorMsg").style.display="block";
    //Only display the msg for 3 sec
    setTimeout(function(e) {
        document.getElementById("loadingErrorMsg").style.display="none";
    }, 3000);
}

//Show a error message that indicates sending failures 
function sendingError() {
    document.getElementById("sendingErrorMsg").style.display="block";
    //Only display the msg for 3 sec
    setTimeout(function(e) {
        document.getElementById("sendingErrorMsg").style.display="none";
    }, 3000);
}

//Show a error message that indicates failures within the webservice
function serviceError() {
    document.getElementById("serviceErrorMsg").style.display="block";
    //Only display the msg for 3 sec
    setTimeout(function(e) {
        document.getElementById("serviceErrorMsg").style.display="none";
    }, 3000);
}

//Display a message that indicates a succsessfully done whatever
function succsessMessage(msg) {
    document.getElementById("successMsg").style.display="block";
    document.getElementById("successMsg").getElementsByTagName("span")[0].textContent=msg;
    //Only display the msg for 3 sec
    setTimeout(function(e) {
        document.getElementById("successMsg").style.display="none";
    }, 3000);
}

//Hide all the different views, so the side is empty 
function clearView() {
    var views = document.getElementsByClassName("view");
    for(var i=0; i<views.length; i++) {
        views[i].style.display="none";
    }
}

//Hide all the messages
function clearMsg() {
    var msgs = document.getElementsByClassName("msg");
    for(var i=0; i<msgs.length; i++) {
        msgs[i].style.display="none";
    }
}

//Functions for Event Handlers

//Toggles, wether the details of an event should be shown
//activated by clicking the "More"/"Less" button
function toggleEventDetails(event) {
    if(event.getElementsByClassName("eventDetails")[0].style.display=="none") {
        event.getElementsByClassName("eventDetails")[0].style.display="block";
    }
    else {
        event.getElementsByClassName("eventDetails")[0].style.display="none";
    }
}

//Creats an hidden span element that contains an id
//the content is often used to keep track of ids in the event handlers
function createHiddenId(id) {
    var hiddenId = document.createElement("span");
        hiddenId.textContent = id;
        hiddenId.className = "hiddenId";
    return hiddenId;
}

//Append a new event to the currently displayed list of events
//Will use information form the passed event object
function appendEvent(eventObj) {
        //create the surrounding div
    var eventList = document.getElementById("eventList");
    var event = document.createElement("div");
        event.className = "event";
    
    //create the buttons to delete / edit / hide/show details of an event
    //also set the corresponding event handlers
    //the hidden id span is used to pass the id of the evnt to the event handlers
    var control = document.createElement("div");
        control.className = "eventControl";
    var deleteBtn = document.createElement("a");
        deleteBtn.className = "btn btn-sm btn-c smooth";
        deleteBtn.textContent = "X";
        deleteBtn.title = "Delete this Event";
        deleteBtn.appendChild(createHiddenId(eventObj.id));
        deleteBtn.addEventListener("click", function(e) {
            deleteEvent(e.target.getElementsByClassName("hiddenId")[0].textContent);
        });
    control.appendChild(deleteBtn);
    control.appendChild(document.createElement("br"));
    var editBtn = document.createElement("a");
        editBtn.className = "btn btn-sm btn-b smooth";
        editBtn.textContent = "*";
        editBtn.title = "Edit this Event";
        editBtn.appendChild(createHiddenId(eventObj.id));
        editBtn.addEventListener("click", function(e) {
            onClickEditEvent(e.target.getElementsByClassName("hiddenId")[0].textContent);
        });
    control.appendChild(editBtn);
    control.appendChild(document.createElement("br"));
    var detailsBtn = document.createElement("a");
        detailsBtn.className = "btn btn-sm btn-a smooth";
        detailsBtn.textContent = "+";
        detailsBtn.title = "More";
        detailsBtn.addEventListener("click", function(e) {
            toggleEventDetails(e.target.parentElement.parentElement); 
            if(e.target.textContent=="+") {
                e.target.textContent="-";
                detailsBtn.title = "Less";
            } else {
                e.target.textContent="+"; 
                detailsBtn.title = "More";
            } 
        });
    control.appendChild(detailsBtn);
    event.appendChild(control);
    
    //creare the title of the event
    var title = document.createElement("h3");
        title.textContent = eventObj.title;
    event.appendChild(title);
    
    //create the general information section 
    var general = document.createElement("div");
        general.className = "eventGeneral";
    //create the inner table 
    var generalTable = document.createElement("table");
        generalTable.innerHTML = "<tr><td>From</td><td></td></tr><tr><td>Until</td><td></td></tr><tr><td></td><td></td></tr>";
    //fill the table with general information
    var start = new Date(eventObj.start);
        generalTable.getElementsByTagName("td")[1].textContent = start.toGMTString().substring(16,22)+", "+start.toGMTString().substring(0,16);
    var end = new Date(eventObj.end);
        generalTable.getElementsByTagName("td")[3].textContent = end.toGMTString().substring(16,22)+", "+end.toGMTString().substring(0,16);
    if(eventObj.allday=="1") generalTable.getElementsByTagName("td")[5].textContent = "Allday Event"
    general.appendChild(generalTable);
    event.appendChild(general);
    
    //creat the detailed information section
    var details = document.createElement("div");
        details.className = "eventDetails";
    
    var detailsdiv = document.createElement("div");  
    //create the inner table 
    var detailsTable = document.createElement("table");
        detailsTable.innerHTML = "<tr><td>Status</td><td></td></tr><tr><td>Organizer</td><td><a></a></td></tr><tr><td>Webpage</td><td><a></a></td></tr><tr><td>Location</td><td></td></tr>";
    //fill the table with detailed information
        detailsTable.getElementsByTagName("td")[1].textContent = eventObj.status;
    detailsTable.getElementsByTagName("a")[0].textContent = eventObj.organizer;
    detailsTable.getElementsByTagName("a")[0].href = "mailto:"+eventObj.organizer;
    detailsTable.getElementsByTagName("a")[1].textContent = eventObj.webpage;
    detailsTable.getElementsByTagName("a")[1].href = eventObj.webpage;
    detailsTable.getElementsByTagName("a")[1].target = "_blank";
    detailsTable.getElementsByTagName("td")[7].textContent = eventObj.location;
    detailsdiv.appendChild(detailsTable);
    details.appendChild(detailsdiv);
    
    //create the category section
    var categories = document.createElement("div");
        categories.className = "eventCategories";
        categories.innerHTML = "<table><tr><td>Categories</td><td></td></tr></table>";
    //fill the inner table with the category information for this event
    for(var i=0; i<eventObj.categories.length; i++) {
        var span = document.createElement("span");
            span.textContent = eventObj.categories[i].name;
        categories.getElementsByTagName("td")[1].appendChild(span);
    }
    //create a button to edit the categories for this event
    //also set the corresponding event handlers
    //the hidden id span is used to pass the id of the evnt to the event handlers
    var editCatsBtn = document.createElement("a");
        editCatsBtn.className = "btn btn-sm btn-b smooth";
        editCatsBtn.textContent = "*";
        editCatsBtn.title = "Edit Categoris for this Event";
        editCatsBtn.appendChild(createHiddenId(eventObj.id));
        editCatsBtn.addEventListener("click", function(e) {
            onClickEditCategories(e.target.getElementsByClassName("hiddenId")[0].textContent);
        });    
    categories.getElementsByTagName("td")[1].appendChild(editCatsBtn);
    details.appendChild(categories);
    
    //create the image section  
    var picture = document.createElement("div");
        picture.className = "eventPicture";
    if(eventObj.imageurl=="") {
        //If no image given, create a form to upload one
        picture.innerHTML = "No Image<br>Upload one: <br><form><input type=\"file\" accept=\"image/*\" name=\"file\"><input type=\"text\" name=\"id\" hidden=\"hidden\" style=\"display:none;\"><input type=\"submit\" class=\"btn btn-sm btn-b smooth\" value=\"Upload\" name=\"submit\"></form>";
        picture.getElementsByTagName("form")[0].elements["id"].value = eventObj.id;
        picture.getElementsByTagName("form")[0].addEventListener("submit", function(e) {
            e.preventDefault();
            var formData = new FormData(e.target);
            uploadImage(formData);
       });
    } else {
        //If image is present display it
        picture.innerHTML="";
        //make the image clickable to is will open larger in a new tab
        var imglink = document.createElement("a");
            imglink.href = eventObj.imageurl;
            imglink.target = "_blank";
            imglink.title = "Display Image for Event "+eventObj.title;
        var img = document.createElement("img");
            img.src = eventObj.imageurl;
            img.alt = "Image for Event "+eventObj.title;
        imglink.appendChild(img);
        picture.appendChild(imglink);
        //create a button to delete the image
        var deleteImgBtn = document.createElement("a");
            deleteImgBtn.className = "btn btn-sm btn-c smooth";
            deleteImgBtn.textContent = "Delete Image";
            deleteImgBtn.appendChild(createHiddenId(eventObj.id));
            deleteImgBtn.addEventListener("click", function(e) {
                deleteImage(e.target.getElementsByClassName("hiddenId")[0].textContent);
        });
        picture.appendChild(deleteImgBtn);
    }
    details.appendChild(picture);
    
    event.appendChild(details);
    eventList.appendChild(event);
    toggleEventDetails(event); //Details now callapsed
}

//show the list of events
//activated by clicking the "Events" tab or in the code
//uses appendEvent() to create the list
function onClickList(e) {
    //show the event list view
    clearView();
    document.getElementById("listView").style.display="block";
    //set Month view
    var date = new Date(document.getElementById("monthView").getElementsByClassName("hiddenId")[0].textContent);
    var cal = new Calendar(date.getMonth(), date.getFullYear());
        cal.build();
    //ajax request to list the events
    actionListEvents(function(e){
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            //error handling
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            var events = response.events.events;
            //Sort the events based on dates according to the hiddenSort value (1 or -1)
            var direction = document.getElementById("hiddenSort").textContent;
            events.sort(function(a,b) {
                var sa = new Date(a.start);
                var sb = new Date(b.start);
                if (sa > sb) return direction * 1;
                else return direction * -1;
            });
            //if filter is set filter by the title
            var filterStr = document.getElementById("filterForm").elements["filter"].value;
            if(filterStr != "") {
                events = events.filter(function(e) {
                    return e.title.toLocaleLowerCase().search(filterStr.toLocaleLowerCase()) != -1;
                });
            }
            document.getElementById("eventList").innerHTML="";
            //append  all the events to the list
            for(var i=0; i < events.length; i++) {
                appendEvent(events[i]);
                //set Month Date BG color
                var sa = new Date(events[i].start);
                var ea = new Date(events[i].end);
                while(sa<=ea) {
                     if(sa.getFullYear()==cal.year && sa.getMonth()==cal.month && sa.getDate()<=cal_days_in_month[cal.month]) {
                   //console.log('cal_day_'+sa.getFullYear()+'_'+sa.getMonth()+'_'+sa.getDate());
                    document.getElementById('cal_day_'+sa.getFullYear()+'_'+sa.getMonth()+'_'+sa.getDate()).style.backgroundColor = "#0ae";
                    document.getElementById('cal_day_'+sa.getFullYear()+'_'+sa.getMonth()+'_'+sa.getDate()).getElementsByClassName("calendar-entry")[0].innerHTML += events[i].title+"<br>";      
                }
                    sa.setDate(sa.getDate()+1);
                }  
            }
        }
    }, loadingError, null);    
}

//show form to add a new event
//activated by clicking on "New Event"
function onClickAddEvent(e) {
    clearView();
    document.getElementById("addEventView").style.display="block";
    var form = document.getElementById("addEventForm");
    //reset, so no old data will be displayed
        form.reset();
    //set the current date values inside the form
    var start   = new Date();
    var end     = new Date(start);
        end.setHours(start.getHours()+1);
        form.elements["startDate"].value = start.toJSON().substring(0,10);
        form.elements["startTime"].value = start.toJSON().substring(11,16);
        form.elements["endDate"].value = end.toJSON().substring(0,10);
        form.elements["endTime"].value = end.toJSON().substring(11,16);
}

//list all the categories
function listCategories() {
    //Make ajax request 
    actionListCategries(function(e){
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            //Error handling
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            var list = document.getElementById("categoryList");
            //reset the list
                list.innerHTML = "";
            var categories = response.categories.categories;
            //fill the list
            for(var i=0; i<categories.length; i++){
                var item = document.createElement("li");
                    item.textContent = categories[i].name;
                //create button to delete the category
                //also set the corresponding event handlers
                //the hidden id span is used to pass the id of the evnt to the event handlers
                var span = document.createElement("span");
                    span.className = "btn btn-sm btn-c smooth";
                    span.textContent = "X";
                    span.title = "Delete this Category";
                var hiddenId = document.createElement("span");
                    hiddenId.textContent = categories[i].id;
                    hiddenId.style.display = "none";
                    hiddenId.className = "hiddenId";
                    span.appendChild(hiddenId);
                    span.addEventListener("click", function(e){
                        deleteCategory(e.target.getElementsByClassName("hiddenId")[0].textContent);
                    });
                item.appendChild(span);
                list.appendChild(item);
            }
        }
    },loadingError, null);
}

//show the form to add a category and list all the categories
//activated by clicking the "Categories" tab or in the code
function onClickAddCategory(e) {
    clearView();
    document.getElementById("addCategoryView").style.display="block";
    document.getElementById("addCategoryForm").reset();
    listCategories();
}

//Event handler to add a new event
//activated by clicking the Submit button
function onSubmitAddEvent(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    //make start end end date compatible to webservice
    formData.append("start", e.target.elements["startDate"].value+"T"+e.target.elements["startTime"].value);
    formData.append("end", e.target.elements["endDate"].value+"T"+e.target.elements["endTime"].value);
    //Make ajax request
    actionAddEvent(formData, function(e) {
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            //error handling
            serviceError();
            console.log(e.target.responseText);
            return;
        }
        else {
            //success msg and return to previous view
            succsessMessage("Event added successfully.");
            clearView();
            onClickList();
        }
    }, sendingError, null);
}

//show the form to edit an event by id
//needs to get the information of the event again by getting the list from the webservice and choosing the right event
//activated by clicking on the "*" edit buton for an event
function onClickEditEvent(id) {
    clearView();
    document.getElementById("editEventView").style.display="block";
    //get event infos based on id
    actionListEvents(function(e){
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            //Error handling
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            var events = response.events.events;
            var event;
            //get the event with the id
            for(var i=0; i<events.length; i++) {
                if (events[i].id==id) event = events[i];
            }
            //fill form
            var form = document.getElementById("editEventForm");
                form.elements["id"].value = id;
                form.elements["title"].value = event.title;
                var start = event.start;
                form.elements["startDate"].value = start.substring(0,10);
                form.elements["startTime"].value = start.substring(11,16);
                var end = event.end;
                form.elements["endDate"].value = end.substring(0,10);
                form.elements["endTime"].value = end.substring(11,16);
                if(event.allday==1){
                    form.elements["allday"].checked=true;
                }else{
                    form.elements["allday"].checked=false;
                }
                form.elements["status"].value = event.status;
                form.elements["organizer"].value = event.organizer;
                form.elements["webpage"].value = event.webpage;
                form.elements["location"].value = event.location;
        }
    }, loadingError, null);
}

//Event handler to edit a event
//activated by clicking the Submit button
function onSubmitEditEvent(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    //make start end end date compatible to webservice
    formData.append("start", e.target.elements["startDate"].value+"T"+e.target.elements["startTime"].value);
    formData.append("end", e.target.elements["endDate"].value+"T"+e.target.elements["endTime"].value);
    //Make ajax request
    actionUpdateEvent(formData, function(e){
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            //Error handling
            serviceError();
            console.log(e.target.responseText);
            return;
        }
        else {
            //success msg and return to previous view
            succsessMessage("Event updated successfully.");
            clearView();
            onClickList();
        }
    }, sendingError, null);
}

//Make sure the right times are entered when "allday" is checked by setting and locking them
//release them on uncheck
//activated by checking/unchecking the "allday" checkbutton
function onClickAlldayEdit(e) {
    if(e.target.checked) {
        document.getElementById("eefStartTime").value = "00:00";
        document.getElementById("eefStartTime").readOnly=true;
        document.getElementById("eefEndTime").value = "23:59";
        document.getElementById("eefEndTime").readOnly=true;
    }
    else {
        document.getElementById("eefStartTime").readOnly=false;
        document.getElementById("eefEndTime").readOnly=false;
    }
}

//Make sure the right times are entered when "allday" is checked by setting and locking them
//release them on uncheck
//activated by checking/unchecking the "allday" checkbutton
function onClickAllday(e) {
    if(e.target.checked) {
        document.getElementById("aefStartTime").value = "00:00";
        document.getElementById("aefStartTime").readOnly=true;
        document.getElementById("aefEndTime").value = "23:59";
        document.getElementById("aefEndTime").readOnly=true;
    }
    else {
        document.getElementById("aefStartTime").readOnly=false;
        document.getElementById("aefEndTime").readOnly=false;
    }
}

//Event handler to add a new category
//activated by clicking the Submit button
function onSubmitAddCategory(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    //Make ajax request
    actionAddCategory(formData, function(e) {
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            //Error handling
            serviceError();
            console.log(e.target.responseText);
            return;
        }
        else {
            //success msg and return to previous view
            succsessMessage("Category added successfully.");
            clearView();
            onClickAddCategory();
        }
    }, sendingError, null);
}

//By clicking on "Calender" display a message and go to the event list view
function onClickLogo(e) {
    succsessMessage("Yes, it's a calender, kinda.");
    onClickList();
}

//Show the form to edit the assigned categories of an event by id
//needs to get the information of the event again by getting the list from the webservice and choosing the right event
//activated by clicking an the "*" edit categories button for an event
function onClickEditCategories(eventId) {
    //show the form
    clearView();
    document.getElementById("editCategoriesView").style.display="block";
    //get event infos based on id
    actionListEvents(function(e){
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            //Error handling
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            //get the event with the right id
            var events = response.events.events;
            var event;
            for(var i=0; i<events.length; i++) {
                if (events[i].id==eventId) event = events[i];
            }
            //show events title and set the id elemnt in the form
            document.getElementById("editCategoriesEventTitle").textContent = event.title;
            document.getElementById("editCategoriesForm").elements["id"].value = event.id;
            //get Category List so you can add all the available categories to the events
            actionListCategries(function(e){
                var response = JSON.parse(e.target.responseText); 
                if("error" in response){
                    //Error handling
                    serviceError();
                    console.log(e.target.responseText);
                    return;
                } else {
                    //list all the categories with checkboxed, check the ones already assigned to the event
                    var div = document.getElementById("editCategoriesFormCategoryList");
                        div.innerHTML = "";
                    var categories = response.categories.categories;
                    for(var i=0; i<categories.length; i++){
                        //create the checkbox
                        var checkbox = document.createElement("input");
                            checkbox.type = "checkbox";
                            checkbox.name = categories[i].id;
                            checkbox.value = categories[i].id;
                            checkbox.id = "cat"+categories[i].id;
                            for(var m=0; m<event.categories.length;m++) {
                                if(event.categories[m].id==categories[i].id) checkbox.checked = "true";
                            }
                        div.appendChild(checkbox);
                        //create the label fr the checkbox containing the category name
                        var label = document.createElement("label");
                            label.htmlFor = "cat"+categories[i].id;
                            label.textContent = categories[i].name;
                        div.appendChild(label);
                        div.appendChild(document.createElement("br"));
                    }
                }
            },loadingError, null);
        }
    }, loadingError, null);
}

//Event handler to save the categories for an event
//activated by clicking the Submit button
function onSubmitEditCategories(e) {
    e.preventDefault();
    //for all the categories, either add them or remove them from the event
    //get the category and event ids from the form
    var checkList = document.getElementById("editCategoriesFormCategoryList").getElementsByTagName("input");
    for(var i=0; i<checkList.length; i++) {
        if(checkList[i].checked) {   addCategoryToEvent(document.getElementById("editCategoriesForm").elements["id"].value,checkList[i].attributes["name"].value);
        } else {        removeCategoryFromEvent(document.getElementById("editCategoriesForm").elements["id"].value,checkList[i].attributes["name"].value);
        }
    }
    succsessMessage("Categories edited.");
    clearView();
    onClickList();
}

function onClickSort(e) {
    var hiddenSort = document.getElementById("hiddenSort");
    if(hiddenSort.textContent=="1") {
        hiddenSort.textContent = "-1";
        e.target.textContent = "Sorted downwards";
    }
    else {
        hiddenSort.textContent = "1";
        e.target.textContent = "Sorted upwards";
    }
    clearView();
    onClickList();
}

function onSubmitFilter(e) {
    e.preventDefault();
    clearView();
    onClickList();
}

//Add Event Handler
document.getElementById("eventsNav").addEventListener("click",onClickList);
document.getElementById("btnCancelEdit").addEventListener("click",onClickList);
document.getElementById("btnCancelAdd").addEventListener("click",onClickList);
document.getElementById("btnCancelEditCategories").addEventListener("click",onClickList);
document.getElementById("addEventBtn1").addEventListener("click",onClickAddEvent);
document.getElementById("addEventBtn2").addEventListener("click",onClickAddEvent);
document.getElementById("addEventBtn3").addEventListener("click",onClickAddEvent);
document.getElementById("categoriesNav").addEventListener("click", onClickAddCategory);
document.getElementById("addEventForm").addEventListener("submit", onSubmitAddEvent);
document.getElementById("aefAllday").addEventListener("click", onClickAllday);
document.getElementById("editEventForm").addEventListener("submit", onSubmitEditEvent);
document.getElementById("eefAllday").addEventListener("click", onClickAlldayEdit);    
document.getElementById("addCategoryForm").addEventListener("submit", onSubmitAddCategory);
document.getElementById("editCategoriesForm").addEventListener("submit", onSubmitEditCategories);
document.getElementsByClassName("pagename current")[0].addEventListener("click", onClickLogo);
document.getElementById("sortingBtn").addEventListener("click", onClickSort);
document.getElementById("filterForm").addEventListener("submit", onSubmitFilter);

//Script -  will be executed on load

document.getElementById("monthView").getElementsByClassName("hiddenId")[0].textContent = cal_current_date.toISOString();

clearView();
clearMsg();
onClickList();