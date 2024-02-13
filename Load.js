var Music = document.getElementById('Paudio')
var CurrentDir;
var CurrentArray;
var songData;

// URL to your external JSON file
var jsonUrl;

// Function to play a song

function itemsAdd(url, element, browse) {
    jsonUrl = url
    // Fetch the JSON data and create elements
    fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
    songData = data; // Assign the loaded data to the global variable
    CurrentDir = url
    CurrentArray = data
    console.log(CurrentArray)
    if(!browse) {
        browse=false
    }
    // Get a reference to the container element where you want to append the songs
    var container = document.getElementById(element);
    // Loop through the songs in the JSON data
    if(!browse) {
        for ( var songKey in songData) {
            //if (songData.hasOwnProperty(songKey) && songKey.startsWith("SONG")) {
            if(songData.hasOwnProperty(songKey) && songKey.startsWith("Banner")) {
                var song = songData[songKey];

                // Create a new div element for each song
                var songDiv = document.createElement('div');
                songDiv.classList.add('itemBanner');
                if(song.mode === 'light') {
                    songDiv.innerHTML = `
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" class="Banner">
                    <div class="BannerPanel">
                        <h1 class="BannerTXTLight">${song.TITLE}</h1>
                        <p class="artistBannerLight">${song.BY}</p>
                    </div>
                `;
                } else {
                    songDiv.innerHTML = `
                        <img src="${song.COVER}" alt="${song.TITLE} Cover" class="Banner">
                        <div class="BannerPanel">
                            <h1 class="BannerTXT">${song.TITLE}</h1>
                            <p class="artistBanner">${song.BY}</p>
                        </div>
                    `;
                }

                // Create a closure to capture the current song's information
                (function (currentSong) {
                    songDiv.onclick = function () {
                        albumMove('Home', currentSong.to, currentSong.json, currentSong.bg);
                    };
                })(song);

                // Append the song div to the container
                container.appendChild(songDiv);

            } else if(songData.hasOwnProperty(songKey) && songKey.startsWith("SingleBAN")) {
                var song = songData[songKey];

                // Create a new div element for each song
                var songDiv = document.createElement('div');
                songDiv.classList.add('itemBanner');
                if(song.mode === 'light') {
                    songDiv.innerHTML = `
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" class="Banner">
                    <div class="BannerPanel">
                        <h1 class="BannerTXTLight">${song.TITLE}</h1>
                        <p class="artistBannerLight">${song.BY}</p>
                    </div>
                `;
                } else {
                    songDiv.innerHTML = `
                        <img src="${song.COVER}" alt="${song.TITLE} Cover" class="Banner">
                        <div class="BannerPanel">
                            <h1 class="BannerTXT">${song.TITLE}</h1>
                            <p class="artistBanner">${song.BY}</p>
                        </div>
                    `;
                }

                // Create a closure to capture the current song's information
                (function (currentSong) {
                    songDiv.onclick = function () {
                        albumMove('Home', currentSong.to, currentSong.json, currentSong.bg);
                    };
                })(song);
                var ELEMENTAL = document.getElementById(song.element)
                // Append the song div to the container
                ELEMENTAL.appendChild(songDiv);



                
            } else if(songData.hasOwnProperty(songKey) && songKey.startsWith("album")) {
                var song = songData[songKey];

                // Create a new div element for each song
            
                // Assign an onclick attribute that calls the play function with song information
            
                var songDiv2 = document.createElement('div');
                //songDiv.className = 'song'; // Assign a class
                songDiv2.setAttribute('id', 'ALBUMSANDSTUFF')
                songDiv2.classList.add('ALBUMB2')
                songDiv2.innerHTML = `
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" id="ALBUMPAGECOVERI" class="BannerFULL">
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" id="ALBUMPAGECOVERI2" class="gradimg">

                    <div class="BannerPanelF">
                        <h1 class="BannerTXTF">${song.TITLE}</h1>
                        <p class="artistPGF">${song.BY}</p>
                    </div>
                `;
                var albumPage = document.getElementById('albumPG')
                var albumPageBR = document.getElementById('moveBack')
                albumPage.insertBefore(songDiv2, albumPageBR)


                // Append the song div to the container
                console.log('added')

                var headervideo = document.getElementById('headvideo')
                if(song.TITLE === "Think U The Shit") {
                    headervideo.src = "./assets/headvids/icespice/ispicevid1.mp4"
                    headervideo.style.opacity = 1
                    headervideo.play()

                } else {
                    headervideo.src = ""
                    headervideo.style.opacity = 0
                }

                const covpgcc = document.getElementById('ALBUMPAGECOVERI2');

    covpgcc.onload = function () {
        const colorThief = new ColorThief();

        const dominantColor = colorThief.getColor(covpgcc);

        const gradientString = createGradientString(dominantColor);

        document.getElementById('albumPG').style.background = gradientString;

        console.log(dominantColor);
    };

    function createGradientString(rgbValues) {
        // Create a CSS gradient string
        const gradientString = `linear-gradient(to bottom, rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}), rgb(37, 37, 37), rgb(37, 37, 37))`;

        return gradientString;
    }
            } else if (songData.hasOwnProperty(songKey)) {
                var song = songData[songKey];

                // Create a new div element for each song
                var songDiv = document.createElement('div');
                //songDiv.setAttribute('id', song.TITLE);
                var idLower = song.TITLE.toLowerCase();
                songDiv.setAttribute('id', idLower)
                songDiv.classList.add('item');
                songDiv.innerHTML = `
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" class="coverSmall">
                    <p class="smallTXT">${song.TITLE}</p>
                    <p class="art">${song.BY}</p>
                    <i class="material-icons playSmall">play_arrow</i>
                `;

                // Create a closure to capture the current song's information
                
                (function (currentSong) {
                    var idLower23 = currentSong.TITLE.toLowerCase();
                    songDiv.onclick = function () {
                        play(currentSong.path, currentSong.TITLE, currentSong.BY, currentSong.COVER, idLower23);
                    };
                })(song);
                console.log('added')
                // Append the song div to the container
                container.appendChild(songDiv);
            } 
        }

    } else {
        for ( var songKey in songData) {

            if(songData.hasOwnProperty(songKey) && songKey.startsWith("alui")) {
                var song = songData[songKey];

                // Create a new div element for each song
                var songDiv = document.createElement('div');
                //songDiv.setAttribute('id', song.TITLE);
                var idLower = song.TITLE.toLowerCase();
                songDiv.setAttribute('id', idLower)
                songDiv.classList.add('item2');
                songDiv.innerHTML = `
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" class="coverSmall">
                    <p class="smallTXT">${song.TITLE}</p>
                    <p class="art">${song.BY + ' | ' + 'Album'}</p>
                    <i class="material-icons playSmall">arrow_right</i>
                `;
                

                // Create a closure to capture the current song's information
                (function (currentSong) {
                    songDiv.onclick = function () {
                        albumMove('browse', currentSong.to, currentSong.json, currentSong.bg);
                    };
                })(song);
                var ELEMENTAL = document.getElementById('songs6')
                // Append the song div to the container
                ELEMENTAL.appendChild(songDiv);
            } else if (songData.hasOwnProperty(songKey)) {
                var song = songData[songKey];

                // Create a new div element for each song
                var songDiv = document.createElement('div');
                //songDiv.setAttribute('id', song.TITLE);
                var idLower = song.TITLE.toLowerCase();
                songDiv.setAttribute('id', idLower)
                songDiv.classList.add('item');
                songDiv.innerHTML = `
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" class="coverSmall">
                    <p class="smallTXT">${song.TITLE}</p>
                    <p class="art">${song.BY}</p>
                    <i class="material-icons playSmall">play_arrow</i>
                `;

                // Create a closure to capture the current song's information
                
                (function (currentSong) {
                    var idLower23 = currentSong.TITLE.toLowerCase();
                    songDiv.onclick = function () {
                        play(currentSong.path, currentSong.TITLE, currentSong.BY, currentSong.COVER, idLower23, false, false);
                    };
                })(song);
                console.log('added')
                // Append the song div to the container
                var ELEMENTAL = document.getElementById('songs6')
                // Append the song div to the container
                ELEMENTAL.appendChild(songDiv);
            } 
        }
    }
  
    })
    .catch(error => console.error('Error loading JSON:', error)    );

}

