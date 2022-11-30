window.onload = function () {
    //Fill the date field with todays date
    var loadDate = new this.Date();
    loadDate.setDate(loadDate.getDate() - 1);
    document.getElementById('DateInput').valueAsDate = loadDate;
    DisplayDots();

    //Update display if the checkbox is checked, or the date is changed
    document.getElementById('IncludeToday').addEventListener('change', (event) => {
        UpdateDots();
    })
    document.getElementById('DateInput').addEventListener('change', (event) => {
        UpdateDots();
    })
}

let IncludeToday = true;
let DayDotsArray = [3, 5, 7, 14, 30, 60];
//load cookie
const name = 'DayDotCookie' + "=";
const decodedCookie = decodeURIComponent(document.cookie);
let values = decodedCookie.split(';');
for (let i = 0; i < values.length; i++) {
    let item = values[i];
    while (item.charAt(0) == ' ') {
        item = item.substring(1);
    }
    if (item.indexOf(name) == 0) {
        DayDotsArray = JSON.parse(item.substring(name.length, item.length));
    }
}

//Messy as can be display spaghetti code. Create a clean solution to add a module all at once, and adjust select individual values.
function DisplayDots() {
    for (var i = 0; i < DayDotsArray.length; i++){
        var divModule = document.createElement("DIV");
            divModule.className = "label-object";
        var h3Days = document.createElement("H3");
            h3Days.className = "label-object-child";
            h3Days.id = DayDotsArray[i];
        var divSticker = document.createElement("DIV");
            divSticker.className = "sticker";
        var imgImage = document.createElement("IMG");
            imgImage.setAttribute("src", "_images/DayDot_Sun.png");
            imgImage.className = "label-object-child sticker img-no-select";
        var divDate = document.createElement("P");
            divDate.className = "date";
        var divDelete = document.createElement("DIV");
            divDelete.className = "delete";
        var trashButton = document.createElement("BUTTON");
            trashButton.id = DayDotsArray[i];
            trashButton.className = "trash-button";
        var trashElement = document.createElement("IMG");
            trashElement.className = "label-object-child trash-icon img-no-select";
            trashElement.setAttribute("src", "_images/trash.png");

            trashButton.onclick = function (){
                for (let x = 0; x < DayDotsArray.length; x++) {
                    if (DayDotsArray[x] == this.id) {
                        DayDotsArray.splice(x, 1);
                    }
                }
                SaveCookie();
                this.parentElement.remove();
            };

        divModule.appendChild(h3Days);
        divModule.appendChild(divSticker);
        divSticker.appendChild(imgImage);
        divSticker.appendChild(divDate);
        divModule.appendChild(trashButton);
        trashButton.appendChild(trashElement);
        const daydotText = document.createTextNode(DayDotsArray[i] + " Day:");
        h3Days.appendChild(daydotText);

        var myDate = document.getElementById('DateInput').valueAsDate;
        myDate.setDate(myDate.getDate() + 1);

        myDate.setDate(myDate.getDate() + DayDotsArray[i] - 1);
        var m = myDate.getMonth() + 1;
        var d = myDate.getDate();

        if (document.getElementById("IncludeToday").checked == false) {
            d += 1;
            myDate.setDate(myDate.getDate() + 1);
        }

        var displayDate = m + "/" + d;

        divDate.textContent = displayDate.toString();
        imgImage.setAttribute("src", DayCase(myDate));
        document.getElementById("label-container").appendChild(divModule);
    }
}

//Get image to display based on day of the week
function DayCase(selectedDate) {
    switch (selectedDate.getDay()) {
        case 0:
            return "_images/DayDot_Sun.png";
        case 1:
            return "_images/DayDot_Mon.png";
        case 2:
            return "_images/DayDot_Tue.png";
        case 3:
            return "_images/DayDot_Wed.png";
        case 4:
            return "_images/DayDot_Thur.png";
        case 5:
            return "_images/DayDot_Fri.png";
        case 6:
            return "_images/DayDot_Sat.png";
    }
}

function UpdateDots() {
    //Clear all elements in the label container
    while (document.getElementById("label-container").firstChild) {
        document.getElementById("label-container").removeChild(document.getElementById("label-container").firstChild);
    }
    //Get the user desired date to display
    AddToDate = new Date(document.getElementById("DateInput").value);
    AddToDate.setDate(AddToDate.getDate() + 1);
    //Sort the array in case there are any new added elements
    DayDotsArray.sort((a, b) => a - b);
    //Update cookies
    SaveCookie();
    //Display
    DisplayDots();
}

//Based on user entered value, add said value to Array and update display
function AddDayDot() {1
    DayDotsArray.push(Number(document.getElementById("DayInput").value));
    UpdateDots();
}

function SaveCookie(){
    var myDate = new Date();
    myDate.setTime(myDate.getTime() + (31 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + myDate.toUTCString();
    var json_str = JSON.stringify(DayDotsArray);
    document.cookie = 'DayDotCookie' + "=" + json_str + ";" + expires + ";path=/";
}

/*
    const htmlTest = document.createElement('div');
    htmlTest.innerHTML = (`
    <div class="label-object">
        <h3 class="label-object-child" id="0">77 Day:</h3>
        <div class="sticker">
            <img src="_images/DayDot_Tue.png" class="label-object-child sticker img-no-select">
            <p class="date">8/9</p>
        </div>
        <button>
            <img class="label-object-child trash-icon img-no-select" src="trash.png">
        </button>
    </div>
    `);
    
    //document.getElementById("label-container").appendChild(htmlTest);

*/