import AudioMotionAnalyzer from "https://cdn.skypack.dev/audiomotion-analyzer?min";


// Instantiate analyzer
const audioMotion = new AudioMotionAnalyzer(
    document.getElementById("container"),
    {
      source: audioElements[0],
      height: 400,
      ansiBands: false,
      showScaleX: false,
      bgAlpha: 0,
      overlay: true,
      mode: 1,
      frequencyScale: "log",
      radial: true,
      showPeaks: false,
      channelLayout: "dual-vertical",
      smoothing: 0.7
    }
  );