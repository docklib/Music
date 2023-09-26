var Music = document.getElementById('Paudio')
var title = document.getElementById('SongName')
var artist = document.getElementById('Artist')
var cover2 = document.getElementById('Playericon')
//conditions 

var loop = false;

//FUNCTIONS








function showPlay() {
    document.getElementById('audio_play').style.display = 'none'
    document.getElementById('audio_pause').style.display = 'block'
}

function showPause() {
    document.getElementById('audio_play').style.display = 'block'
    document.getElementById('audio_pause').style.display = 'none'
}

function showLoop() {
    document.getElementById('loop').style.display = 'none'
    document.getElementById('loop2').style.display = 'block'
}

function showLoopp() {
    document.getElementById('loop').style.display = 'block'
    document.getElementById('loop2').style.display = 'none'
}






var songQueue = [

]






//END
var currentSong2;

    function play(song, title2, by, img, num) {
        //alert("Playing " + songInfo.TITLE + " by " + songInfo.BY);
        if(num) {
            currentSong2 = num
        }
        title.innerHTML = title2
        artist.innerHTML = by
        cover2.src = img
        Music.setAttribute('src', song)
        Music.addEventListener('canplaythrough', () => {
            Music.play()
        });

        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
             
              title: title2,
              artist: by,
              album: '',
              artwork: [
                { src: img,   sizes: '96x96',   type: 'image/png' },
                { src: img, sizes: '128x128', type: 'image/png' },
                { src: img, sizes: '192x192', type: 'image/png' },
                { src: img, sizes: '256x256', type: 'image/png' },
                { src: img, sizes: '384x384', type: 'image/png' },
                { src: img, sizes: '512x512', type: 'image/png' },
              ]
            });
        } else {
            navigator.mediaSession.metadata = new MediaMetadata({
             
                title: title2,
                artist: by,
                album: '',
                artwork: [
                  { src: img,   sizes: '96x96',   type: 'image/png' },
                  { src: img, sizes: '128x128', type: 'image/png' },
                  { src: img, sizes: '192x192', type: 'image/png' },
                  { src: img, sizes: '256x256', type: 'image/png' },
                  { src: img, sizes: '384x384', type: 'image/png' },
                  { src: img, sizes: '512x512', type: 'image/png' },
                ]
            });
        }
    }
    

    Music.addEventListener('play', () => {
        showPlay()
    });

    Music.addEventListener('pause', () => {
        showPause()
    });

    Music.addEventListener('ended', () => {
        if(loop===true) {
            Music.currentTime = 0;
        }
        console.log(currentSong2)
        autoPlay()
    });

    function autoPlay() {
        var songData;

        // URL to your external JSON file
        var jsonUrl;
        
        // Function to play a song
        
        
            jsonUrl = CurrentDir
            // Fetch the JSON data and create elements
            fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
            songData = data; // Assign the loaded data to the global variable

            var songKeys = Object.keys(songData);

            // Find the index of the current key
            var currentIndex = songKeys.indexOf(currentSong2);
        
            // Check if the currentKey exists and is not the last item in the list
            if (currentIndex !== -1 && currentIndex < songKeys.length - 1) {
                var nextKey = songKeys[currentIndex + 1];
                var songE = songData[nextKey]
                var idLower2 = songE.TITLE.toLowerCase()
                play(songE.path, songE.TITLE, songE.BY, songE.COVER, idLower2);

            } else {
                // Handle the case where the currentKey is the last item or doesn't exist
                console.log('?')
                if(currentIndex + 1 === songKeys.length) {
                    console.log('last song')
                }
                //console.log(currentIndex)
                //console.log(songKeys.length)
            }

        });
    }
   





    var timesQ = 0; // Initialize a counter for the queue
    
    function addToQ(name) {
        var song = CurrentArray[name];
    
        if (song) {
            timesQ++;
    
            var idLower5 = name.toLowerCase() + 'Queue' + timesQ;
    
            // Create an item in the same format as the original items
            var item = {
                [name]: song
            };
    
            songQueue.push(item); // Push the item to the songQueue
    
            // Create a new div element for the song
            var songDiv5 = document.createElement('div');
            songDiv5.setAttribute('id', idLower5);
            songDiv5.setAttribute('AR', name.toLowerCase());
            songDiv5.classList.add('Queueitem');
            songDiv5.innerHTML = `
                <img src="${song.COVER}" alt="${song.TITLE} Cover" class="coverSmall">
                <p class="smallTXT">${name}</p>
                <p class="art">${song.BY}</p>
                <i class="material-icons upQueue" onclick="moveItemInQueue(event, 'up')">expand_less</i>
                <i class="material-icons downQueue" onclick="moveItemInQueue(event, 'down')">expand_more</i>
            `;
    
            // Append the song div to the container
            document.getElementById('queueSongs').appendChild(songDiv5);
    
            console.log('added');
            console.log(songQueue);
        } else {
            console.log('Song not found in CurrentArray');
        }
    }
    

    function moveItemInQueue(event, direction) {
        var clickedElement = event.target;
        var parentElement = clickedElement.parentNode;
    
        var PLACEMENT = parentElement.getAttribute('ar');
    
        var container = document.getElementById('queueSongs');
        var elements = Array.from(container.querySelectorAll("div"));
    
        // Sort the elements by their 'ar' attribute
        elements.sort(function(a, b) {
            return parseInt(a.getAttribute('ar')) - parseInt(b.getAttribute('ar'));
        });
    
        // Find the current index of the clicked element
        var currentIndex = elements.indexOf(parentElement);
    
        if (direction === 'up' && currentIndex > 0) {
            // Move the element up in the array
            elements.splice(currentIndex, 1);
            elements.splice(currentIndex - 1, 0, parentElement);
    
            // Update 'ar' attributes
            for (var i = 0; i < elements.length; i++) {
                elements[i].setAttribute('ar', i + 1);
            }
        } else if (direction === 'down' && currentIndex < elements.length - 1) {
            // Move the element down in the array
            elements.splice(currentIndex, 1);
            elements.splice(currentIndex + 1, 0, parentElement);
    
            // Update 'ar' attributes
            for (var i = 0; i < elements.length; i++) {
                elements[i].setAttribute('ar', i + 1);
            }
        }
    
        // Repopulate the container with the updated elements
        container.innerHTML = '';
        elements.forEach(function(element) {
            container.appendChild(element);
        });
   
    }
    
  
    //To Do:

    //Add funtion to get first element in div to play

    //after get the item in the array to get song info

    //make it so you can shuffle, stop after song and play random after queue

    //add songs

    //other
    
    

