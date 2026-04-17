import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { AmbientAudioControls } from "@/components/AmbientAudioControls";
import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  type Transition,
  useReducedMotion,
} from "framer-motion";
import { Link } from "wouter";
import { WhatsAppQrBlock } from "@/components/WhatsAppQrBlock";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  DoorOpen,
  Euro,
  Globe,
  GraduationCap,
  HeartHandshake,
  Layers,
  LayoutList,
  Lightbulb,
  LineChart,
  LucideIcon,
  MessageCircleQuestion,
  Monitor,
  Palette,
  PartyPopper,
  QrCode,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

/** Ein Aufbau-Schritt pro Klick — wie in PowerPoint „Animationen nacheinander“. */
type BuildStep =
  | { id: string; kind: "tag"; text: string }
  | { id: string; kind: "title"; text: string; kicker?: string }
  | {
      id: string;
      kind: "heroIcon";
      main: LucideIcon;
      orbit?: LucideIcon[];
    }
  | { id: string; kind: "text"; text: string; large?: boolean }
  | { id: string; kind: "bullet"; text: string; icon: LucideIcon }
  | { id: string; kind: "callout"; text: string }
  | { id: string; kind: "whatsappQr"; label: string; caption?: string };

type SlideDef = {
  id: string;
  /** Visuelles Thema */
  theme: {
    mesh: string;
    blob1: string;
    blob2: string;
    accent: string;
  };
  steps: BuildStep[];
};

