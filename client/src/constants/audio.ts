/** Gemeinsame Hintergrundmusik (public/) */
export const AUDIO_SRC = "/audio/klartext-ambient.mp3";

/**
 * Höchstpegel der Linearaussteuerung (0–1) für `HTMLAudioElement.volume`.
 * Bei 100 % Regler = dieser Anteil von `audio.volume` (nicht 1.0) — wirkt wie
 * ein „Pegel-Deckel“ für Präsentationen und barrierearme Nutzung (DZB/BITV:
 * vorhersehbare, steuerbare Lautstärke; vgl. BITV 2.0 §9.1.7, WCAG zu Audio).
 */
export const AUDIO_VOLUME_CAP = 0.55;

/**
 * Startpegel (0–1, vor Anwendung der Obergrenze = effektiver Anteil am Cap).
 * Entspricht moderater Wiedergabe; Nutzer kann über den Regler anheben.
 */
export const AUDIO_DEFAULT_VOLUME = 0.35;

/** Slider 0–100: Wert bei Start (entspricht AUDIO_DEFAULT_VOLUME relativ zum Cap) */
export const AUDIO_DEFAULT_LEVEL_PERCENT = Math.min(
  100,
  Math.round((AUDIO_DEFAULT_VOLUME / AUDIO_VOLUME_CAP) * 100)
);
