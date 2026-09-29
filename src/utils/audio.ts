/**
 * Web Audio API synthesizer for the GPIO25 piezoelectric buzzer
 */
class BuzzerAudioEngine {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private gain: GainNode | null = null;
  private isPlaying = false;
  private muted = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public setMuted(mute: boolean) {
    this.muted = mute;
    if (mute && this.isPlaying) {
      this.stop();
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public start(frequency = 2400) {
    if (this.muted || this.isPlaying) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.osc = this.ctx.createOscillator();
      this.gain = this.ctx.createGain();

      this.osc.type = 'square';
      this.osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      // Pulsing siren volume effect
      this.gain.gain.setValueAtTime(0.12, this.ctx.currentTime);

      this.osc.connect(this.gain);
      this.gain.connect(this.ctx.destination);

      this.osc.start();
      this.isPlaying = true;
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public stop() {
    if (!this.isPlaying) return;
    try {
      if (this.osc) {
        this.osc.stop();
        this.osc.disconnect();
        this.osc = null;
      }
      if (this.gain) {
        this.gain.disconnect();
        this.gain = null;
      }
    } catch {
      // ignore
    } finally {
      this.isPlaying = false;
    }
  }
}

export const buzzerAudio = new BuzzerAudioEngine();