function itemsAdd2(url, element, browse) {
    jsonUrl = url
    // Fetch the JSON data and create elements
    fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
    songData = localStorage.getItem(url); // Assign the loaded data to the global variable
    CurrentDir = url
    CurrentArray = data
    console.log(CurrentArray)
    if(!browse) {
        browse=false
    }
    // Get a reference to the container element where you want to append the songs
    var container = document.getElementById(element);
    // Loop through the songs in the JSON data
    if(!browse) {
        for ( var songKey in songData) {
            //if (songData.hasOwnProperty(songKey) && songKey.startsWith("SONG")) {
            if(songData.hasOwnProperty(songKey) && songKey.startsWith("Banner")) {
                var song = songData[songKey];

                // Create a new div element for each song
                var songDiv = document.createElement('div');
                songDiv.classList.add('itemBanner');
                if(song.mode === 'light') {
                    songDiv.innerHTML = `
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" class="Banner">
                    <div class="BannerPanel">
                        <h1 class="BannerTXTLight">${song.TITLE}</h1>
                        <p class="artistBannerLight">${song.BY}</p>
                    </div>
                `;
                } else {
                    songDiv.innerHTML = `
                        <img src="${song.COVER}" alt="${song.TITLE} Cover" class="Banner">
                        <div class="BannerPanel">
                            <h1 class="BannerTXT">${song.TITLE}</h1>
                            <p class="artistBanner">${song.BY}</p>
                        </div>
                    `;
                }

                // Create a closure to capture the current song's information
                (function (currentSong) {
                    songDiv.onclick = function () {
                        albumMove('Home', currentSong.to, currentSong.json, currentSong.bg);
                    };
                })(song);

                // Append the song div to the container
                container.appendChild(songDiv);

            } else if(songData.hasOwnProperty(songKey) && songKey.startsWith("SingleBAN")) {
                var song = songData[songKey];

                // Create a new div element for each song
                var songDiv = document.createElement('div');
                songDiv.classList.add('itemBanner');
                if(song.mode === 'light') {
                    songDiv.innerHTML = `
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" class="Banner">
                    <div class="BannerPanel">
                        <h1 class="BannerTXTLight">${song.TITLE}</h1>
                        <p class="artistBannerLight">${song.BY}</p>
                    </div>
                `;
                } else {
                    songDiv.innerHTML = `
                        <img src="${song.COVER}" alt="${song.TITLE} Cover" class="Banner">
                        <div class="BannerPanel">
                            <h1 class="BannerTXT">${song.TITLE}</h1>
                            <p class="artistBanner">${song.BY}</p>
                        </div>
                    `;
                }

                // Create a closure to capture the current song's information
                (function (currentSong) {
                    songDiv.onclick = function () {
                        albumMove('Home', currentSong.to, currentSong.json, currentSong.bg);
                    };
                })(song);
                var ELEMENTAL = document.getElementById(song.element)
                // Append the song div to the container
                ELEMENTAL.appendChild(songDiv);



                
            } else if(songData.hasOwnProperty(songKey) && songKey.startsWith("album")) {
                var song = songData[songKey];

                // Create a new div element for each song
            
                // Assign an onclick attribute that calls the play function with song information
            
                var songDiv2 = document.createElement('div');
                //songDiv.className = 'song'; // Assign a class
                songDiv2.setAttribute('id', 'ALBUMSANDSTUFF')
                songDiv2.classList.add('ALBUMB2')
                songDiv2.innerHTML = `
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" id="ALBUMPAGECOVERI" class="BannerFULL">
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" id="ALBUMPAGECOVERI2" class="gradimg">

                    <div class="BannerPanelF">
                        <h1 class="BannerTXTF">${song.TITLE}</h1>
                        <p class="artistPGF">${song.BY}</p>
                    </div>
                `;
                var albumPage = document.getElementById('albumPG')
                var albumPageBR = document.getElementById('moveBack')
                albumPage.insertBefore(songDiv2, albumPageBR)


                // Append the song div to the container
                console.log('added')

                const covpgcc = document.getElementById('ALBUMPAGECOVERI2');

    covpgcc.onload = function () {
        const colorThief = new ColorThief();

        const dominantColor = colorThief.getColor(covpgcc);

        const gradientString = createGradientString(dominantColor);

        document.getElementById('albumPG').style.background = gradientString;

        console.log(dominantColor);
    };

    function createGradientString(rgbValues) {
        // Create a CSS gradient string
        const gradientString = `linear-gradient(to bottom, rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}), rgb(37, 37, 37), rgb(37, 37, 37))`;

        return gradientString;
    }
            } else if (songData.hasOwnProperty(songKey)) {
                var song = songData[songKey];

                // Create a new div element for each song
                var songDiv = document.createElement('div');
                //songDiv.setAttribute('id', song.TITLE);
                var idLower = song.TITLE.toLowerCase();
                songDiv.setAttribute('id', idLower)
                songDiv.classList.add('item');
                songDiv.innerHTML = `
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" class="coverSmall">
                    <p class="smallTXT">${song.TITLE}</p>
                    <p class="art">${song.BY}</p>
                    <i class="material-icons playSmall">play_arrow</i>
                `;

                // Create a closure to capture the current song's information
                
                (function (currentSong) {
                    var idLower23 = currentSong.TITLE.toLowerCase();
                    songDiv.onclick = function () {
                        play(currentSong.path, currentSong.TITLE, currentSong.BY, currentSong.COVER, idLower23);
                    };
                })(song);
                console.log('added')
                // Append the song div to the container
                container.appendChild(songDiv);
            } 
        }

    } else {
        for ( var songKey in songData) {

            if(songData.hasOwnProperty(songKey) && songKey.startsWith("alui")) {
                var song = songData[songKey];

                // Create a new div element for each song
                var songDiv = document.createElement('div');
                //songDiv.setAttribute('id', song.TITLE);
                var idLower = song.TITLE.toLowerCase();
                songDiv.setAttribute('id', idLower)
                songDiv.classList.add('item2');
                songDiv.innerHTML = `
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" class="coverSmall">
                    <p class="smallTXT">${song.TITLE}</p>
                    <p class="art">${song.BY + ' | ' + 'Album'}</p>
                    <i class="material-icons playSmall">arrow_right</i>
                `;
                

                // Create a closure to capture the current song's information
                (function (currentSong) {
                    songDiv.onclick = function () {
                        albumMove('browse', currentSong.to, currentSong.json, currentSong.bg);
                    };
                })(song);
                var ELEMENTAL = document.getElementById('songs6')
                // Append the song div to the container
                ELEMENTAL.appendChild(songDiv);
            } else if (songData.hasOwnProperty(songKey)) {
                var song = songData[songKey];

                // Create a new div element for each song
                var songDiv = document.createElement('div');
                //songDiv.setAttribute('id', song.TITLE);
                var idLower = song.TITLE.toLowerCase();
                songDiv.setAttribute('id', idLower)
                songDiv.classList.add('item');
                songDiv.innerHTML = `
                    <img src="${song.COVER}" alt="${song.TITLE} Cover" class="coverSmall">
                    <p class="smallTXT">${song.TITLE}</p>
                    <p class="art">${song.BY}</p>
                    <i class="material-icons playSmall">play_arrow</i>
                `;

                // Create a closure to capture the current song's information
                
                (function (currentSong) {
                    var idLower23 = currentSong.TITLE.toLowerCase();
                    songDiv.onclick = function () {
                        play(currentSong.path, currentSong.TITLE, currentSong.BY, currentSong.COVER, idLower23, false, false);
                    };
                })(song);
                console.log('added')
                // Append the song div to the container
                var ELEMENTAL = document.getElementById('songs6')
                // Append the song div to the container
                ELEMENTAL.appendChild(songDiv);
            } 
        }
    }
  
    })
    .catch(error => console.error('Error loading JSON:', error)    );

}

console.warn('loaded in load.js but may take up too much ram')
