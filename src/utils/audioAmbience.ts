/**
 * Web Audio API procedural sound synthesizer for reading ambience.
 * 100% offline, procedural audio without external audio file dependencies.
 */

export type AmbienceType = 'none' | 'rain' | 'fireplace' | 'library' | 'cafe';

class AmbienceSynthesizer {
  private ctx: AudioContext | null = null;
  private currentType: AmbienceType = 'none';
  private masterGain: GainNode | null = null;
  private nodes: (AudioNode | number)[] = [];
  private volume: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentType(): AmbienceType {
    return this.currentType;
  }

  public stop() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    }
    setTimeout(() => {
      this.nodes.forEach((item) => {
        if (typeof item === 'number') {
          window.clearInterval(item);
        } else {
          try {
            if ('stop' in item && typeof (item as AudioScheduledSourceNode).stop === 'function') {
              (item as AudioScheduledSourceNode).stop();
            }
            item.disconnect();
          } catch {
            // Ignore disconnect errors
          }
        }
      });
      this.nodes = [];
      this.currentType = 'none';
    }, 150);
  }

  public play(type: AmbienceType) {
    this.stop();
    if (type === 'none') {
      return;
    }

    this.initContext();
    if (!this.ctx) return;

    this.currentType = type;
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    if (type === 'rain') {
      this.createRainSound();
    } else if (type === 'fireplace') {
      this.createFireplaceSound();
    } else if (type === 'library') {
      this.createLibrarySound();
    } else if (type === 'cafe') {
      this.createCafeSound();
    }
  }

  private createWhiteNoiseBuffer(): AudioBuffer {
    if (!this.ctx) throw new Error('No audio context');
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  private createRainSound() {
    if (!this.ctx || !this.masterGain) return;
    const noiseBuffer = this.createWhiteNoiseBuffer();
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    // Filter to simulate soft rainfall
    const lowPass = this.ctx.createBiquadFilter();
    lowPass.type = 'lowpass';
    lowPass.frequency.setValueAtTime(1000, this.ctx.currentTime);

    const highPass = this.ctx.createBiquadFilter();
    highPass.type = 'highpass';
    highPass.frequency.setValueAtTime(350, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    noise.connect(lowPass);
    lowPass.connect(highPass);
    highPass.connect(rainGain);
    rainGain.connect(this.masterGain);

    noise.start();
    this.nodes.push(noise, lowPass, highPass, rainGain);
  }

  private createFireplaceSound() {
    if (!this.ctx || !this.masterGain) return;
    // Ambient warm low drone
    const noiseBuffer = this.createWhiteNoiseBuffer();
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const lowPass = this.ctx.createBiquadFilter();
    lowPass.type = 'lowpass';
    lowPass.frequency.setValueAtTime(400, this.ctx.currentTime);

    const humGain = this.ctx.createGain();
    humGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

    noise.connect(lowPass);
    lowPass.connect(humGain);
    humGain.connect(this.masterGain);
    noise.start();
    this.nodes.push(noise, lowPass, humGain);

    // Random crackles / pops
    const intervalId = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || this.currentType !== 'fireplace') return;
      if (Math.random() > 0.45) return;

      const osc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150 + Math.random() * 600, now);

      popGain.gain.setValueAtTime(0.08 + Math.random() * 0.12, now);
      popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(popGain);
      popGain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.05);
    }, 180);

    this.nodes.push(intervalId);
  }

  private createLibrarySound() {
    if (!this.ctx || !this.masterGain) return;
    // Gentle deep air movement
    const noiseBuffer = this.createWhiteNoiseBuffer();
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start();
    this.nodes.push(noise, filter, gain);
  }

  private createCafeSound() {
    if (!this.ctx || !this.masterGain) return;
    // Gentle muted room presence with soft hum
    const noiseBuffer = this.createWhiteNoiseBuffer();
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start();
    this.nodes.push(noise, filter, gain);
  }
}

export const audioAmbience = new AmbienceSynthesizer();
