/**
 * AUDIO ENGINE — OMNI-CHALAMANDRA
 * Responsibility: Translate frequency signals into resonant acoustic feedback.
 */

let audioContext = null;

/**
 * Synthesizes a sine wave based on the deterministic Cross-Ratio frequency.
 * @param {number} frequencyHz - The target frequency from the Invariant Engine.
 * @param {number} duration - Time in milliseconds for the resonance to last.
 */
export function playFrequency(frequencyHz, duration = 3000) {
  try {
    // Lazy initialization of AudioContext to comply with browser autoplay policies
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Pure sine wave for clean geometric resonance
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequencyHz, audioContext.currentTime);

    // ADSR Envelope: Prevents audio clipping and creates a smooth atmospheric fade
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    
    // Attack: Quick swell to peak volume
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.2); 
    
    // Release: Long exponential decay to silence
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration / 1000);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    // Precise cleanup to free up system resources
    setTimeout(() => {
      try {
        oscillator.stop();
        oscillator.disconnect();
        gainNode.disconnect();
      } catch (e) {
        // Handle cases where oscillator might already be stopped
      }
    }, duration);

    console.log(>> AUDIO: Synthesizing resonance at ${frequencyHz}Hz);
  } catch (error) {
    console.warn(">> AUDIO ERROR: Synthesis failed. Audio might be blocked by browser.", error);
  }
}
