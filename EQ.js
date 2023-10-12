// Create or resume AudioContext when user interacts
var audioContext = null;
var audioSource = null;
var audio = document.getElementById('Paudio');

function makeAUDIOAC() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        start();
      
    } else if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            start();
            
        });
    } 

    
};

var started = false;

// Initialize EQ filters for specific frequencies
const frequencies = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

function start() {
    if (!started) {
        const resetButton9 = document.getElementById('resetButton');
        audioSource = audioContext.createMediaElementSource(audio);
        const eqContainer = document.getElementById('sliderCONT');
        const sliders = eqContainer.querySelectorAll('input[type="range"]');
        const eqBars = document.querySelectorAll('.eq-band');

        const eqFilters = [];

        for (const freq of frequencies) {
            const eq = audioContext.createBiquadFilter();
            eq.type = 'peaking';
            eq.frequency.value = freq;
            eq.Q.value = 1;
            eq.gain.value = 0;
            eqFilters.push(eq);
        }

        // Connect the audio source to the EQ filters and destination
        audioSource.connect(eqFilters[0]);
        for (let i = 0; i < eqFilters.length - 1; i++) {
            eqFilters[i].connect(eqFilters[i + 1]);
        }
        eqFilters[eqFilters.length - 1].connect(audioContext.destination);

        // Update EQ settings when sliders change
      // Initialize EQ filters for specific frequencies



// Update EQ settings when sliders change
        sliders.forEach((slider) => {
            slider.addEventListener('input', (event) => {
                const gain = parseFloat(event.target.value);
                const index = parseInt(slider.getAttribute('data-index'), 10);
                eqFilters[index].gain.value = gain;
            });
        });
      

        // Reset EQ settings to default values
        resetButton9.addEventListener('click', () => {
            eqFilters.forEach((eq) => {
                eq.gain.value = 0; // Set the EQ filter's gain value to 0
            });
        
            // Also, update the slider values to 0
            sliders.forEach((slider) => {
                slider.value = 0; // Reset the input slider's value to 0
            });
        });



        started = true;
    }
}
