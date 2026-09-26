import React, { useState } from "react";
import {
  Sparkles,
  Trophy,
  Users,
  ArrowRight,
  Copy,
  Check,
  Flame,
  Award,
} from "lucide-react";
import { MegaphoneIllustration, ReferralKeyCard } from "./PRIllustrations";
import { formatEnrollment } from "../lib/validation";

export default function PRHero({
  onOpenRegister,
  defaultEnrollment = "S24CSEU1214",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/?ref=${formatEnrollment(defaultEnrollment)}`;
    navigator.clipboard.writeText(url);
    setCopied(!copied);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-soil text-cream py-16 sm:py-24 border-b border-cream/10">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 bg-radial from-blush/10 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Text & Action */}
          <div className="lg:col-span-8 space-y-6 pr-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blush/20 border border-blush/40 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-blush">
              <Flame size={14} className="animate-bounce" />
              <span>Campus Outreach & PR Drive 2026</span>
            </div>

            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold uppercase leading-[1.1] tracking-[0.02em]">
              Turn Your Network Into
              <span className="block text-blush mt-1">
                Campus Legend Status
              </span>
            </h2>

            <p className="max-w-[44ch] text-sm sm:text-base leading-relaxed text-cream/75 font-sans">
              Your network is your reach. Your reach is your impact. As a CSI
              Bennett PR & Management Junior, your mission is simple: bring
              students to HYPE 4.0, CSI Bennett's hands-on Git & GitHub
              bootcamp. Every verified attendee through your recruitment key
              earns +100 XP and moves you higher on the campus leaderboard.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#leaderboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blush px-7 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-soil transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-xl font-sans"
              >
                <Trophy size={16} />
                View Leaderboard
              </a>
            </div>

            {/* Feature Pills */}
            <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-cream/60 border-t border-cream/10">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Deduplication Protected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blush"></span>
                Bennett Format: S24CSEU1214
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent-blue"></span>
                Database Synced
              </span>
            </div>
          </div>

          {/* Right: Interactive Pass Card & Illustration */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-end space-y-4">
            <ReferralKeyCard
              enrollment={defaultEnrollment}
              className="w-full"
            />

            {/* Megaphone SVG Illustration */}
            <div className="w-full max-w-xs -mt-4 opacity-90 hover:opacity-100 transition-opacity">
              <MegaphoneIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