const deck: SlideDef[] = [
  {
    id: "welcome",
    theme: {
      mesh: "from-[#020617] via-[#0c1a3a] to-[#020617]",
      blob1: "bg-sky-500/30",
      blob2: "bg-indigo-600/25",
      accent: "text-cyan-200",
    },
    steps: [
      { id: "w1", kind: "tag", text: "Informationstag · Folie 1" },
      {
        id: "w2",
        kind: "title",
        text: "Herzlich willkommen",
        kicker: "Einstieg & Orientierung",
      },
      { id: "w3", kind: "heroIcon", main: DoorOpen, orbit: [Sparkles, HeartHandshake] },
      {
        id: "w4",
        kind: "text",
        large: true,
        text:
          "Ich möchte euch alle willkommen heißen bei unserem Informationstag. Heute gibt es Klarheit: kein Technikchaos, sondern eine greifbare und verständliche Darstellung des Kurses.",
      },
      {
        id: "w5",
        kind: "text",
        text:
          "Ich öffne euch die Tür und hole euch ab. KI ist überall — viele haben von ihr gehört, aber wenige nutzen sie richtig.",
      },
      {
        id: "w6",
        kind: "text",
        text:
          "Genau dafür gibt es diesen Kurs: nicht nur über KI erzählen und staunen, sondern anwenden lernen.",
      },
    ],
  },
  {
    id: "audience",
    theme: {
      mesh: "from-[#020617] via-[#172554] to-[#020617]",
      blob1: "bg-blue-500/35",
      blob2: "bg-violet-500/20",
      accent: "text-sky-200",
    },
    steps: [
      { id: "a1", kind: "tag", text: "Folie 2 · Zielgruppe" },
      {
        id: "a2",
        kind: "title",
        text: "Für wen dieser Kurs da ist",
        kicker: "Kein Profi-Zwang",
      },
      { id: "a3", kind: "heroIcon", main: Users },
      {
        id: "a4",
        kind: "text",
        large: true,
        text:
          "Der Kurs ist nicht für Profis, sondern für normale Menschen mit echtem Bedarf.",
      },
      { id: "a5", kind: "bullet", text: "Arbeitssuchende und Quereinsteiger", icon: Briefcase },
      { id: "a6", kind: "bullet", text: "Selbstständige und Gründer:innen", icon: LineChart },
      { id: "a7", kind: "bullet", text: "Alle, die digital stärker werden wollen", icon: Monitor },
      {
        id: "a8",
        kind: "bullet",
        text: "Menschen mit Basis-PC-Kenntnissen (E-Mail, Browser, Text)",
        icon: GraduationCap,
      },
    ],
  },
  {
    id: "browser",
    theme: {
      mesh: "from-[#020617] via-[#083344] to-[#020617]",
      blob1: "bg-cyan-400/25",
      blob2: "bg-emerald-500/15",
      accent: "text-cyan-100",
    },
    steps: [
      { id: "b1", kind: "tag", text: "Folie 3 · Einstieg" },
      { id: "b2", kind: "title", text: "Ein Browser reicht", kicker: "Niedrigschwellig" },
      { id: "b3", kind: "heroIcon", main: Globe, orbit: [Monitor, Lightbulb] },
      {
        id: "b4",
        kind: "text",
        large: true,
        text:
          "Man muss kein Informatiker sein. Es geht nicht um Perfektion — es geht um die Bereitschaft, Neues zu lernen.",
      },
      {
        id: "b5",
        kind: "callout",
        text: "Der Einstieg bleibt niedrigschwellig und praxisnah im Browser.",
      },
    ],
  },
  {
    id: "skills",
    theme: {
      mesh: "from-[#020617] via-[#2e1065] to-[#020617]",
      blob1: "bg-fuchsia-500/20",
      blob2: "bg-violet-600/30",
      accent: "text-violet-200",
    },
    steps: [
      { id: "s1", kind: "tag", text: "Folie 4 · Kompetenzen" },
      {
        id: "s2",
        kind: "title",
        text: "Was ihr sicher könnt — nach der Woche",
        kicker: "Handlungsorientiert",
      },
      { id: "s3", kind: "heroIcon", main: ShieldCheck, orbit: [Target, ClipboardCheck] },
      {
        id: "s4",
        kind: "text",
        text:
          "KI sicher nutzen lernen: besser prompten, Ergebnisse prüfen, Dokumente verstehen, Recherche machen.",
      },
      {
        id: "s5",
        kind: "text",
        text:
          "Bilder und Videos erzeugen — nicht blind vertrauen, sondern kritisch denken.",
      },
      {
        id: "s6",
        kind: "text",
        text: "Alles sicher, praktisch, modern und direkt nutzbar im Alltag.",
      },
    ],
  },
  {
    id: "staircase",
    theme: {
      mesh: "from-[#020617] via-[#082f49] to-[#020617]",
      blob1: "bg-sky-400/30",
      blob2: "bg-blue-700/25",
      accent: "text-sky-200",
    },
    steps: [
      { id: "st1", kind: "tag", text: "Folie 5 · Aufbau" },
      { id: "st2", kind: "title", text: "Die Woche ist wie eine Treppe", kicker: "Linear & logisch" },
      { id: "st3", kind: "heroIcon", main: Layers },
      {
        id: "st4",
        kind: "text",
        large: true,
        text: "Jeder Tag baut auf dem vorherigen auf — klar, logisch, aufsteigend.",
      },
      {
        id: "st5",
        kind: "callout",
        text:
          "Erst: Prompting — dann Prüfen — dann Programm — dann Produzieren — zum Schluss: Präsentieren.",
      },
    ],
  },
  {
    id: "week",
    theme: {
      mesh: "from-[#020617] via-[#1e1b4b] to-[#020617]",
      blob1: "bg-indigo-500/30",
      blob2: "bg-blue-500/20",
      accent: "text-indigo-200",
    },
    steps: [
      { id: "wk1", kind: "tag", text: "Folie 6 · Wochenplan" },
      { id: "wk2", kind: "title", text: "So sieht die Woche aus", kicker: "5 Tage" },
      { id: "wk3", kind: "heroIcon", main: CalendarRange },
      { id: "wk4", kind: "bullet", text: "Tag 1: Orientierung & KI-Grundkompetenz", icon: BookOpen },
      { id: "wk5", kind: "bullet", text: "Tag 2: Dokumente und Recherche", icon: ClipboardCheck },
      { id: "wk6", kind: "bullet", text: "Tag 3: Mini-Webtools im Browser", icon: Wrench },
      { id: "wk7", kind: "bullet", text: "Tag 4: Design, Bild und Video", icon: Palette },
      {
        id: "wk8",
        kind: "bullet",
        text: "Tag 5: Automatisierung & Abschluss-Präsentation (Pitch)",
        icon: PartyPopper,
      },
      {
        id: "wk9",
        kind: "callout",
        text: "Das ist die Woche: klar, logisch und aufbauend gestaltet.",
      },
    ],
  },
  {
    id: "deliverables",
    theme: {
      mesh: "from-[#020617] via-[#064e3b] to-[#020617]",
      blob1: "bg-emerald-400/20",
      blob2: "bg-teal-500/20",
      accent: "text-emerald-200",
    },
    steps: [
      { id: "d1", kind: "tag", text: "Folie 7 · Ergebnisse" },
      {
        id: "d2",
        kind: "title",
        text: "Sichtbare Ergebnisse — nicht nur Wissen",
        kicker: "Deliverables",
      },
      { id: "d3", kind: "heroIcon", main: Award },
      {
        id: "d4",
        kind: "text",
        large: true,
        text:
          "Der Fokus liegt nicht nur am Lernen, sondern darauf, etwas in der Hand zu haben — etwas zu zeigen und weiterzuverwenden.",
      },
      { id: "d5", kind: "bullet", text: "Professionelle E-Mail", icon: Sparkles },
      { id: "d6", kind: "bullet", text: "Zusammenfassung mit Quellencheck", icon: ClipboardCheck },
      { id: "d7", kind: "bullet", text: "Kleines Webtool und One-Pager", icon: Globe },
      { id: "d8", kind: "bullet", text: "Bildserie und Kurzvideo", icon: Palette },
      {
        id: "d9",
        kind: "bullet",
        text: "Einfache Automatisierung und ein Pitch (Präsentation)",
        icon: Zap,
      },
    ],
  },
  {
    id: "method",
    theme: {
      mesh: "from-[#020617] via-[#0c4a6e] to-[#020617]",
      blob1: "bg-sky-500/25",
      blob2: "bg-cyan-400/15",
      accent: "text-sky-200",
    },
    steps: [
      { id: "m1", kind: "tag", text: "Folie 8 · Didaktik" },
      { id: "m2", kind: "title", text: "So arbeiten wir", kicker: "Struktur & Begleitung" },
      { id: "m3", kind: "heroIcon", main: HeartHandshake },
      {
        id: "m4",
        kind: "text",
        large: true,
        text:
          "Mit Feedback, Struktur und browserbasierten Tools. Teilnehmer:innen werden geführt — niemand wird allein gelassen.",
      },
      { id: "m5", kind: "bullet", text: "Kein Chaos — klare Führung", icon: LayoutList },
      { id: "m6", kind: "bullet", text: "Erst Demo, dann begleitetes Arbeiten", icon: Monitor },
      { id: "m7", kind: "bullet", text: "Dann Mini-Projekt, dann Abgaben", icon: Target },
    ],
  },
  {
    id: "value",
    theme: {
      mesh: "from-[#020617] via-[#422006] to-[#020617]",
      blob1: "bg-amber-500/25",
      blob2: "bg-orange-600/20",
      accent: "text-amber-100",
    },
    steps: [
      { id: "v1", kind: "tag", text: "Folie 9 · Investition" },
      {
        id: "v2",
        kind: "title",
        text: "Nutzen vor Kostendetail",
        kicker: "Perspektive",
      },
      { id: "v3", kind: "heroIcon", main: Euro, orbit: [Award, Sparkles] },
      {
        id: "v4",
        kind: "text",
        large: true,
        text:
          "Nicht die Kosten stehen im Vordergrund — sondern der konkrete Nutzen für euren Alltag und eure Ziele.",
      },
      {
        id: "v5",
        kind: "text",
        text:
          "Der Kurs kostet 690 €. Es gibt ein KLARTEXT-Zertifikat und am Ende ein Portfolio.",
      },
      {
        id: "v6",
        kind: "callout",
        text:
          "Echter Fortschritt — keine perfekte Welt, aber ein echter Startpunkt: ein digitaler Startpunkt. Nach dieser Woche steht ihr nicht mehr bei null.",
      },
    ],
  },
  {
    id: "whatsapp",
    theme: {
      mesh: "from-[#020617] via-[#052e16] to-[#020617]",
      blob1: "bg-emerald-500/30",
      blob2: "bg-green-600/20",
      accent: "text-emerald-200",
    },
    steps: [
      { id: "wa1", kind: "tag", text: "Folie 10 · Community" },
      {
        id: "wa2",
        kind: "title",
        text: "Scannt & joint der Gruppe",
        kicker: "WhatsApp · Infotag / Bootcamp",
      },
      { id: "wa3", kind: "heroIcon", main: QrCode },
      {
        id: "wa4",
        kind: "text",
        large: true,
        text:
          "Mit einem Scan seid ihr in der WhatsApp-Gruppe — oder nutzt den Button unten, um ohne Scan direkt beizutreten. Dort bleibt ihr informiert und könnt euch austauschen.",
      },
      {
        id: "wa5",
        kind: "whatsappQr",
        label: "WhatsApp-Gruppe",
        caption: "Beitritt zur Gruppe „Infotag: Einstiegskurs – Bootcamp“",
      },
    ],
  },
];

