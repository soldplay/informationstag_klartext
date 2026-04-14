import { motion } from "framer-motion";
import { ArrowLeft, BrainCircuit, Calendar, Euro, Sparkles, Users } from "lucide-react";
import { Link } from "wouter";

export default function KursInfo() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(125,211,252,0.1),transparent_35%)]" />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:max-w-4xl md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-200 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            Zurück zur Präsentation
          </Link>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-100/80">
            KLARTEXT! · KI Navigator
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-4 py-10 pb-24 md:max-w-4xl md:px-6 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-200/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-100 backdrop-blur-md"
        >
          <BrainCircuit className="h-4 w-4" />
          Kursinformation
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.45 }}
          className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          KI Navigator — Intensivwoche (Bootcamp)
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mt-5 text-base leading-relaxed text-slate-200 sm:text-lg"
        >
          Einwöchiger, praxisnaher Kurs bei KLARTEXT!: Ihr arbeitet browserbasiert mit aktuellen KI-Tools,
          baut ein kleines Portfolio aus echten Ergebnissen und könnt Fähigkeiten direkt für Beruf,
          Bewerbung und Selbstständigkeit nutzen.
        </motion.p>

        <section className="mt-12 space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-white sm:text-xl">
            <Users className="h-5 w-5 text-sky-300" />
            Für wen?
          </h2>
          <ul className="list-inside list-disc space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-slate-200 sm:text-base">
            <li>Grundkenntnisse am PC (E-Mail, Browser, Textverarbeitung)</li>
            <li>Arbeitssuchende, Quereinsteiger, Selbstständige, Side-Hustle</li>
            <li>Keine Programmierkenntnisse nötig — Fokus auf sofort nutzbare Ergebnisse</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-white sm:text-xl">
            <Calendar className="h-5 w-5 text-sky-300" />
            Ablauf (5 Tage)
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-200 sm:text-base">
            <p className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <strong className="text-white">Tag 1 — KI-Grundkompetenz:</strong> LLMs, Grenzen,
              Datenschutz, Prompt-Formel; Deliverables z. B. Prompt-Vorlage und Do/Don’t-Liste.
            </p>
            <p className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <strong className="text-white">Tag 2 — Dokumente & Recherche:</strong> lange Texte
              zusammenfassen, Quellen prüfen (z. B. Perplexity); einseitige Zusammenfassung mit geprüften
              Quellen.
            </p>
            <p className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <strong className="text-white">Tag 3 — Mini-Webtools:</strong> Code-Grundlagen im Browser
              (z. B. Replit, v0); funktionierendes Mini-Webtool mit kurzer Doku.
            </p>
            <p className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <strong className="text-white">Tag 4 — Design, Bild, Video:</strong> Canva, Bild-KI,
              Kurzvideo; 1-Pager, Bildserie, Video mit Untertiteln.
            </p>
            <p className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <strong className="text-white">Tag 5 — Automatisierung & Abschluss:</strong> Make/Zapier,
              einfache Workflows; Automation testen und ca. 5‑minütiger Portfolio-Pitch.
            </p>
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-white sm:text-xl">
            <Sparkles className="h-5 w-5 text-sky-300" />
            Was ihr mitnehmt
          </h2>
          <p className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-slate-200 sm:text-base">
            Materialien wie Prompt-Baukasten und Checklisten, betreute Übungen mit Feedback, und ein
            konkretes Abschlussportfolio (Text, Recherche, Web-Formular, Visuals, Video, Automation) —
            passend zu den Übungsbeispielen im Begleit-PDF.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-white sm:text-xl">
            <Euro className="h-5 w-5 text-sky-300" />
            Investition (laut Kursunterlage)
          </h2>
          <p className="rounded-2xl border border-sky-200/15 bg-sky-950/30 p-5 text-sm text-sky-100 sm:text-base">
            Beispiel aus dem Planungs-PDF: <strong className="text-white">600&nbsp;€</strong> pro
            Teilnehmer für die einwöchige Intensivwoche — inkl. begleiteter Praxis und Portfolio-Fokus.
            Endgültige Konditionen bitte direkt bei KLARTEXT! anfragen.
          </p>
        </section>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Zur Präsentation
          </Link>
        </div>
      </main>
    </div>
  );
}
