import React, { useState, useEffect } from "react";
import {
  Trophy,
  Crown,
  Search,
  Flame,
  UserCheck,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Database,
  ShieldAlert,
  Sliders,
} from "lucide-react";
import { toast } from "sonner";
import {
  getLeaderboard,
  getRecentActivities,
  EVENT_DETAILS,
} from "../lib/supabase";
import { formatEnrollment } from "../lib/validation";

export default function LeaderboardSection({
  onOpenRegister,
  onOpenAdminDashboard,
  onOpenSupabaseModal,
}) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickLookup, setQuickLookup] = useState("S24CSEU1214");
  const [lookupResult, setLookupResult] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getLeaderboard();
      setLeaderboard(data);
      setRecentActivities(await getRecentActivities());

      if (quickLookup) {
        const found = data.find(
          (j) =>
            formatEnrollment(j.enrollment) === formatEnrollment(quickLookup),
        );
        setLookupResult(found || null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLookupSubmit = (e) => {
    e.preventDefault();
    if (!quickLookup) return;
    const norm = formatEnrollment(quickLookup);
    const found = leaderboard.find(
      (j) => formatEnrollment(j.enrollment) === norm,
    );
    setLookupResult(found || { notFound: true, enrollment: norm });
  };

  const copyPersonalRefLink = (enrollment) => {
    const url = `${window.location.origin}/?ref=${formatEnrollment(enrollment)}`;
    navigator.clipboard.writeText(url);
    toast.success("Recruitment Link Copied!");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredLeaderboard = leaderboard.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.enrollment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.role &&
        item.role.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const top3 = leaderboard.slice(0, 3);
  const rank1 = top3[0];
  const rank2 = top3[1];
  const rank3 = top3[2];

  return (
    <section
      id="leaderboard"
      className="cv-auto bg-cream text-soil py-24 sm:py-32 border-y border-soil/10 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-blush/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-radial from-accent-blue/10 to-transparent pointer-events-none" />

      <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 relative z-10">
        {/* Header Title & Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-soil px-3 py-1 text-[0.68rem] font-mono uppercase tracking-widest text-cream">
                <Crown size={12} className="text-blush" />
                Junior Recruitment Task Standings
              </span>
              <button
                onClick={onOpenAdminDashboard}
                className="inline-flex items-center gap-1.5 rounded-full bg-blush/20 text-soil border border-blush/40 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-widest font-bold hover:bg-blush transition-colors"
                title="Open Senior Interview Panel View"
              >
                <Sliders size={12} />
                Interviewer Panel View
              </button>
            </div>

            <h2 className="font-display text-[clamp(2.4rem,6vw,4.8rem)] font-bold uppercase leading-[1.1] tracking-[0.02em] text-soil mt-2">
              PR & Management
              <span className="block text-blush">Interview Leaderboard</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-soil/70 mt-2 max-w-[50ch]">
              Rankings of junior candidates based on verified student
              registrations brought for <strong>HYPE 4.0</strong> on Luma.
            </p>
          </div>
        </div>

        {/* Live Recent Activity Ticker */}
        {recentActivities.length > 0 && (
          <div className="mb-10 rounded-2xl bg-white p-3.5 border border-soil/10 shadow-sm flex items-center gap-3 overflow-hidden">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blush/20 text-blush text-[0.68rem] font-mono font-bold uppercase shrink-0">
              <Flame size={13} className="animate-pulse" />
              LIVE TICKER
            </div>
            <div className="overflow-x-auto whitespace-nowrap text-xs text-soil/80 font-sans flex items-center gap-6">
              {recentActivities.slice(0, 4).map((act, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 font-mono"
                >
                  <span className="font-bold text-soil">
                    {act.juniorName || act.juniorEnrollment}
                  </span>
                  <span className="text-soil/40">convinced</span>
                  <span className="text-blush font-semibold">
                    {act.studentName}
                  </span>
                  <span className="text-[0.68rem] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                    +100 XP
                  </span>
                  <span className="text-soil/20">•</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* TOP 3 PODIUM */}
        {top3.length >= 3 && (
          <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Rank 2 (Silver) */}
            <div className="order-2 md:order-1 rounded-3xl bg-white p-6 border-2 border-soil/10 shadow-md text-center flex flex-col items-center relative transition-transform hover:-translate-y-1">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#315b8c] text-white px-3 py-0.5 text-xs font-mono font-bold uppercase shadow-sm">
                RANK #2 · SILVER
              </div>
              <div className="mt-2 relative">
                <img
                  src={rank2.avatar}
                  alt={rank2.name}
                  className="h-20 w-20 rounded-full object-cover border-4 border-[#315b8c]"
                />
                <span className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-[#315b8c] text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase mt-3 text-soil">
                {rank2.name}
              </h3>
              <p className="font-mono text-xs text-soil/60 mt-0.5">
                {rank2.enrollment}
              </p>
              <div className="mt-4 w-full rounded-2xl bg-cream py-3 px-4 border border-soil/5 flex justify-between items-center text-xs font-mono">
                <span className="text-soil/60">CONVINCED:</span>
                <span className="font-bold text-base text-soil">
                  {rank2.referralsCount} Students
                </span>
              </div>
              <div className="mt-2 text-xs font-mono font-semibold text-[#315b8c]">
                {rank2.score} TOTAL XP
              </div>
            </div>

            {/* Rank 1 (Gold - Center & Tallest) */}
            <div className="order-1 md:order-2 rounded-3xl bg-soil text-cream p-7 border-2 border-blush shadow-2xl text-center flex flex-col items-center relative transition-transform hover:-translate-y-2 md:-mt-6">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blush text-soil px-4 py-1 text-xs font-mono font-black uppercase shadow-lg flex items-center gap-1.5">
                <Crown size={14} />
                RANK #1 · TOP INTERVIEW PICK
              </div>
              <div className="mt-3 relative">
                <img
                  src={rank1.avatar}
                  alt={rank1.name}
                  className="h-24 w-24 rounded-full object-cover border-4 border-blush shadow-[0_0_20px_rgba(242,118,94,0.4)]"
                />
                <span className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-blush text-soil font-black text-sm flex items-center justify-center shadow-md">
                  1
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase mt-4 text-cream">
                {rank1.name}
              </h3>
              <p className="font-mono text-xs text-blush mt-0.5 font-bold tracking-wider">
                {rank1.enrollment}
              </p>
              <div className="mt-4 w-full rounded-2xl bg-white/10 py-3.5 px-4 border border-white/10 flex justify-between items-center text-xs font-mono">
                <span className="text-cream/60">CONVINCED:</span>
                <span className="font-bold text-lg text-cream">
                  {rank1.referralsCount} Students
                </span>
              </div>
              <div className="mt-2 text-xs font-mono font-bold text-blush tracking-wider">
                {rank1.score} TOTAL XP · {rank1.badge}
              </div>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className="order-3 rounded-3xl bg-white p-6 border-2 border-soil/10 shadow-md text-center flex flex-col items-center relative transition-transform hover:-translate-y-1">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#d97706] text-white px-3 py-0.5 text-xs font-mono font-bold uppercase shadow-sm">
                RANK #3 · BRONZE
              </div>
              <div className="mt-2 relative">
                <img
                  src={rank3.avatar}
                  alt={rank3.name}
                  className="h-20 w-20 rounded-full object-cover border-4 border-[#d97706]"
                />
                <span className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-[#d97706] text-white font-bold text-xs flex items-center justify-center">
                  3
                </span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase mt-3 text-soil">
                {rank3.name}
              </h3>
              <p className="font-mono text-xs text-soil/60 mt-0.5">
                {rank3.enrollment}
              </p>
              <div className="mt-4 w-full rounded-2xl bg-cream py-3 px-4 border border-soil/5 flex justify-between items-center text-xs font-mono">
                <span className="text-soil/60">CONVINCED:</span>
                <span className="font-bold text-base text-soil">
                  {rank3.referralsCount} Students
                </span>
              </div>
              <div className="mt-2 text-xs font-mono font-semibold text-[#d97706]">
                {rank3.score} TOTAL XP
              </div>
            </div>
          </div>
        )}

        {/* CANDIDATE PERSONAL SCORECARD & REFERRAL LINK BOX */}
        <div className="mb-14 rounded-3xl bg-white p-6 sm:p-8 border border-soil/15 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Search My Rank Form */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-xs font-mono text-blush uppercase font-bold tracking-wider">
                  Candidate Recruitment Hub
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-soil mt-1">
                  Inspect Your Task Progress
                </h3>
                <p className="text-xs sm:text-sm text-soil/70 font-sans mt-1">
                  Enter your Bennett University enrollment number (e.g.{" "}
                  <code>S24CSEU1214</code>) to check your verified student
                  count, current interview standing, and personal share link for
                  HYPE 4.0.
                </p>
              </div>

              <form onSubmit={handleLookupSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. S24CSEU1214"
                  value={quickLookup}
                  onChange={(e) => setQuickLookup(e.target.value.toUpperCase())}
                  className="flex-1 rounded-xl border border-soil/20 bg-cream/50 px-4 py-2.5 text-sm font-mono tracking-wider text-soil font-bold focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-soil px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream hover:bg-blush hover:text-soil transition-colors shadow-sm shrink-0"
                >
                  Inspect
                </button>
              </form>
            </div>

            {/* Right: Results Card */}
            <div className="lg:col-span-6">
              {lookupResult && !lookupResult.notFound ? (
                <div className="rounded-2xl bg-soil text-cream p-5 border border-blush/40 shadow-md space-y-3 font-mono">
                  <div className="flex justify-between items-center border-b border-cream/15 pb-2">
                    <span className="text-xs text-blush font-bold">
                      CANDIDATE INTERVIEW PROFILE
                    </span>
                    <span className="rounded-full bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[0.65rem] font-bold">
                      RANK #{lookupResult.rank}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display text-lg font-bold text-cream uppercase">
                        {lookupResult.name}
                      </p>
                      <p className="text-xs text-cream/60">
                        {lookupResult.enrollment}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-blush">
                        {lookupResult.referralsCount}
                      </p>
                      <p className="text-[0.65rem] text-cream/50 uppercase">
                        ATTENDEES LOGGED
                      </p>
                    </div>
                  </div>

                  {/* 1-Click Copy Personal Recruitment Link */}
                  <div className="pt-2 border-t border-cream/10">
                    <span className="text-[0.68rem] text-cream/50 uppercase block mb-1">
                      Your Direct Recruitment Share Link:
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={`${window.location.origin}/?ref=${lookupResult.enrollment}`}
                        className="flex-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs text-cream/90 font-mono select-all border border-white/10"
                      />
                      <button
                        onClick={() =>
                          copyPersonalRefLink(lookupResult.enrollment)
                        }
                        className="rounded-lg bg-blush px-3 py-1.5 text-xs font-bold text-soil hover:bg-white transition-colors shrink-0 flex items-center gap-1"
                      >
                        {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                        {copiedLink ? "Copied!" : "Copy Link"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : lookupResult && lookupResult.notFound ? (
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 text-amber-900 text-xs sm:text-sm">
                  <p className="font-bold">
                    Enrollment {lookupResult.enrollment} has not logged any
                    attendees yet.
                  </p>
                  <p className="mt-1 text-amber-700">
                    Convince a student to attend HYPE 4.0 and log them below to
                    enter the rankings!
                  </p>
                  <button
                    onClick={onOpenRegister}
                    className="mt-3 rounded-full bg-soil px-4 py-2 text-xs font-semibold uppercase text-cream hover:bg-blush hover:text-soil transition-colors"
                  >
                    Verify First Attendee
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* FULL LEADERBOARD TABLE */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-soil/15 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 border-b border-soil/10 pb-5">
            <div>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-soil">
                Junior Candidate Rankings
              </h3>
              <p className="text-xs text-soil/60 font-mono">
                Official PR & Management Recruitment Round Evaluation
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-soil/40"
              />
              <input
                type="text"
                placeholder="Search candidate or enrollment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-soil/20 bg-cream/40 pl-10 pr-4 py-2 text-xs text-soil placeholder:text-soil/40 focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-soil/10 text-[0.72rem] font-mono uppercase tracking-wider text-soil/50">
                  <th className="py-3 px-3">Rank</th>
                  <th className="py-3 px-3">Junior Candidate</th>
                  <th className="py-3 px-3">Recruitment Key</th>
                  <th className="py-3 px-3 text-center">Verified Attendees</th>
                  <th className="py-3 px-3">Selection Status</th>
                  <th className="py-3 px-3 text-right">Total XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soil/5 text-sm">
                {loading && leaderboard.length === 0
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <tr
                        key={i}
                        className="animate-pulse bg-white/50 border-b border-soil/5"
                      >
                        <td className="py-4 px-3">
                          <div className="h-4 w-6 bg-soil/10 rounded"></div>
                        </td>
                        <td className="py-4 px-3 flex items-center gap-3">
                          <div className="h-8 w-8 bg-soil/10 rounded-full"></div>
                          <div className="h-4 w-24 bg-soil/10 rounded"></div>
                        </td>
                        <td className="py-4 px-3">
                          <div className="h-4 w-28 bg-soil/10 rounded"></div>
                        </td>
                        <td className="py-4 px-3">
                          <div className="mx-auto h-4 w-6 bg-soil/10 rounded"></div>
                        </td>
                        <td className="py-4 px-3">
                          <div className="h-5 w-20 bg-soil/10 rounded-full"></div>
                        </td>
                        <td className="py-4 px-3">
                          <div className="ml-auto h-4 w-12 bg-soil/10 rounded"></div>
                        </td>
                      </tr>
                    ))
                  : filteredLeaderboard.map((junior) => {
                      const isCurrentLookup =
                        quickLookup &&
                        formatEnrollment(junior.enrollment) ===
                          formatEnrollment(quickLookup);

                      return (
                        <tr
                          key={junior.enrollment}
                          className={`transition-colors duration-150 ${
                            isCurrentLookup
                              ? "bg-blush/15 font-semibold"
                              : "hover:bg-cream/60"
                          }`}
                        >
                          <td className="py-3.5 px-3 font-mono font-bold">
                            {junior.rank === 1 ? (
                              <span className="inline-flex items-center gap-1 text-blush font-black">
                                <Crown size={14} /> #1
                              </span>
                            ) : junior.rank === 2 ? (
                              <span className="text-[#315b8c] font-black">
                                #2
                              </span>
                            ) : junior.rank === 3 ? (
                              <span className="text-[#d97706] font-black">
                                #3
                              </span>
                            ) : (
                              <span className="text-soil/50">
                                #{junior.rank}
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={junior.avatar}
                                alt={junior.name}
                                className="h-8 w-8 rounded-full object-cover border border-soil/10"
                              />
                              <div>
                                <p className="font-display font-bold uppercase text-soil text-sm leading-tight">
                                  {junior.name}
                                </p>
                                <span className="text-[0.65rem] font-mono text-soil/50">
                                  {junior.badge}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-3 font-mono text-xs font-bold text-blush">
                            {junior.enrollment}
                          </td>

                          <td className="py-3.5 px-3 text-center font-mono">
                            <span className="inline-block rounded-full bg-soil/5 px-3 py-1 font-bold text-soil">
                              {junior.referralsCount}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 font-mono text-xs">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[0.68rem] font-semibold ${
                                junior.status === "Top Pick"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : junior.status === "Shortlisted"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-cream text-soil/70"
                              }`}
                            >
                              {junior.status || "In Review"}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-right font-mono font-bold text-blush">
                            {junior.score} XP
                          </td>
                        </tr>
                      );
                    })}

                {!loading && filteredLeaderboard.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-xs text-soil/50 font-mono"
                    >
                      No candidates match "{searchQuery}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
