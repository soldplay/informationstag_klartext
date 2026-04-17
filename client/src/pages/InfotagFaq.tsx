import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, MessageCircleQuestion } from "lucide-react";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  id: string;
  q: string;
  a: string;
};

const faqSections: { title: string; items: FaqItem[] }[] = [
  {
    title: "Kurs & Ablauf",
    items: [
      {
        id: "was-ist",
        q: "Was genau ist der KI Navigator — und was ist der Unterschied zum heutigen Informationstag?",
        a:
          "Der Informationstag ist Orientierung und Überblick. Die Intensivwoche (Bootcamp) ist die fünftägige Praxiswoche: dort arbeitet ihr geführt mit echten Tools, mit Übungen, Mini-Projekten und einem nutzbaren Portfolio am Ende — Schritt für Schritt, nicht nur Theorie.",
      },
      {
        id: "dauer",
        q: "Wie lange dauert das Bootcamp — und wie ist ein typischer Tag aufgebaut?",
        a:
          "Es ist eine einwöchige Intensivwoche mit fünf aufeinander aufbauenden Tagen. Im Kurskonzept wechseln Demo, begleitetes Arbeiten, Mini-Projekt und kurze Abgaben — damit ihr nicht allein gelassen werdet und am Ende konkrete Ergebnisse habt.",
      },
      {
        id: "online",
        q: "Findet der Kurs vor Ort oder online statt?",
        a:
          "Die Website und die Unterlagen legen den Fokus auf browserbasiertes Arbeiten — ob die Woche hybrid, vor Ort oder rein online läuft, hängt von der konkreten Durchführung bei KLARTEXT! ab. Bitte die Ausschreibung oder das Team fragen, sobald Termin und Ort feststehen.",
      },
      {
        id: "sprache",
        q: "In welcher Sprache läuft der Kurs?",
        a:
          "Unterlagen und Kommunikation sind auf Deutsch ausgelegt. Wenn ihr Englisch bei Tools braucht, könnt ihr das im Kurs als Praxisfall üben — Grundlage bleibt verständliches Deutsch.",
      },
    ],
  },
  {
    title: "Voraussetzungen & Technik",
    items: [
      {
        id: "voraussetzung",
        q: "Brauche ich Vorkenntnisse in Programmierung oder KI?",
        a:
          "Nein. Vorgesehen sind Grundkenntnisse am PC: E-Mail, Browser, Textverarbeitung. Es geht nicht um Perfektion, sondern um Bereitschaft, Neues auszuprobieren — ein Browser reicht als Einstieg.",
      },
      {
        id: "laptop",
        q: "Muss ich einen eigenen Laptop mitbringen?",
        a:
          "Für eine reine Online-Durchführung braucht ihr einen stabilen Rechner und Internet. Ob bei Präsenztermine Rechner gestellt werden, klärt KLARTEXT! vorab — bei Unsicherheit kurz nachfragen.",
      },
      {
        id: "accounts",
        q: "Brauche ich kostenpflichtige Abos für ChatGPT, Canva & Co.?",
        a:
          "Im Kurs wird mit gängigen Tools gearbeitet; viele haben kostenlose Einstiegsstufen oder Testphasen. Ob und wann sich ein kostenpflichtiges Abo lohnt, besprecht ihr situativ — ohne dass ihr von Tag eins alles zahlen müsst.",
      },
      {
        id: "datenschutz",
        q: "Was ist mit Datenschutz — darf ich Firmendaten in KI-Tools eingeben?",
        a:
          "Im Kurs geht es auch um Grenzen und verantwortungsvolle Nutzung. Für sensible Firmendaten gelten oft interne Regeln: nutzt Beispiele oder anonymisierte Fälle, bis ihr euch mit eurer Organisation abgesprochen habt.",
      },
    ],
  },
  {
    title: "Kosten & Organisation",
    items: [
      {
        id: "preis",
        q: "Was kostet die Intensivwoche?",
        a:
          "Laut Kursunterlage liegt die Gebühr bei 690 € pro Teilnehmer für die einwöchige Intensivwoche — inklusive begleiteter Praxis und Portfolio-Fokus. Endgültige Konditionen, Zahlungsmodalitäten und ggf. Förderungen bitte direkt bei KLARTEXT! erfragen.",
      },
      {
        id: "inklusive",
        q: "Was ist in der Gebühr enthalten?",
        a:
          "Typischerweise gehören dazu Materialien wie Prompt-Baukasten, Vorlagen und Checklisten, betreute Übungen mit Feedback sowie die Erarbeitung eines nutzbaren Abschlussportfolios — konkret passend zu den Übungen im Begleitmaterial.",
      },
      {
        id: "fehlen",
        q: "Was passiert, wenn ich einen Tag nicht kann?",
        a:
          "Das hängt von der Durchführung ab. Fragt früh nach — manchmal gibt es Nachhol-Hinweise oder Materialien, aber eine komplette Intensivwoche lebt vom Durchhalten. Klärt Ausnahmen direkt mit KLARTEXT!.",
      },
      {
        id: "teilnehmerzahl",
        q: "Wie groß ist die Gruppe?",
        a:
          "Kleine bis mittlere Gruppen sind für Feedback und Begleitung sinnvoll. Die genaue maximale Teilnehmerzahl steht in der Ausschreibung oder wird vor Start kommuniziert.",
      },
    ],
  },
  {
    title: "Ergebnis & Abschluss",
    items: [
      {
        id: "portfolio",
        q: "Was bedeutet „Portfolio“ am Ende konkret?",
        a:
          "Ihr sammelt sichtbare Ergebnisse aus der Woche — z. B. Texte, Recherche, kleines Webtool, Visuals, Kurzvideo und einfache Automation — die ihr zeigen und weiterverwenden könnt, statt nur „mitgemacht“ zu haben.",
      },
      {
        id: "zertifikat",
        q: "Gibt es ein Zertifikat?",
        a:
          "Es ist von einem KLARTEXT-Zertifikat bzw. Leistungsnachweis die Rede, wenn Portfolio und Qualitätskriterien erfüllt sind — Details und Kriterien werden im Kurs transparent gemacht.",
      },
      {
        id: "pitch",
        q: "Muss ich vor allen präsentieren?",
        a:
          "Am Ende steht ein kurzer Portfolio-Pitch (in der Größenordnung von etwa fünf Minuten) — das ist kein Show-Talentwettbewerb, sondern ihr stellt euer Toolkit vor, was ihr gelernt habt und was ihr mitnehmt.",
      },
    ],
  },
  {
    title: "Nach dem Kurs & Austausch",
    items: [
      {
        id: "whatsapp",
        q: "Wozu die WhatsApp-Gruppe?",
        a:
          "Dort bleibt ihr zum Infotag und Bootcamp informiert, könnt Fragen stellen und euch mit anderen Teilnehmenden austauschen — freiwillig, aber praktisch für Rückfragen und Termine.",
      },
      {
        id: "support",
        q: "Gibt es nach der Woche noch Support?",
        a:
          "Der Kurs baut Selbstständigkeit im Umgang mit KI auf. Langfristige Einzelbetreuung ist in der Regel nicht Teil der Standardgebühr — was möglich ist (Community, Folgeangebote), sagt euch KLARTEXT! vor Ort oder in der Ausschreibung.",
      },
      {
        id: "anmeldung",
        q: "Wie melde ich mich verbindlich an?",
        a:
          "Nutzt die offiziellen Kanäle von KLARTEXT! (Anmeldung, Beratung, ggf. Link aus der Präsentation). Speichert euch Termine und schreibt bei Unklarheiten kurz — dann gibt es keine Missverständnisse bei der Buchung.",
      },
    ],
  },
];

