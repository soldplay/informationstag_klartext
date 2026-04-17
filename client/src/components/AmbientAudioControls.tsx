import { useEffect, useRef, useState } from "react";
import { Music4, Pause, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  AUDIO_DEFAULT_LEVEL_PERCENT,
  AUDIO_SRC,
  AUDIO_VOLUME_CAP,
} from "@/constants/audio";

type Props = {
  /** z. B. Leertaste toggelt Wiedergabe (nur Startseite — nicht mit Folien-Steuerung kollidieren) */
  spaceTogglesPlayback?: boolean;
  className?: string;
};

export function AmbientAudioControls({ spaceTogglesPlayback = false, className = "" }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [levelPercent, setLevelPercent] = useState(AUDIO_DEFAULT_LEVEL_PERCENT);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.loop = true;
    el.volume = (levelPercent / 100) * AUDIO_VOLUME_CAP;
    el.muted = muted;
  }, [levelPercent, muted]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.play().catch(() => setPlaying(false));
    } else {
      el.pause();
    }
  }, [playing]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        setMuted((v) => !v);
      }
      if (spaceTogglesPlayback && e.key === " ") {
        e.preventDefault();
        setPlaying((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [spaceTogglesPlayback]);

  const effectivePercent = Math.round((levelPercent / 100) * AUDIO_VOLUME_CAP * 100);

  return (
    <div
      className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      role="group"
      aria-label="Hintergrundmusik"
    >
      <audio ref={audioRef} src={AUDIO_SRC} loop playsInline preload="auto" />

      <button
        type="button"
        onClick={() => setPlaying((v) => !v)}
        className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs text-white/90 backdrop-blur-xl transition hover:bg-white/20 sm:px-4 sm:text-sm"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Music4 className="h-4 w-4" />}
        {playing ? "Musik pausieren" : "Musik starten"}
      </button>

      <button
        type="button"
        onClick={() => setMuted((v) => !v)}
        className="shrink-0 rounded-full border border-white/10 bg-white/10 p-2 text-white/90 backdrop-blur-xl transition hover:bg-white/20"
        aria-label={muted ? "Ton aktivieren" : "Ton stummschalten"}
        title="Taste M"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      <div className="flex min-w-[10rem] max-w-[14rem] flex-1 items-center gap-2 sm:min-w-[12rem]">
        <Slider
          value={[levelPercent]}
          onValueChange={(v) => setLevelPercent(v[0] ?? AUDIO_DEFAULT_LEVEL_PERCENT)}
          max={100}
          step={1}
          className="flex-1 [&_[data-slot=slider-track]]:bg-white/20 [&_[data-slot=slider-range]]:bg-sky-400"
          aria-label="Musiklautstärke"
        />
        <span className="w-9 shrink-0 tabular-nums text-[0.65rem] font-semibold text-white/70 sm:text-xs">
          {effectivePercent}%
        </span>
      </div>

      <p className="w-full max-w-xl text-[0.6rem] leading-snug text-white/45">
        <span className="sm:whitespace-nowrap">
          Max.&nbsp;Pegel {Math.round(AUDIO_VOLUME_CAP * 100)}&nbsp;% (DZB/BITV: steuerbar, nicht Volllaut).
        </span>{" "}
        <span className="hidden sm:inline">
          {spaceTogglesPlayback ? "Leertaste: Musik." : "Leertaste: Folie."} M: Stumm.
        </span>
      </p>
    </div>
  );
}