/** Rotierende „Wurf“-Eintritte — asymmetrisch wie bei starken PPT-Animationen */
const THROW_PRESETS: { initial: TargetAndTransition; transition: Transition }[] = [
  {
    initial: { x: "42%", y: "-55%", rotate: 19, scale: 0.42, opacity: 0, filter: "blur(12px)" },
    transition: { type: "spring" as const, stiffness: 280, damping: 22, mass: 0.85 },
  },
  {
    initial: { x: "-48%", y: "52%", rotate: -16, scale: 0.45, opacity: 0, filter: "blur(10px)" },
    transition: { type: "spring" as const, stiffness: 300, damping: 24, mass: 0.9 },
  },
  {
    initial: { x: "55%", y: "38%", rotate: 22, scale: 0.5, opacity: 0, filter: "blur(14px)" },
    transition: { type: "spring" as const, stiffness: 260, damping: 20, mass: 0.8 },
  },
  {
    initial: { x: "-35%", y: "-48%", rotate: -11, scale: 0.55, opacity: 0, filter: "blur(8px)" },
    transition: { type: "spring" as const, stiffness: 320, damping: 26, mass: 0.75 },
  },
  {
    initial: { x: "28%", y: "48%", rotate: -25, scale: 0.4, opacity: 0, filter: "blur(11px)" },
    transition: { type: "spring" as const, stiffness: 290, damping: 21, mass: 0.88 },
  },
  {
    initial: { x: "-52%", y: "-30%", rotate: 14, scale: 0.48, opacity: 0, filter: "blur(9px)" },
    transition: { type: "spring" as const, stiffness: 275, damping: 23, mass: 0.82 },
  },
];