if(Music.paused) {
    showPause()

} else {
    showPlay()
}

function playpause() {
    
    if(Music.paused) {
        Music.play()
    } else {
        Music.pause()
    }
}

function toggleL() {
    if(loop) {
        showLoop()
        loop = false
    } else {
        showLoopp()
        console.log('t')

        loop = true
    }
}




const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeElement = document.getElementById('curtime');
const totalTimeElement = document.getElementById('totaltime');

// Update the progress bar based on audio currentTime
Music.addEventListener('timeupdate', () => {
    const currentTime = Music.currentTime;
    const duration = Music.duration;
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = progress + '%';

    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    currentTimeElement.textContent = formattedTime;

    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);
    const formattedTotalTime = `${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
    totalTimeElement.textContent = formattedTotalTime;
});

// Update the audio currentTime when the user clicks on the progress bar
progressContainer.addEventListener('click', (e) => {
    const clickX = e.clientX - progressContainer.getBoundingClientRect().left;
    const containerWidth = progressContainer.clientWidth;
    const clickPercentage = (clickX / containerWidth);
    const newTime = Music.duration * clickPercentage;
    Music.currentTime = newTime;
});

setup()
function setup() {
    showPause()
    showLoop()

}

const volumeRange = document.getElementById('volumeRange');
const volumeValue = document.getElementById('volumeValue');

// Set initial volume to 100%
Music.volume = 1;
volumeRange.value = 1;
//volumeValue.textContent = '100%';

// Update the volume and volume value when the slider is moved
volumeRange.addEventListener('input', () => {
    const newVolume = volumeRange.value;
    Music.volume = newVolume;
    //volumeValue.textContent = `${Math.round(newVolume * 100)}%`;
});