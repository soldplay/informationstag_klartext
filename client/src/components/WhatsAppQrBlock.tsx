import { QRCodeSVG } from "qrcode.react";
import { ExternalLink, QrCode } from "lucide-react";
import { WHATSAPP_GROUP_URL } from "@/constants/whatsapp";

type Props = {
  label: string;
  caption?: string;
  /** Größe des QR-Bildes in px */
  size?: number;
  className?: string;
  /** optional: Container stoppt Klick-Propagation (z. B. Info-Folie) */
  stopClickPropagation?: boolean;
};

export function WhatsAppQrBlock({
  label,
  caption,
  size = 200,
  className = "",
  stopClickPropagation = false,
}: Props) {
  const stop = (e: React.SyntheticEvent) => {
    if (stopClickPropagation) e.stopPropagation();
  };

  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl ${className}`}
      onClick={stop}
      role="group"
      aria-label={label}
    >
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-2xl bg-sky-300/15 p-2 text-sky-200">
          <QrCode className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-lg font-bold text-white">{label}</div>
          {caption ? <div className="mt-0.5 text-sm text-slate-200/85">{caption}</div> : null}
        </div>
      </div>
      <div className="inline-flex max-w-full rounded-2xl bg-white p-2 shadow-2xl shadow-slate-950/20 sm:p-3">
        <QRCodeSVG value={WHATSAPP_GROUP_URL} size={size} includeMargin />
      </div>
      <a
        href={WHATSAPP_GROUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={stop}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-400/35 bg-gradient-to-r from-emerald-600/40 to-green-700/35 px-4 py-3.5 text-center text-sm font-bold text-white shadow-lg transition hover:border-emerald-300/60 hover:from-emerald-600/55 hover:to-green-700/50 md:text-base"
      >
        <ExternalLink className="h-4 w-4 shrink-0 opacity-90" />
        Gruppe beitreten (ohne QR scannen)
      </a>
      <p className="mt-3 break-all text-center text-[0.7rem] leading-snug text-sky-100/70">
        {WHATSAPP_GROUP_URL}
      </p>
    </div>
  );
}
