/**
 * AUDIO ENGINE — OMNI-CHALAMANDRA
 * Responsibility: Translate frequencyHz into resonant soundscapes.
 */

let audioContext = null;

export function playFrequency(frequencyHz, duration = 2000) {
  try {
    // Inicialización perezosa (Lazy initialization)
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Si el contexto está suspendido (política de navegadores), lo resumimos
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Configuración de onda pura
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequencyHz, audioContext.currentTime);

    // Envolvente de sonido (ADSR simplificado)
    // Empieza en silencio, sube rápido, baja suave
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.1); 
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration / 1000);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    // Limpieza automática
    setTimeout(() => {
      oscillator.stop();
      oscillator.disconnect();
      gainNode.disconnect();
    }, duration);

    console.log(>> AUDIO: Playing resonance at ${frequencyHz}Hz);
  } catch (error) {
    console.warn(">> AUDIO ERROR: Sound synthesis failed.", error);
  }
}
