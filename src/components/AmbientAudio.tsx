import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Silent ambient loop generated with WebAudio — no external asset needed.
export function AmbientAudio() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; osc: OscillatorNode; osc2: OscillatorNode; lfo: OscillatorNode; lfoGain: GainNode } | null>(null);

  useEffect(() => {
    return () => {
      nodesRef.current?.osc.stop();
      nodesRef.current?.osc2.stop();
      nodesRef.current?.lfo.stop();
      ctxRef.current?.close();
    };
  }, []);

  const toggle = () => {
    if (!on) {
      const AC = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
      const ctx = new AC();
      const gain = ctx.createGain();
      gain.gain.value = 0.05;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 55;
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.value = 82.5;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.1;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.04;
      lfo.connect(lfoGain).connect(gain.gain);
      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc2.start();
      lfo.start();
      ctxRef.current = ctx;
      nodesRef.current = { gain, osc, osc2, lfo, lfoGain };
      setOn(true);
    } else {
      nodesRef.current?.osc.stop();
      nodesRef.current?.osc2.stop();
      nodesRef.current?.lfo.stop();
      ctxRef.current?.close();
      ctxRef.current = null;
      nodesRef.current = null;
      setOn(false);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute ambient soundscape" : "Enable ambient soundscape"}
      className="btn-outline-glow fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full"
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
