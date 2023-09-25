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
            }

        });
    }
   






    //Queue Stuff

    function addToQ(name) {
        songQueue.push(name)
        console.log(songQueue)
    }
   
      

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