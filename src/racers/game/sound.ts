/**
 * Engine hum: a soft, toy-like synthesised motor (no audio files), pitch
 * follows the kart's speed, brighter while boosting. Safe when audio is blocked.
 */
export class EngineSound {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  enabled = true;

  start() {
    if (this.ctx || !this.enabled) return;
    try {
      const C = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!C) return;
      const ctx = new C();
      const g = ctx.createGain();
      g.gain.value = 0;
      const f = ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = 500;
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = 60;
      const o2 = ctx.createOscillator();
      o2.type = "triangle";
      o2.frequency.value = 120;
      o.connect(f);
      o2.connect(f);
      f.connect(g).connect(ctx.destination);
      o.start();
      o2.start();
      Object.assign(this, { ctx, osc: o, osc2: o2, gain: g, filter: f });
    } catch {
      this.ctx = null;
    }
  }
  update(speed: number, boosting: boolean, paused: boolean) {
    if (!this.ctx || !this.osc || !this.gain || !this.filter || !this.osc2) return;
    const now = this.ctx.currentTime;
    const v = Math.min(1, speed / 30);
    this.osc.frequency.setTargetAtTime(55 + v * 120 + (boosting ? 40 : 0), now, 0.08);
    this.osc2.frequency.setTargetAtTime(110 + v * 230 + (boosting ? 80 : 0), now, 0.08);
    this.filter.frequency.setTargetAtTime(380 + v * 900 + (boosting ? 700 : 0), now, 0.1);
    this.gain.gain.setTargetAtTime(paused || !this.enabled ? 0 : 0.035 + v * 0.03, now, 0.15);
  }
  stop() {
    try {
      this.ctx?.close();
    } catch {
      /* ignore */
    }
    this.ctx = null;
  }
}
