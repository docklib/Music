
const video = document.getElementById('Music');

const actionHandlers = [
  ['play',          () => { /* ... */ }],
  ['pause',         () => { /* ... */ }],
  ['previoustrack',     () => { /* ... */ }],
  ['nexttrack',     () => { /* ... */ }],

];

for (const [action, handler] of actionHandlers) {
  try {
    navigator.mediaSession.setActionHandler(action, handler);
  } catch (error) {
    console.log(`The media session action "${action}" is not supported yet.`);
  }
}

navigator.mediaSession.setActionHandler('previoustrack', () => {
  Music.currentTime = 0;
});
  
navigator.mediaSession.setActionHandler('nexttrack', () => {
  //shuffle();
  handleNext()
});


navigator.mediaSession.setActionHandler('play', async () => {
  playpause()
});

navigator.mediaSession.setActionHandler('pause', () => {
  playpause()
});

Music.addEventListener('play', () => {
  navigator.mediaSession.playbackState = 'playing';
});

Music.addEventListener('pause', () => {
  navigator.mediaSession.playbackState = 'paused';
});