function ThrowBlock({
  children,
  animIndex,
  reduceMotion,
  className,
}: {
  children: ReactNode;
  animIndex: number;
  reduceMotion: boolean;
  className?: string;
}) {
  const preset = THROW_PRESETS[animIndex % THROW_PRESETS.length];
  const t: Transition = reduceMotion ? { duration: 0.18, ease: "easeOut" } : preset.transition;
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : preset.initial}
      animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
      transition={t}
    >
      {children}
    </motion.div>
  );
}

function SlideBackdrop({
  theme,
  slideIndex,
}: {
  theme: SlideDef["theme"];
  slideIndex: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        key={slideIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 bg-gradient-to-br ${theme.mesh}`}
      />
      {/* Mesh blobs */}
      <div
        className={`absolute -left-[20%] top-[-10%] h-[60vmin] w-[60vmin] rounded-full blur-[100px] ${theme.blob1}`}
      />
      <div
        className={`absolute -right-[15%] bottom-[-20%] h-[70vmin] w-[70vmin] rounded-full blur-[110px] ${theme.blob2}`}
      />
      {/* Diagonal highlight */}
      <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.04)_45%,transparent_70%)]" />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
      {/* Fine noise */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

function StepView({
  step,
  theme,
  animIndex,
  reduceMotion,
}: {
  step: BuildStep;
  theme: SlideDef["theme"];
  animIndex: number;
  reduceMotion: boolean;
}) {
  switch (step.kind) {
    case "tag":
      return (
        <ThrowBlock animIndex={animIndex} reduceMotion={reduceMotion}>
          <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-white/90 shadow-lg backdrop-blur-md sm:text-xs">
            {step.text}
          </span>
        </ThrowBlock>
      );
    case "title":
      return (
        <ThrowBlock animIndex={animIndex} reduceMotion={reduceMotion}>
          <div className="space-y-3">
            {step.kicker ? (
              <p className={`max-w-prose text-sm font-semibold uppercase tracking-[0.2em] ${theme.accent}`}>
                {step.kicker}
              </p>
            ) : null}
            <h1 className="max-w-[20ch] text-balance font-black leading-[0.98] tracking-tight text-white [text-shadow:0_4px_40px_rgba(0,0,0,0.55)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {step.text}
            </h1>
          </div>
        </ThrowBlock>
      );
    case "heroIcon": {
      const Main = step.main;
      return (
        <ThrowBlock animIndex={animIndex} reduceMotion={reduceMotion} className="relative flex justify-start">
          <div className="relative">
            <motion.div
              className="flex h-28 w-28 items-center justify-center rounded-[2rem] border-2 border-white/25 bg-gradient-to-br from-white/20 to-white/5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:h-36 sm:w-36 md:h-40 md:w-40"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      boxShadow: [
                        "0 25px 80px -20px rgba(56,189,248,0.35)",
                        "0 30px 100px -15px rgba(99,102,241,0.4)",
                        "0 25px 80px -20px rgba(56,189,248,0.35)",
                      ],
                    }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Main className="h-14 w-14 text-white sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]" strokeWidth={1.1} />
            </motion.div>
            {step.orbit?.map((O, i) => (
              <motion.div
                key={i}
                className="absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/30 bg-slate-950/80 text-cyan-100 shadow-xl backdrop-blur-md"
                style={{
                  top: i === 0 ? "-0.5rem" : "auto",
                  right: i === 0 ? "-0.75rem" : "auto",
                  bottom: i === 1 ? "-0.5rem" : "auto",
                  left: i === 1 ? "-0.5rem" : "auto",
                }}
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, -5, 0], rotate: [0, 6, 0] }
                }
                transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <O className="h-6 w-6" strokeWidth={1.35} />
              </motion.div>
            ))}
          </div>
        </ThrowBlock>
      );
    }
    case "text":
      return (
        <ThrowBlock animIndex={animIndex} reduceMotion={reduceMotion}>
          <p
            className={`max-w-prose leading-relaxed text-white/92 ${step.large ? "text-lg md:text-2xl lg:text-[1.65rem] font-medium" : "text-base md:text-lg"}`}
          >
            {step.text}
          </p>
        </ThrowBlock>
      );
    case "bullet": {
      const Ic = step.icon;
      return (
        <ThrowBlock animIndex={animIndex} reduceMotion={reduceMotion}>
          <div className="group flex max-w-3xl items-start gap-4 rounded-2xl border border-white/15 bg-white/6 p-4 shadow-xl backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 md:p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/30 to-indigo-500/30 text-white ring-1 ring-white/20">
              <Ic className="h-6 w-6" strokeWidth={1.25} />
            </span>
            <span className="pt-1.5 text-base font-semibold leading-snug text-white md:text-lg">{step.text}</span>
          </div>
        </ThrowBlock>
      );
    }
    case "callout":
      return (
        <ThrowBlock animIndex={animIndex} reduceMotion={reduceMotion}>
          <div className="relative max-w-prose overflow-hidden rounded-2xl border border-amber-400/25 bg-gradient-to-r from-amber-500/15 to-transparent p-5 md:p-6">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-amber-300 to-orange-500" />
            <p className="pl-3 text-base font-medium italic leading-relaxed text-amber-50 md:text-lg">{step.text}</p>
          </div>
        </ThrowBlock>
      );
    case "whatsappQr":
      return (
        <ThrowBlock animIndex={animIndex} reduceMotion={reduceMotion}>
          <div className="mx-auto w-full max-w-sm">
            <WhatsAppQrBlock label={step.label} caption={step.caption} size={200} stopClickPropagation />
          </div>
        </ThrowBlock>
      );
    default:
      return null;
  }
}

export default function InformationstagPresentation() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduceMotion = useReducedMotion();

  const current = deck[slideIndex];
  const stepCount = current.steps.length;
  const progressSlide = ((slideIndex + (revealed / stepCount)) / deck.length) * 100;

  const advance = useCallback(() => {
    if (revealed < stepCount) {
      setRevealed((r) => r + 1);
      return;
    }
    if (slideIndex < deck.length - 1) {
      setDirection(1);
      setSlideIndex((i) => i + 1);
      setRevealed(0);
    }
  }, [revealed, stepCount, slideIndex]);

  const retreat = useCallback(() => {
    if (revealed > 0) {
      setRevealed((r) => r - 1);
      return;
    }
    if (slideIndex > 0) {
      setDirection(-1);
      const prev = deck[slideIndex - 1];
      setSlideIndex((i) => i - 1);
      setRevealed(prev.steps.length);
    }
  }, [revealed, slideIndex]);

  const goSlide = useCallback((target: number) => {
    if (target === slideIndex) return;
    setDirection(target > slideIndex ? 1 : -1);
    setSlideIndex(target);
    /* Miniatur/Folienwahl: komplette Folie zeigen wie in PowerPoint */
    setRevealed(deck[target].steps.length);
  }, [slideIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        advance();
      }
      if (e.key === " ") {
        const t = e.target as HTMLElement | null;
        if (t?.closest?.('[role="group"][aria-label="Hintergrundmusik"]')) return;
        e.preventDefault();
        advance();
      }
      if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        retreat();
      }
      if (e.key === "Home") {
        e.preventDefault();
        setSlideIndex(0);
        setRevealed(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        setSlideIndex(deck.length - 1);
        setRevealed(deck[deck.length - 1].steps.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, retreat]);

  const visibleSteps = useMemo(
    () => current.steps.slice(0, revealed),
    [current.steps, revealed]
  );

  const atEndOfDeck = slideIndex === deck.length - 1 && revealed === stepCount;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir >= 0 ? "6%" : "-6%",
      opacity: 0,
      scale: 0.97,
    }),
    center: { x: "0%", opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir >= 0 ? "-5%" : "5%",
      opacity: 0,
      scale: 0.98,
    }),
  };

  const tSlide = reduceMotion ? { duration: 0.2 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div
      className="relative min-h-screen cursor-pointer overflow-hidden bg-black text-white selection:bg-sky-500/40"
      style={{ fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
      onClick={() => advance()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          const t = e.target as HTMLElement | null;
          if (t?.closest?.('[aria-label="Hintergrundmusik"]')) return;
          e.preventDefault();
          advance();
        }
      }}
      aria-label="Klicken oder Leertaste für nächsten Schritt"
    >
      {/* Außerhalb der Folien-Animation: sonst wird &lt;audio&gt; bei jedem Folienwechsel zerstört */}
      <header
        className="fixed left-0 right-0 top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/55 px-4 py-3 backdrop-blur-xl sm:px-6 md:px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/90 backdrop-blur-xl transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Start
          </Link>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-white/80">
            KLARTEXT! · Info-Tag
          </span>
          <Link
            href="/infotag-fragen"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur-xl transition hover:bg-white/15 sm:text-xs"
          >
            <MessageCircleQuestion className="h-3.5 w-3.5" />
            Q&amp;A
          </Link>
        </div>
        <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:max-w-lg sm:items-end">
          <AmbientAudioControls />
          <div className="text-right text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/55 sm:text-xs">
            Live-Präsentation
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={tSlide}
          className="relative flex min-h-screen flex-col pt-36 sm:pt-32 md:pt-28"
        >
          <SlideBackdrop theme={current.theme} slideIndex={slideIndex} />

          <main className="relative z-10 flex flex-1 flex-col justify-center px-4 pb-40 pt-2 sm:px-8 md:px-14 md:pb-44 lg:px-20">
            <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
              {/* Linke Spalte: erste große Elemente stacken */}
              <div className="flex flex-col gap-8 lg:min-h-[32rem]">
                <AnimatePresence initial={false}>
                  {visibleSteps
                    .filter((s) => ["tag", "title", "heroIcon"].includes(s.kind))
                    .map((step, i) => (
                      <StepView
                        key={step.id}
                        step={step}
                        theme={current.theme}
                        animIndex={i}
                        reduceMotion={!!reduceMotion}
                      />
                    ))}
                </AnimatePresence>
              </div>

              {/* Rechte Spalte: Fließtext, Bullets, Callouts (QR separat darunter) */}
              <div className="flex flex-col gap-5">
                <AnimatePresence initial={false}>
                  {visibleSteps
                    .filter((s) => !["tag", "title", "heroIcon", "whatsappQr"].includes(s.kind))
                    .map((step, i) => (
                      <StepView
                        key={step.id}
                        step={step}
                        theme={current.theme}
                        animIndex={i + 3}
                        reduceMotion={!!reduceMotion}
                      />
                    ))}
                </AnimatePresence>
              </div>
            </div>

            {/* WhatsApp QR + Tap: volle Breite unter dem Raster */}
            <AnimatePresence initial={false}>
              {visibleSteps.filter((s) => s.kind === "whatsappQr").map((step, i) => (
                <div key={step.id} className="mx-auto mt-10 w-full max-w-md px-0">
                  <StepView
                    step={step}
                    theme={current.theme}
                    animIndex={i + 6}
                    reduceMotion={!!reduceMotion}
                  />
                </div>
              ))}
            </AnimatePresence>

            {revealed === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pointer-events-none mt-12 text-center text-sm font-medium text-white/40"
              >
                Klick irgendwo · Leertaste · →
              </motion.p>
            ) : null}

            {revealed === stepCount && !atEndOfDeck ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pointer-events-none mt-10 text-center"
              >
                <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold text-white/80">
                  Nächste Folie: weiter klicken →
                </span>
              </motion.div>
            ) : null}
            {atEndOfDeck ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pointer-events-none mt-10 text-center"
              >
                <span className="text-sm font-semibold text-emerald-300/90">Ende der Informationstag-Folien</span>
              </motion.div>
            ) : null}
          </main>
        </motion.div>
      </AnimatePresence>

      {/* Fortschritt */}
      <div className="pointer-events-none absolute left-0 top-0 z-30 h-1 w-full bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400"
          style={{ width: `${Math.min(100, progressSlide)}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>

      {/* Steuerung — stoppt Event-Bubbling zum Haupt-Click */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex justify-center border-t border-white/10 bg-black/55 px-3 py-4 backdrop-blur-2xl sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full max-w-4xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={retreat}
              className="rounded-xl border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
              aria-label="Zurück"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={advance}
              className="rounded-xl border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
              aria-label="Weiter"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-center gap-2">
            {deck.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === slideIndex ? "w-10 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.65)]" : "w-2 bg-white/20 hover:bg-white/45"
                }`}
                aria-label={`Folie ${i + 1}`}
              />
            ))}
          </div>

          <div className="min-w-[11rem] text-right font-mono text-xs font-semibold text-white/70 sm:text-sm">
            Folie {slideIndex + 1}/{deck.length}
            <span className="text-white/40"> · </span>
            Schritt {revealed}/{stepCount}
          </div>
        </div>
      </div>
    </div>
  );
}
