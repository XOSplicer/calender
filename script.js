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

//Functions for webservice

function actionListEvents(callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_LIST_EVENTS_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_LIST_EVENTS, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

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

function actionListCategries(callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_LIST_CATEGORIES_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_LIST_CATEGORIES, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

function actionDeleteCategory(id, callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_DELETE_CATEGORY_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_DELETE_CATEGORY+"&id="+id, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

function deleteCategory(id) {
    actionDeleteCategory(id, function(e) {
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            succsessMessage("Category deleted successfully.");
            clearView();
            onClickAddCategory();
        }
    }, sendingError, null);
}

function actionDeleteEvent(id, callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_DELETE_EVENT_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_DELETE_EVENT+"&id="+id, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

function deleteEvent(id) {
    actionDeleteEvent(id, function(e) {
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            succsessMessage("Event deleted successfully.");
            clearView();
            onClickList();
        }
    }, sendingError, null);
}

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

function actionAddCategoryToEvent(eventId, categoryId, callbackSuccess, callbackError, callbackProgress) {
     var request = new XMLHttpRequest();
        request.open(C_ACTION_ADD_CATEGORY_TO_EVENT_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_ADD_CATEGORY_TO_EVENT+"&event="+eventId+"&category="+categoryId, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

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

function uploadImage(formData) {
    actionUploadImage(formData, function(e) {
       var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            succsessMessage("Image uploaded successfully.");
            clearView();
            onClickList();
        }
    }, sendingError, null);
}

function actionDeleteImage(id, callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_DELETE_IMAGE_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_DELETE_IMAGE+"&id="+id, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

function deleteImage(id) {
    actionDeleteImage(id, function(e) {
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            succsessMessage("Image deleted successfully.");
            clearView();
            onClickList();
        }
    }, sendingError, null);   
}

function actionRemoveCategoryFromEvent(eventId, categoryId, callbackSuccess, callbackError, callbackProgress) {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_REMOVE_CATEGORY_FROM_EVENT_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_REMOVE_CATEGORY_FROM_EVENT+"&event="+eventId+"&category="+categoryId, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

function removeCategoryFromEvent(eventId, categoryId) {
    actionRemoveCategoryFromEvent(eventId, categoryId, function(e) {
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            if(response["error"].id!="0061") {
               serviceError();
                console.log(e.target.responseText);
                return; 
            }
        } else {
            
        }
    }, sendingError, null); 
}

function actionAddCategoryToEvent(eventId, categoryId, callbackSuccess, callbackError, callbackProgress)  {
    var request = new XMLHttpRequest();
        request.open(C_ACTION_ADD_CATEGORY_TO_EVENT_METHOD, C_URL+"?user="+C_USER+"&format="+C_FORMAT_JSON+"&action="+C_ACTION_ADD_CATEGORY_TO_EVENT+"&event="+eventId+"&category="+categoryId, true);
        request.addEventListener("load", callbackSuccess, false);
        request.addEventListener("error", callbackError, false);
        request.addEventListener("abort", callbackError, false);
        request.addEventListener("progress", callbackProgress, false);
    request.send(null);
}

function addCategoryToEvent(eventId, categoryId) {
    actionAddCategoryToEvent(eventId, categoryId, function(e) {
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            if(response["error"].id!="0064") {
               serviceError();
                console.log(e.target.responseText);
                return; 
            }
        } else {
            
        }
    }, sendingError, null); 
}

//Functions for messages

function loadingError() {
    document.getElementById("loadingErrorMsg").style.display="block";
    setTimeout(function(e) {
        document.getElementById("loadingErrorMsg").style.display="none";
    }, 3000);
}

function sendingError() {
    document.getElementById("sendingErrorMsg").style.display="block";
    setTimeout(function(e) {
        document.getElementById("sendingErrorMsg").style.display="none";
    }, 3000);
}

function serviceError() {
    document.getElementById("serviceErrorMsg").style.display="block";
    setTimeout(function(e) {
        document.getElementById("serviceErrorMsg").style.display="none";
    }, 3000);
}

function succsessMessage(msg) {
    document.getElementById("successMsg").style.display="block";
    document.getElementById("successMsg").getElementsByTagName("span")[0].textContent=msg;
    setTimeout(function(e) {
        document.getElementById("successMsg").style.display="none";
    }, 3000);
}

function clearView() {
    var views = document.getElementsByClassName("view");
    for(var i=0; i<views.length; i++) {
        views[i].style.display="none";
    }
}

function clearMsg() {
    var msgs = document.getElementsByClassName("msg");
    for(var i=0; i<msgs.length; i++) {
        msgs[i].style.display="none";
    }
}

//Functions for Event Handlers

function toggleEventDetails(event) {
    if(event.getElementsByClassName("eventDetails")[0].style.display=="none") {
        event.getElementsByClassName("eventDetails")[0].style.display="block";
    }
    else {
        event.getElementsByClassName("eventDetails")[0].style.display="none";
    }
}

function createHiddenId(id) {
    var hiddenId = document.createElement("span");
        hiddenId.textContent = id;
        hiddenId.style.display = "none";
        hiddenId.className = "hiddenId";
    return hiddenId;
}

function appendEvent(eventObj) {
    var eventList = document.getElementById("eventList");
    var event = document.createElement("div");
        event.className = "event";
    
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
    
    var title = document.createElement("h3");
        title.textContent = eventObj.title;
    event.appendChild(title);
    
    var general = document.createElement("div");
        general.className = "eventGeneral";
    var generalTable = document.createElement("table");
        generalTable.innerHTML = "<tr><td>From</td><td></td></tr><tr><td>Until</td><td></td></tr><tr><td></td><td></td></tr>";
    var start = new Date(eventObj.start);
        generalTable.getElementsByTagName("td")[1].textContent = start.toGMTString().substring(16,22)+", "+start.toGMTString().substring(0,16);
    var end = new Date(eventObj.end);
        generalTable.getElementsByTagName("td")[3].textContent = end.toGMTString().substring(16,22)+", "+end.toGMTString().substring(0,16);
    if(eventObj.allday=="1") generalTable.getElementsByTagName("td")[5].textContent = "Allday Event"
    general.appendChild(generalTable);
    event.appendChild(general);
    
    var details = document.createElement("div");
        details.className = "eventDetails";
    
    var detailsdiv = document.createElement("div");    
    var detailsTable = document.createElement("table");
        detailsTable.innerHTML = "<tr><td>Status</td><td></td></tr><tr><td>Organizer</td><td><a></a></td></tr><tr><td>Webpage</td><td><a></a></td></tr><tr><td>Location</td><td></td></tr>";
        detailsTable.getElementsByTagName("td")[1].textContent = eventObj.status;
    detailsTable.getElementsByTagName("a")[0].textContent = eventObj.organizer;
    detailsTable.getElementsByTagName("a")[0].href = "mailto:"+eventObj.organizer;
    detailsTable.getElementsByTagName("a")[1].textContent = eventObj.webpage;
    detailsTable.getElementsByTagName("a")[1].href = eventObj.webpage;
    detailsTable.getElementsByTagName("a")[1].target = "_blank";
    detailsTable.getElementsByTagName("td")[7].textContent = eventObj.location;
    detailsdiv.appendChild(detailsTable);
    details.appendChild(detailsdiv);
    
    var categories = document.createElement("div");
        categories.className = "eventCategories";
        categories.innerHTML = "<table><tr><td>Categories</td><td></td></tr></table>";
    for(var i=0; i<eventObj.categories.length; i++) {
        var span = document.createElement("span");
            span.textContent = eventObj.categories[i].name;
        categories.getElementsByTagName("td")[1].appendChild(span);
    }
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
    
    var picture = document.createElement("div");
        picture.className = "eventPicture";
    if(eventObj.imageurl=="") {
        picture.innerHTML = "No Image<br>Upload one: <br><form><input type=\"file\" accept=\"image/*\" name=\"file\"><input type=\"text\" name=\"id\" hidden=\"hidden\" style=\"display:none;\"><input type=\"submit\" class=\"btn btn-sm btn-b smooth\" value=\"Upload\" name=\"submit\"></form>";
        picture.getElementsByTagName("form")[0].elements["id"].value = eventObj.id;
        picture.getElementsByTagName("form")[0].addEventListener("submit", function(e) {
            e.preventDefault();
            var formData = new FormData(e.target);
            uploadImage(formData);
       });
    } else {
        picture.innerHTML="";
        var imglink = document.createElement("a");
            imglink.href = eventObj.imageurl;
            imglink.target = "_blank";
            imglink.title = "Display Image for Event "+eventObj.title;
        var img = document.createElement("img");
            img.src = eventObj.imageurl;
            img.alt = "Image for Event "+eventObj.title;
        imglink.appendChild(img);
        picture.appendChild(imglink);
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
    toggleEventDetails(event);
}

function onClickList(e) {
    clearView();
    document.getElementById("listView").style.display="block";
    actionListEvents(function(e){
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            var events = response.events.events;
            document.getElementById("eventList").innerHTML="";
            for(var i=0; i < events.length; i++) {
                appendEvent(events[i]);
            }
        }
    }, loadingError, null);    
}

function onClickAddEvent(e) {
    clearView();
    document.getElementById("addEventView").style.display="block";
    var form = document.getElementById("addEventForm");
        form.reset();
    var start   = new Date();
    var end     = new Date(start);
        end.setHours(start.getHours()+1);
        form.elements["startDate"].value = start.toJSON().substring(0,10);
        form.elements["startTime"].value = start.toJSON().substring(11,16);
        form.elements["endDate"].value = end.toJSON().substring(0,10);
        form.elements["endTime"].value = end.toJSON().substring(11,16);
}

function listCategories() {
    actionListCategries(function(e){
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            var list = document.getElementById("categoryList");
                list.innerHTML = "";
            var categories = response.categories.categories;
            for(var i=0; i<categories.length; i++){
                var item = document.createElement("li");
                    item.textContent = categories[i].name;
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

function onClickAddCategory(e) {
    clearView();
    document.getElementById("addCategoryView").style.display="block";
    document.getElementById("addCategoryForm").reset();
    listCategories();
}

function onSubmitAddEvent(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    formData.append("start", e.target.elements["startDate"].value+"T"+e.target.elements["startTime"].value);
    formData.append("end", e.target.elements["endDate"].value+"T"+e.target.elements["endTime"].value);
    actionAddEvent(formData, function(e) {
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            serviceError();
            console.log(e.target.responseText);
            return;
        }
        else {
            succsessMessage("Event added successfully.");
            clearView();
            onClickList();
        }
    }, sendingError, null);
}

function onClickEditEvent(id) {
    clearView();
    document.getElementById("editEventView").style.display="block";
    //get event infos based on id
    actionListEvents(function(e){
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            var events = response.events.events;
            var event;
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
                if(event.allday=="1") form.elements["allday"].checked="checked";
                    else  form.elements["allday"].checked="unchecked";
                form.elements["status"].value = event.status;
                form.elements["organizer"].value = event.organizer;
                form.elements["webpage"].value = event.webpage;
                form.elements["location"].value = event.location;
        }
    }, loadingError, null);
}

function onSubmitEditEvent(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    formData.append("start", e.target.elements["startDate"].value+"T"+e.target.elements["startTime"].value);
    formData.append("end", e.target.elements["endDate"].value+"T"+e.target.elements["endTime"].value);
    actionUpdateEvent(formData, function(e){
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            serviceError();
            console.log(e.target.responseText);
            return;
        }
        else {
            succsessMessage("Event updated successfully.");
            clearView();
            onClickList();
        }
    }, sendingError, null);
}

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

function onSubmitAddCategory(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    actionAddCategory(formData, function(e) {
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            serviceError();
            console.log(e.target.responseText);
            return;
        }
        else {
            succsessMessage("Category added successfully.");
            clearView();
            onClickAddCategory();
        }
    }, sendingError, null);
}

function onClickLogo(e) {
    succsessMessage("Yes, it's a calender, kinda.");
    onClickList();
}

function onClickEditCategories(eventId) {
    clearView();
    document.getElementById("editCategoriesView").style.display="block";
    //get event infos based on id
    actionListEvents(function(e){
        var response = JSON.parse(e.target.responseText); 
        if("error" in response){
            serviceError();
            console.log(e.target.responseText);
            return;
        } else {
            var events = response.events.events;
            var event;
            for(var i=0; i<events.length; i++) {
                if (events[i].id==eventId) event = events[i];
            }
            document.getElementById("editCategoriesEventTitle").textContent = event.title;
            document.getElementById("editCategoriesForm").elements["id"].value = event.id;
            //get Category List
            actionListCategries(function(e){
                var response = JSON.parse(e.target.responseText); 
                if("error" in response){
                    serviceError();
                    console.log(e.target.responseText);
                    return;
                } else {
                    var div = document.getElementById("editCategoriesFormCategoryList");
                        div.innerHTML = "";
                    var categories = response.categories.categories;
                    for(var i=0; i<categories.length; i++){
                        var checkbox = document.createElement("input");
                            checkbox.type = "checkbox";
                            checkbox.name = categories[i].id;
                            checkbox.value = categories[i].id;
                            checkbox.id = "cat"+categories[i].id;
                            for(var m=0; m<event.categories.length;m++) {
                                if(event.categories[m].id==categories[i].id) checkbox.checked = "true";
                            }
                        div.appendChild(checkbox);
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

function onSubmitEditCategories(e) {
    e.preventDefault();
    var checkList = document.getElementById("editCategoriesFormCategoryList").getElementsByTagName("input");
    for(var i=0; i<checkList.length; i++) {
        if(checkList[i].checked) {   addCategoryToEvent(document.getElementById("editCategoriesForm").elements["id"].value,checkList[i].attributes["name"].value);
        } else {        removeCategoryFromEvent(document.getElementById("editCategoriesForm").elements["id"].value,checkList[i].attributes["name"].value);
        }
    }
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

//Script

clearView();
clearMsg();
onClickList();