export default function InfotagFaq() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(125,211,252,0.09),transparent_38%)]" />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:max-w-4xl md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-200 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            Zurück zur Präsentation
          </Link>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-100/80">
            KLARTEXT! · Q&amp;A
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-4 py-10 pb-28 md:max-w-4xl md:px-6 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-200/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-100 backdrop-blur-md"
        >
          <MessageCircleQuestion className="h-4 w-4" />
          Informationstag &amp; Bootcamp
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.45 }}
          className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          Fragen &amp; Antworten
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mt-5 flex items-start gap-3 text-base leading-relaxed text-slate-200 sm:text-lg"
        >
          <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-sky-400/90" />
          <span>
            Typische Fragen von Teilnehmenden am Informationstag zur Intensivwoche — mit klaren
            Orientierungsantworten. Details zu Terminen, Ort und Verträgen immer direkt bei KLARTEXT!
          </span>
        </motion.p>

        <div className="mt-12 space-y-14">
          {faqSections.map((section, sIdx) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + sIdx * 0.04, duration: 0.4 }}
            >
              <h2 className="mb-4 text-lg font-bold tracking-tight text-white sm:text-xl">
                {section.title}
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {section.items.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 data-[state=open]:bg-white/[0.07] md:px-5"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-white hover:no-underline md:text-[1.05rem] [&>svg]:text-sky-300">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[0.95rem] leading-relaxed text-slate-200 md:text-base">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.section>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-10 sm:flex-row sm:flex-wrap">
          <Link
            href="/kurs-info"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Kurs-Überblick
          </Link>
          <Link
            href="/informationstag-praesentation"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-6 py-3 text-center text-sm font-semibold text-sky-100 transition hover:bg-sky-500/25"
          >
            Informationstag-Folien
          </Link>
        </div>
      </main>
    </div>
  );
}
