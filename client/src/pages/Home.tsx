import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { AmbientAudioControls } from "@/components/AmbientAudioControls";
import { WhatsAppQrBlock } from "@/components/WhatsAppQrBlock";
import { WHATSAPP_GROUP_URL } from "@/constants/whatsapp";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BrainCircuit,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  LayoutDashboard,
  MessageSquareText,
  MessageCircleQuestion,
  Presentation,
  QrCode,
  Sparkles,
  Users,
  Wand2,
  Workflow,
  LucideIcon,
} from "lucide-react";

type AgendaAccordionItem = {
  title: string;
  body: string;
};

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  content: string;
  points?: string[];
  /** Nur Folie „Agenda“: ausklappbare Antworten (Inhalt aus Kurs-PDFs) */
  agendaAccordion?: AgendaAccordionItem[];
  gradient: string;
  image?: string;
  mediaType?: "image" | "video";
  mediaSrc?: string;
  poster?: string;
  /** Ein Vorschau-Video mit Steuerung (z. B. Praxis-/Community-Folie) */
  embeddedVideo?: { src: string; caption?: string };
  icon: LucideIcon;
  stats?: { label: string; value: string }[];
  qr?: { label: string; value: string; caption?: string }[];
  cta?: { label: string; href: string };
  note?: string;
};

const REGISTRATION_URL = "https://klartext.example/anmeldung";

