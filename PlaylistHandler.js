var menubg = document.getElementById('menucontainer2')
var nameplay = document.getElementById('nameplaylist')
var donescreen = document.getElementById('playlistmade')
var namevaluec = document.getElementById('nameplayl')
function makeplaylist() {
    console.log('making playlist')
    menubg.style.opacity = 0

    menubg.style.display = 'block'

    setTimeout(() => {
        menubg.style.opacity = 1
    }, 50);

    nameplay.style.opacity = 0

    nameplay.style.display = 'block'


    setTimeout(() => {
        nameplay.style.opacity = 1

    }, 300);


}
var finaltitle;
var localtitlefinal = 'PLAYLIST' + namevaluec.value

function handleplayliststuffe4() {

    finaltitle = namevaluec.value
    localtitlefinal = 'PLAYLIST' + namevaluec.value

    namevaluec.value = ''

    jsonmaker()

    nextscreenplay()
}
console.log(localtitlefinal)
function jsonmaker() {
    if(localStorage.getItem(localtitlefinal)) {

    } else {
    var data = {
        "album": {
            "COVER": "./assets/covers/cover.png",
            "TITLE": finaltitle,
            "BY": "You"
        }
    };

    var jsonconv = JSON.stringify(data);

    localStorage.setItem(localtitlefinal, jsonconv);



    }
}

function nextscreenplay() {
    nameplay.style.display = 'none'
    donescreen.style.display = 'block'
    setTimeout(() => {
        donescreen.style.display = 'none'
        menubg.style.display = 'none'
    }, 2000);
}

function handlenewsong(songitemse, playlistnamese) {
// Retrieve existing data from localStorage
var existingData = localStorage.getItem(playlistnamese); // Replace with your actual key

// Parse the existing JSON string to convert it back to an object
var existingObject = JSON.parse(existingData || "{}"); // If existingData is null or undefined, initialize with an empty object

// Assuming the key to search for is provided in a variable
var userSearchedItemKey = songitemse; // Replace with your actual variable

// Assuming the master JSON is stored in the same folder as your HTML file
var masterJsonUrl = './master.json';

// Fetch the master JSON
fetch(masterJsonUrl)
    .then(response => response.json())
    .then(masterJson => {
        // Check if the user-specified item key exists in the master JSON
        if (userSearchedItemKey in masterJson) {
            // Create a new object by combining the existing data and the matched item from the master JSON
            existingObject[userSearchedItemKey] = {
                ...existingObject[userSearchedItemKey],
                ...masterJson[userSearchedItemKey]
            };

            // Convert the updated object to a JSON string
            var updatedJsonString = JSON.stringify(existingObject);

            // Store the updated JSON string back in localStorage
            localStorage.setItem(playlistnamese, updatedJsonString); // Replace with your actual key

            // Log the updatedObject
            console.log(existingObject);
        } else {
            console.error('Item with key not found in masterJson');
        }
    })
    .catch(error => console.error('Error fetching master JSON:', error));

}