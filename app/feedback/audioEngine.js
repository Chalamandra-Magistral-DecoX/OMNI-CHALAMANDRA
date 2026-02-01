// app/feedback/audioEngine.js

let audioContext = null;
let oscillator = null;

export function playFrequency(frequencyHz, duration = 3000) {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(
    frequencyHz,
    audioContext.currentTime
  );

  gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
    oscillator.disconnect();
  }, duration);
}
