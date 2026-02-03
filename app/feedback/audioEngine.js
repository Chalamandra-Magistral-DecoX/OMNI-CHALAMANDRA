/**
 * AUDIO ENGINE — OMNI-CHALAMANDRA
 * Responsibility: Translate frequency signals into resonant acoustic feedback.
 */

let audioContext = null;

export function playFrequency(frequencyHz, duration = 2000) {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequencyHz, audioContext.currentTime);

    // ADSR Envelope: Prevents audio popping and creates smooth resonance
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.1); 
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration / 1000);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    setTimeout(() => {
      oscillator.stop();
      oscillator.disconnect();
      gainNode.disconnect();
    }, duration);

    console.log(>> AUDIO: Synthesizing resonance at ${frequencyHz}Hz);
  } catch (error) {
    console.warn(">> AUDIO ERROR: Synthesis failed.", error);
  }
}
