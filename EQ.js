// Create or resume AudioContext when user interacts
var audioContext = null;
var audioSource = null;
var analyser = null;
var frequencyData = null;
var audio = document.getElementById('Paudio');
import AudioMotionAnalyzer from "./audioMotion-analyzer.js";



window.makeAUDIOAC = function() {
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
       

       //audio.addEventListener('play', startVisualizer);
        var visualisallowed = true
        if(visualisallowed === true) {

 
  const audioMotion = new AudioMotionAnalyzer(
    document.getElementById('audio-visual1'),
    {
      source: audioSource,
      height: window.innerHeight - 200,
      width: window.innerWidth,
      // you can set other options below - check the docs!
      mode: 2,
      frequencyScale: "log",
      ansiBands: false,
      showScaleX: false,
      bgAlpha: 0,
      overlay: true,
      showPeaks: false,
      reflexRatio: 0.5,
      reflexAlpha: 1,
      reflexBright: 1,
      smoothing: 0.7,
      gradient: "rainbow",
      mirror: 1
    }
  );
  


   // setInterval(() => {
        //console.warn('This Can Take Up Alot Of Ram...')

   // }, 10000);
} else {
    console.error('visual audio has been disabled this wont break the code tho (:')
}
        // Visualizer setup
        started = true;


    }
}

export { audioContext, audioSource, start};


function startVisualizer() {
    // Create an analyser node

    // Function to update the visualizer
    function updateVisualizer() {
        // Get frequency data
        analyser.getByteFrequencyData(frequencyData);

        // Update the height of each bar based on the frequency data
        const numBars = 6; // Number of frequency bars
        const minFrequency = 32; // Minimum frequency (32 Hz)
        const maxFrequency = 1000; // Maximum frequency (1 kHz)
        const frequencyRange = maxFrequency - minFrequency; // Total frequency range

        for (let i = 0; i < numBars; i++) {
            const bar = document.getElementById(`bar${i + 1}`);
            const minFreqOfBar = minFrequency + i * (frequencyRange / numBars);
            const maxFreqOfBar = minFrequency + (i + 1) * (frequencyRange / numBars);
            let averageHeight = 0;
            let numBinsInRange = 0;

            // Calculate average height based on frequency range of the bar
            for (let j = 0; j < frequencyData.length; j++) {
                const frequency = (j / frequencyData.length) * (analyser.context.sampleRate / 2); // Calculate frequency for each bin
                if (frequency >= minFreqOfBar && frequency <= maxFreqOfBar) {
                    averageHeight += frequencyData[j];
                    numBinsInRange++;
                }
            }
            averageHeight /= numBinsInRange;

            // Scale down for better visualization and round the height to an integer
            const height = Math.round(averageHeight / 3.5);
            bar.style.height = `${height}px`;
        }



        // Request animation frame to update the visualizer continuously
        requestAnimationFrame(updateVisualizer);
    }

    // Start updating the visualizer
    updateVisualizer();
}



//MORE STUFFF
console.log('loaded in EQ Awaiting execution...')
console.warn('Player.js Must Be Loaded In!')



































