import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  Sparkles,
  Laptop,
  GitBranch,
  Copy,
  Check,
  ArrowRight,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { EVENT_DETAILS } from "../lib/supabase";
import { formatEnrollment } from "../lib/validation";

export default function HypeEventBanner({
  onOpenRegister,
  candidateEnrollment = "",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/?ref=${formatEnrollment(candidateEnrollment)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-soil text-cream py-16 sm:py-20 border-b border-cream/10">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-radial from-blush/15 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 relative z-10">
        {/* Main Event Card */}
        <div className="rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Glowing Top Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5 mb-8">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-blush">
                OFFICIAL RECRUITMENT MISSION
              </span>
            </div>

            <a
              href={EVENT_DETAILS.lumaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-mono text-cream hover:bg-blush hover:text-soil transition-colors"
            >
              <span>View on Luma</span>
              <ExternalLink size={13} />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-blush font-mono text-xs font-bold tracking-wider uppercase">
                <GitBranch size={16} />
                <span>Git & GitHub Interactive Bootcamp</span>
              </div>

              <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold uppercase leading-[1.1] tracking-[0.02em] text-cream">
                HYPE 4.0
                <span className="block text-blush text-[clamp(1.6rem,3.5vw,2.8rem)] mt-1 font-normal font-sans tracking-tight">
                  Hack Your Profile
                </span>
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-cream/80 font-sans max-w-[48ch]">
                Your GitHub profile is your digital identity. Build it properly.
                HYPE 4.0 is an interactive Git & GitHub bootcamp by CSI, Bennett
                University designed to take you from your first repository to
                real-world collaboration. Learn the workflow. Build something.
                Push it live. Start your developer journey.
              </p>

              {/* Event Metadata Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs text-cream/90">
                <div className="rounded-xl bg-white/5 p-3 border border-white/10 flex items-center gap-2.5">
                  <Calendar size={18} className="text-blush shrink-0" />
                  <div>
                    <span className="text-[0.65rem] text-cream/50 block">
                      DATE
                    </span>
                    <span className="font-bold">28 Sept 2026</span>
                  </div>
                </div>

                <div className="rounded-xl bg-white/5 p-3 border border-white/10 flex items-center gap-2.5">
                  <Clock size={18} className="text-blush shrink-0" />
                  <div>
                    <span className="text-[0.65rem] text-cream/50 block">
                      TIME
                    </span>
                    <span className="font-bold">6:00 PM</span>
                  </div>
                </div>

                <div className="rounded-xl bg-white/5 p-3 border border-white/10 flex items-center gap-2.5">
                  <MapPin size={18} className="text-blush shrink-0" />
                  <div>
                    <span className="text-[0.65rem] text-cream/50 block">
                      VENUE
                    </span>
                    <span className="font-bold">PLH 101, BU</span>
                  </div>
                </div>
              </div>

              {/* Laptop Reminder */}
              <div className="rounded-xl bg-blush/20 border border-blush/40 p-3.5 flex items-center gap-3 text-xs font-sans text-cream">
                <Laptop size={18} className="text-blush shrink-0" />
                <span>
                  <strong>
                    BRING YOUR LAPTOP — THIS IS A 100% HANDS-ON SESSION.
                  </strong>
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-3">
                <a
                  href={EVENT_DETAILS.lumaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-blush px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-soil hover:bg-white hover:scale-105 transition-all shadow-xl font-sans"
                >
                  Register on Luma
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            {/* Right: Interview Candidate Task Box */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl bg-white/10 border-2 border-blush/50 p-6 shadow-xl relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blush flex items-center gap-1.5">
                    <Flame size={15} className="animate-pulse" />
                    YOUR RECRUITMENT MISSION
                  </span>
                  <span className="rounded-full bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[0.65rem] font-mono font-bold">
                    ACTIVE
                  </span>
                </div>

                <p className="text-xs text-cream/80 leading-relaxed font-sans">
                  This isn't a sit-down interview task. Get students to register
                  for HYPE 4.0, convince them to attend, and get their
                  attendance verified using your recruitment key. Every verified
                  attendee = +100 XP. Your outreach becomes your interview
                  record.
                </p>

                {/* Candidate Key Card */}
                <div className="rounded-xl bg-soil p-4 border border-white/10 font-mono space-y-2">
                  <div className="flex flex-col sm:flex-row flex-wrap sm:justify-between text-[0.7rem] text-cream/50 uppercase gap-1">
                    <span>YOUR RECRUITMENT KEY:</span>
                    <span className="text-blush font-bold">
                      +100 XP / VERIFIED ATTENDEE
                    </span>
                  </div>
                  <p className="text-2xl font-black text-blush tracking-wider">
                    {candidateEnrollment}
                  </p>

                  {/* Shareable Link */}
                  <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`${window.location.origin}/?ref=${candidateEnrollment}`}
                      className="w-full rounded bg-white/10 px-2.5 py-1 text-[0.72rem] text-cream/80 select-all border border-white/10"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="rounded bg-blush px-3 py-1 text-[0.72rem] font-bold text-soil hover:bg-white transition-colors shrink-0 flex items-center gap-1"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      {copied ? "Copied" : "Share"}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[0.7rem] font-mono text-cream/50 pt-1 gap-1">
                  <span>DEDUPLICATION ENABLED</span>
                  <span>BENNETT ENROLLMENT CHECK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