const slides: Slide[] = [
  {
    id: "title",
    eyebrow: "KLARTEXT! | Info-Präsentation",
    title: "KI Navigator Kurs",
    subtitle: "Dein Weg in die Zukunft der Künstlichen Intelligenz",
    content:
      "Eine interaktive Premium-Präsentation für Interessenten, Einsteiger, Unternehmer und alle, die KI praktisch, verständlich und beruflich relevant einsetzen wollen.",
    gradient: "from-slate-950 via-sky-950 to-slate-900",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    icon: BrainCircuit,
    stats: [
      { label: "Live-Demos", value: "Praxisnah" },
      { label: "Lernstil", value: "Schritt für Schritt" },
      { label: "Ziel", value: "Handlungskompetenz" },
    ],
    cta: { label: "Mehr erfahren", href: "/kurs-info" },
  },
  {
    id: "agenda",
    eyebrow: "Agenda",
    title: "Was euch heute erwartet",
    content:
      "In wenigen Minuten bekommt ihr einen klaren Überblick darüber, warum der Kurs jetzt relevant ist, was ihr konkret lernt und wie ihr euch anmelden könnt.",
    gradient: "from-slate-900 via-sky-900 to-slate-800",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    icon: LayoutDashboard,
    agendaAccordion: [
      {
        title: "Warum KI gerade jetzt ein echter Vorteil ist",
        body:
          "Laut Kurskonzept (KI Navigator, 1 Woche Bootcamp) verändert KI bereits heute Schreiben, Recherche, Gestaltung und Kommunikation. Der Kurs setzt auf sofortige Anwendbarkeit im Beruf, in der Jobsuche und bei der Akquise – statt reiner Theorie entsteht ein persönliches AI-Toolkit (Prompt-Bibliothek, Mini-Webtool, Design-Assets, Video, Automation), das direkt nach der Woche nutzbar ist. Moderne LLMs und multimodale Workflows helfen, Routine schneller vorzubereiten und Qualität mit Quellenprüfung zu sichern.",
      },
      {
        title: "Für wen der KI Navigator Kurs gedacht ist",
        body:
          "Die Unterlagen adressieren ausdrücklich Personen mit Grundkenntnissen am PC (E-Mail, Browser, Textverarbeitung): Arbeitssuchende, Quereinsteiger, Selbstständige oder alle, die ein Side-Hustle aufbauen möchten. Voraussetzung ist kein Programmierhintergrund; der Fokus liegt auf niederschwelligem, browserbasiertem Zugang und Ergebnissen, die sich für Bewerbung, Kundenkommunikation und Selbstständigkeit eignen.",
      },
      {
        title: "Die 5 Module im Überblick",
        body:
          "Der Intensivplan spannt fünf aufeinander aufbauende Tage („Learning by Doing“): Tag 1 Orientierung & KI-Grundkompetenz (LLMs, Grenzen, Prompt-Formel, Do/Don’t). Tag 2 Multimodal & Recherche (lange Dokumente, Zusammenfassungen, Quellen mit z. B. Perplexity). Tag 3 Code & Prompt-to-App (Mini-Webtools im Browser, Replit/v0). Tag 4 Design, Bild & Video (Canva, Bild-KI, Kurzvideo). Tag 5 Automatisierung & Abschluss (Make/Zapier, Portfolio-Pitch). Jeder Tag endet mit konkreten Deliverables.",
      },
      {
        title: "Praxis, Community, Support und Abschluss",
        body:
          "Im Ablauf steht festes Muster: Demo (ca. 20 min) → Guided Lab (ca. 60 min) → Mini-Projekt (ca. 60 min) → kurze Abgabe. Das Übungsheft beschreibt pro Tag mehrere Aufgaben mit klaren Deliverables (E-Mail, Recherche, Formular, 1-Pager, Bildserie, Video, Automation). Abschluss: Leistungsnachweis bzw. Zertifikat bei vollständigem Portfolio und Qualitätskriterien; optional ein ca. 5‑minütiger Pitch des eigenen KI-Toolkits.",
      },
      {
        title: "Anmeldung per QR-Code direkt vor Ort",
        body:
          "Auf der letzten QR-Folie findet ihr einen Code für die WhatsApp-Gruppe zum Infotag/Bootcamp — dort könnt ihr euch eintragen und austauschen. Die Kursbeschreibung nennt zudem die Bootcamp-Gebühr (690 € pro Teilnehmer) und die enthaltenen Leistungen: Materialien (Prompt-Baukasten, Vorlagen, Checklisten), betreute Übungen mit Feedback und ein nutzbares Abschlussportfolio.",
      },
    ],
  },
  {
    id: "why-now",
    eyebrow: "Warum jetzt?",
    title: "KI ist keine Zukunftsmusik mehr",
    content:
      "KI verändert bereits heute, wie wir schreiben, recherchieren, gestalten, kommunizieren und Entscheidungen treffen. Wer jetzt lernt, mit KI zu arbeiten, verschafft sich einen klaren Vorsprung.",
    gradient: "from-slate-950 via-blue-900 to-slate-900",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80",
    icon: Sparkles,
    points: [
      "Neue Fähigkeiten sind in fast allen Branchen gefragt",
      "Routineaufgaben lassen sich schneller und besser vorbereiten",
      "KI erweitert Kreativität, Produktivität und Orientierung",
    ],
  },
  {
    id: "for-everyone",
    eyebrow: "Für wen geeignet",
    title: "Ein Kurs für Einsteiger und Macher",
    content:
      "Der KI Navigator Kurs ist bewusst so aufgebaut, dass Menschen ohne Programmierkenntnisse genauso gut einsteigen können wie Teilnehmer mit erster Vorerfahrung.",
    gradient: "from-slate-900 via-slate-800 to-blue-950",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    icon: Users,
    points: [
      "Keine Programmierkenntnisse nötig",
      "Verständliche Schritt-für-Schritt-Erklärungen",
      "Viel Zeit für Fragen, Wiederholung und Anwendung",
      "Ideal für Kreative, Selbstständige, Teams und Interessierte",
    ],
  },
  {
    id: "module-1",
    eyebrow: "Modul 1",
    title: "Grundlagen und KI-Verständnis",
    content:
      "Wir starten bei Null: Was ist KI, wie funktionieren moderne Tools im Kern und wie trennt man Hype von echter Anwendung?",
    gradient: "from-slate-950 via-sky-900 to-blue-950",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    icon: BookOpen,
    points: [
      "Grundbegriffe einfach erklärt",
      "Wie Large Language Models grob arbeiten",
      "Chancen, Grenzen und typische Fehler verstehen",
      "Sicherer Einstieg in die KI-Welt ohne Überforderung",
    ],
  },
  {
    id: "module-2",
    eyebrow: "Modul 2",
    title: "Text-KI und Prompting",
    content:
      "In diesem Modul lernt ihr, wie ihr mit KI professionell Texte erstellt, verbessert, umschreibt, zusammenfasst und auf konkrete Ziele hin steuert.",
    gradient: "from-slate-900 via-sky-900 to-cyan-900",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
    icon: MessageSquareText,
    points: [
      "Bessere Prompts für bessere Ergebnisse",
      "E-Mails, Posts, Konzepte und Texte schneller erstellen",
      "Ton, Stil und Struktur gezielt anpassen",
      "KI als Schreibassistent statt Zufallsgenerator nutzen",
    ],
  },
  {
    id: "module-3",
    eyebrow: "Modul 3",
    title: "Bild-KI und kreative Produktion",
    content:
      "Von Social-Media-Grafiken bis zu Konzeptbildern: Ihr lernt, wie Bild-KI richtig eingesetzt wird und wie ihr visuell überzeugende Ergebnisse erzeugt.",
    gradient: "from-slate-900 via-indigo-900 to-slate-950",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80",
    icon: ImageIcon,
    points: [
      "Bildideen klar formulieren und gezielt steuern",
      "Konsistente Bildserien und visuelle Konzepte entwickeln",
      "KI für Branding, Präsentation und Content nutzen",
      "Kreativität erhöhen ohne Qualitätsverlust",
    ],
  },
  {
    id: "module-4",
    eyebrow: "Modul 4",
    title: "Recherche, Analyse und Entscheidungen",
    content:
      "KI kann Informationen strukturieren, Muster zeigen und euch helfen, bessere Entscheidungen vorzubereiten – wenn man die Ergebnisse richtig prüft.",
    gradient: "from-slate-950 via-blue-950 to-slate-900",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    icon: Presentation,
    points: [
      "Recherche mit KI effizient vorbereiten",
      "Zusammenfassungen und Analysen richtig nutzen",
      "Quellen prüfen statt blind vertrauen",
      "KI als Denk- und Analyseverstärker einsetzen",
    ],
  },
  {
    id: "module-5",
    eyebrow: "Modul 5",
    title: "Automatisierung, Mini-Tools und Workflow",
    content:
      "Hier wird KI richtig praktisch: kleine Automationen, einfache Webtools, clevere Workflows und produktive Verknüpfungen für den Alltag.",
    gradient: "from-slate-900 via-cyan-900 to-slate-950",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
    icon: Workflow,
    points: [
      "KI-gestützte Mini-Workflows aufbauen",
      "Einfache Tools im Browser umsetzen",
      "Zeit sparen durch smarte Automatisierung",
      "Vom Wissen direkt in die Anwendung wechseln",
    ],
  },
  {
    id: "practice",
    eyebrow: "Praxis statt Theorie",
    title: "Lernen durch echte Anwendung",
    content:
      "Der Kurs ist bewusst praxisorientiert. Ihr arbeitet mit konkreten Aufgaben, Mini-Projekten und direkt nutzbaren Ergebnissen statt mit abstrakten Folien allein.",
    gradient: "from-slate-900 via-blue-900 to-slate-950",
    image:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1600&q=80",
    icon: Wand2,
    points: [
      "Direkte Übungen mit echten Tools",
      "Eigene Ideen und berufliche Fälle integrieren",
      "Portfolio mit sichtbaren Resultaten aufbauen",
      "Lernen mit klaren Deliverables pro Modul",
    ],
    stats: [
      { label: "Fokus", value: "Umsetzen" },
      { label: "Format", value: "Interaktiv" },
      { label: "Ergebnis", value: "Portfolio" },
    ],
    embeddedVideo: {
      src: "/videos/ki-navigator-preview.mp4",
      caption: "Eindruck aus Praxis und Kursumfeld",
    },
  },
  {
    id: "support",
    eyebrow: "Support und Community",
    title: "Ihr lernt nicht allein",
    content:
      "Neben den Inhalten ist die Begleitung ein zentraler Teil des Kurses. Fragen, Live-Sessions, Austausch und gegenseitige Unterstützung machen den Unterschied.",
    gradient: "from-slate-950 via-sky-950 to-slate-900",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    icon: Users,
    points: [
      "Regelmäßige Live-Sessions",
      "Direkter Austausch bei Fragen",
      "Community-Gefühl statt Alleinlernen",
      "Motivation und Orientierung während der gesamten Reise",
    ],
    embeddedVideo: {
      src: "/videos/ki-navigator-preview_2.mp4",
      caption: "Lernen, Fokus und Alltag am Rechner",
    },
  },
  {
    id: "certificate",
    eyebrow: "Ergebnis und Mehrwert",
    title: "Kompetenz, Sichtbarkeit und Zertifikat",
    content:
      "Am Ende zählt nicht nur Wissen, sondern Können. Der größte Mehrwert ist, dass ihr KI aktiv einsetzen könnt – für euren Beruf, eure Projekte und eure Zukunft.",
    gradient: "from-slate-900 via-indigo-900 to-slate-950",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
    icon: BadgeCheck,
    points: [
      "Praktische Handlungskompetenz",
      "Sichtbare Ergebnisse und eigene Beispiele",
      "Mehr Sicherheit im Umgang mit KI-Tools",
      "Zertifikat nach erfolgreichem Abschluss",
    ],
    embeddedVideo: {
      src: "/videos/ki-navigator-preview_3.mp4",
      caption: "Impuls, Energie und Ausblick nach dem Kurs",
    },
  },
  {
    id: "registration",
    eyebrow: "WhatsApp-Gruppe",
    title: "Scannt und joint der Gruppe",
    content:
      "Mit einem Scan landet ihr direkt in der WhatsApp-Gruppe zum Infotag / Bootcamp — dort bleibt ihr informiert, könnt Fragen stellen und euch mit anderen Teilnehmenden austauschen.",
    gradient: "from-slate-900 via-sky-900 to-slate-950",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    icon: QrCode,
    qr: [
      {
        label: "WhatsApp-Gruppe",
        value: WHATSAPP_GROUP_URL,
        caption: "Beitritt zur Gruppe „Infotag: Einstiegskurs – Bootcamp“",
      },
    ],
  },
  {
    id: "cta",
    eyebrow: "Finale Folie",
    title: "Bereit, KI sinnvoll zu beherrschen?",
    subtitle: "Werdet KI-Navigatoren und gestaltet die Zukunft aktiv mit.",
    content:
      "Nicht zuschauen. Mitgestalten. Lernen, anwenden, wachsen.",
    gradient: "from-slate-950 via-blue-900 to-slate-900",
    image:
      "https://images.unsplash.com/photo-1516321310762-4794372b7d8b?auto=format&fit=crop&w=1600&q=80",
    icon: BrainCircuit,
    cta: { label: "Zur Anmeldung", href: REGISTRATION_URL },
    stats: [
      { label: "Einstieg", value: "Ohne Hürde" },
      { label: "Format", value: "Praxisnah" },
      { label: "Zukunft", value: "Jetzt" },
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -24, scale: 0.985 },
};

const iconMotion = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, -3, 3, 0],
    scale: [1, 1.06, 1],
    transition: {
      duration: 4.2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoLoadFailed, setVideoLoadFailed] = useState(false);
  const [agendaOpenIndex, setAgendaOpenIndex] = useState<number | null>(null);

  const slide = slides[currentSlide];
  const progress = useMemo(
    () => ((currentSlide + 1) / slides.length) * 100,
    [currentSlide]
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    setVideoLoadFailed(false);
    setAgendaOpenIndex(null);
  }, [slide.id]);

  const toggleAgendaItem = (index: number) => {
    setAgendaOpenIndex((prev) => (prev === index ? null : index));
  };

  const SlideIcon = slide.icon;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(125,211,252,0.12),transparent_30%)]" />

      <div className="absolute left-0 top-0 z-40 h-1.5 w-full bg-white/10">
        <motion.div
          className="h-full rounded-r-full bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        />
      </div>

      <div className="fixed left-0 top-0 z-50 flex w-full flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 md:px-8 md:py-4">
        <div className="flex w-full flex-wrap items-center gap-2 sm:max-w-none sm:gap-3">
          <div className="max-w-full truncate rounded-full border border-white/10 bg-slate-900/60 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sky-100 backdrop-blur-xl sm:px-4 sm:text-xs md:text-sm">
            KLARTEXT! • KI Navigator Kurs
          </div>
          <Link
            href="/informationstag-praesentation"
            className="inline-flex max-w-full items-center gap-2 truncate rounded-full border border-sky-300/25 bg-sky-500/15 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-sky-50 backdrop-blur-xl transition hover:border-sky-200/40 hover:bg-sky-500/25 sm:px-4 sm:text-xs md:text-sm"
          >
            <Presentation className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            Informationstag Präsentation
          </Link>
          <Link
            href="/infotag-fragen"
            className="inline-flex max-w-full items-center gap-2 truncate rounded-full border border-white/15 bg-white/8 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/90 backdrop-blur-xl transition hover:border-white/25 hover:bg-white/15 sm:px-4 sm:text-xs md:text-sm"
          >
            <MessageCircleQuestion className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            Fragen &amp; Antworten
          </Link>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2 self-end sm:flex-row sm:items-center sm:self-auto">
          <AmbientAudioControls spaceTogglesPlayback />
        </div>
      </div>

      <div className="relative min-h-screen cursor-default">
        <AnimatePresence mode="wait">
          <motion.section
            key={slide.id}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className={`relative min-h-screen bg-gradient-to-br ${slide.gradient}`}
          >
            {slide.mediaType === "video" &&
              slide.mediaSrc &&
              !videoLoadFailed ? (
              <div className="absolute inset-0 overflow-hidden">
                <video
                  className="h-full w-full object-cover opacity-30"
                  src={slide.mediaSrc}
                  poster={slide.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={() => setVideoLoadFailed(true)}
                />
                <div className="absolute inset-0 bg-slate-950/55" />
              </div>
            ) : slide.mediaType === "video" && slide.poster ? (
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.poster}
                  alt=""
                  className="h-full w-full object-cover opacity-25"
                />
                <div className="absolute inset-0 bg-slate-950/55" />
              </div>
            ) : slide.image ? (
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover opacity-25"
                />
                <div className="absolute inset-0 bg-slate-950/55" />
              </div>
            ) : null}

            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_30%,rgba(255,255,255,0.03))]" />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-28 pt-20 sm:px-6 sm:pt-24 md:px-10 xl:px-16">
              <div
                className={`grid gap-10 ${
                  slide.agendaAccordion?.length || slide.embeddedVideo
                    ? "items-start"
                    : "items-center xl:grid-cols-[1.25fr_0.75fr]"
                }`}
              >
                <div
                  className={
                    slide.agendaAccordion?.length || slide.embeddedVideo
                      ? "w-full max-w-4xl xl:max-w-5xl"
                      : "max-w-4xl"
                  }
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.45 }}
                    className="mb-5 inline-flex max-w-full items-center rounded-full border border-sky-200/20 bg-white/10 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-sky-100 backdrop-blur-xl sm:px-4 sm:text-xs md:text-sm"
                  >
                    {slide.eyebrow}
                  </motion.div>

                  <motion.div
                    variants={iconMotion}
                    animate="animate"
                    className="mb-7 inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-white/10 text-sky-100 shadow-2xl shadow-sky-950/40 backdrop-blur-xl sm:h-24 sm:w-24 md:h-28 md:w-28"
                  >
                    <SlideIcon className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" />
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16, duration: 0.5 }}
                    className="max-w-5xl text-4xl font-black leading-[0.98] text-white drop-shadow-xl sm:text-5xl md:text-7xl xl:text-8xl"
                  >
                    {slide.title}
                  </motion.h1>

                  {slide.subtitle ? (
                    <motion.p
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22, duration: 0.45 }}
                      className="mt-6 max-w-4xl text-2xl font-medium leading-relaxed text-white/90 md:text-3xl"
                    >
                      {slide.subtitle}
                    </motion.p>
                  ) : null}

                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.26, duration: 0.45 }}
                    className="mt-6 max-w-4xl text-xl leading-relaxed text-slate-100/95 md:text-2xl xl:text-[1.7rem]"
                  >
                    {slide.content}
                  </motion.p>

                  {slide.agendaAccordion?.length ? (
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.32, duration: 0.45 }}
                      className="mt-10 space-y-3"
                    >
                      {slide.agendaAccordion.map((item, idx) => {
                        const open = agendaOpenIndex === idx;
                        return (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -18 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.36 + idx * 0.06, duration: 0.35 }}
                            className="overflow-hidden rounded-2xl border border-white/10 bg-white/8 shadow-xl shadow-slate-950/20 backdrop-blur-md"
                          >
                            <button
                              type="button"
                              onClick={() => toggleAgendaItem(idx)}
                              className="flex w-full items-start gap-4 px-5 py-4 text-left text-lg font-medium text-white/95 transition hover:bg-white/5 md:text-xl"
                              aria-expanded={open}
                            >
                              <div className="mt-1 shrink-0 rounded-xl bg-sky-300/15 p-2 text-sky-200">
                                <ArrowRight
                                  className={`h-5 w-5 transition-transform ${open ? "rotate-90" : ""}`}
                                />
                              </div>
                              <span className="flex-1 pt-0.5">{item.title}</span>
                              <ChevronDown
                                className={`mt-1 h-5 w-5 shrink-0 text-sky-200/90 transition-transform duration-300 ${
                                  open ? "rotate-180" : ""
                                }`}
                                aria-hidden
                              />
                            </button>
                            <AnimatePresence initial={false}>
                              {open ? (
                                <motion.div
                                  key="panel"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.35, ease: "easeInOut" }}
                                  className="border-t border-white/10"
                                >
                                  <p className="px-5 py-4 text-base leading-relaxed text-slate-100/95 md:text-lg">
                                    {item.body}
                                  </p>
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : slide.points?.length ? (
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.32, duration: 0.45 }}
                      className="mt-10 grid gap-4 lg:max-w-4xl"
                    >
                      {slide.points.map((point, idx) => (
                        <motion.div
                          key={point}
                          initial={{ opacity: 0, x: -18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.36 + idx * 0.08, duration: 0.35 }}
                          className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/8 px-5 py-4 text-lg text-white/95 shadow-xl shadow-slate-950/20 backdrop-blur-md md:text-xl"
                        >
                          <div className="mt-1 rounded-xl bg-sky-300/15 p-2 text-sky-200">
                            <ArrowRight className="h-5 w-5" />
                          </div>
                          <span>{point}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : null}

                  {slide.embeddedVideo ? (
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.34, duration: 0.45 }}
                      className="mt-10 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-xl shadow-slate-950/30"
                    >
                      {slide.embeddedVideo.caption ? (
                        <div className="border-b border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-sky-100">
                          {slide.embeddedVideo.caption}
                        </div>
                      ) : null}
                      <video
                        className="aspect-video w-full bg-black object-contain"
                        src={slide.embeddedVideo.src}
                        controls
                        playsInline
                        preload="metadata"
                        title={slide.embeddedVideo.caption ?? "Kursvideo"}
                      />
                    </motion.div>
                  ) : null}

                  {slide.note ? (
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.42, duration: 0.4 }}
                      className="mt-8 max-w-4xl rounded-2xl border border-sky-200/15 bg-slate-950/40 px-5 py-4 text-sm leading-relaxed text-sky-100/85 md:text-base"
                    >
                      {slide.note}
                    </motion.p>
                  ) : null}

                  {slide.cta ? (
                    slide.cta.href.startsWith("/") ? (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="mt-10"
                      >
                        <Link
                          href={slide.cta.href}
                          className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3.5 text-base font-bold text-slate-900 transition hover:scale-[1.02] hover:bg-sky-100 sm:px-6 sm:py-4 sm:text-lg"
                        >
                          {slide.cta.label}
                          <ArrowRight className="h-5 w-5 shrink-0" />
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.a
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        href={slide.cta.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3.5 text-base font-bold text-slate-900 transition hover:scale-[1.02] hover:bg-sky-100 sm:px-6 sm:py-4 sm:text-lg"
                      >
                        {slide.cta.label}
                        <ArrowRight className="h-5 w-5 shrink-0" />
                      </motion.a>
                    )
                  ) : null}
                </div>

                {slide.stats?.length || slide.qr?.length ? (
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18, duration: 0.55 }}
                    className="space-y-5"
                  >
                    {slide.stats?.length ? (
                      <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
                        {slide.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
                          >
                            <div className="text-sm uppercase tracking-[0.22em] text-sky-100/80">
                              {stat.label}
                            </div>
                            <div className="mt-2 text-3xl font-black text-white md:text-4xl">
                              {stat.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {slide.qr?.length ? (
                      <div
                        className={`grid gap-4 xl:grid-cols-1 ${
                          slide.qr.length > 1 ? "md:grid-cols-2" : "max-w-xs sm:max-w-sm"
                        }`}
                      >
                        {slide.qr.map((item) => (
                          <WhatsAppQrBlock
                            key={item.label}
                            label={item.label}
                            caption={item.caption}
                            size={slide.qr?.length === 1 ? 200 : 168}
                          />
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                ) : null}
              </div>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-3 left-0 right-0 z-50 flex items-center justify-center px-3 sm:bottom-5 sm:px-4">
        <div className="flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 rounded-full border border-white/10 bg-slate-900/60 px-2 py-2 shadow-2xl shadow-slate-950/50 backdrop-blur-2xl sm:gap-3 sm:px-3 sm:py-3 md:px-5">
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="rounded-full border border-white/10 bg-white/10 p-3 text-white transition hover:bg-white/20"
              aria-label="Vorherige Folie"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextSlide}
              className="rounded-full border border-white/10 bg-white/10 p-3 text-white transition hover:bg-white/20"
              aria-label="Nächste Folie"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div
            className="order-3 flex min-w-0 max-w-full flex-1 basis-full items-center justify-center gap-1.5 overflow-x-auto px-1 sm:order-none sm:basis-auto sm:gap-2 sm:px-3 md:max-w-3xl"
            aria-hidden
          >
            {slides.map((item, idx) => (
              <div
                key={item.id}
                title={item.eyebrow}
                className={`h-3 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "w-12 bg-white" : "w-3 bg-white/25"
                }`}
              />
            ))}
          </div>

          <div className="min-w-[4.5rem] text-right text-xs font-semibold text-slate-200 sm:min-w-[112px] sm:text-sm md:text-base">
            {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </div>
        </div>
      </div>

    </div>
  );
}
