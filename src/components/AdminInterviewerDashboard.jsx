import React, { useState, useEffect } from 'react';
import { 
  X, 
  Crown, 
  UserCheck, 
  Download, 
  Search, 
  Database, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  Users,
  Award,
  ChevronRight
} from 'lucide-react';
import { getLeaderboard, getAllRegistrations, EVENT_DETAILS, getStoredSupabaseConfig } from '../lib/supabase';
import { formatEnrollment } from '../lib/validation';

export default function AdminInterviewerDashboard({ isOpen, onClose, onOpenSupabaseConfig }) {
  const [candidates, setCandidates] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [search, setSearch] = useState('');
  const [supabaseConfig, setSupabaseConfig] = useState(getStoredSupabaseConfig());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (isAuthenticated) {
        loadData();
      }
    } else {
      setPassword('');
    }
  }, [isOpen, isAuthenticated]);

  const loadData = async () => {
    const c = await getLeaderboard();
    const r = await getAllRegistrations();
    setCandidates(c);
    setRegistrations(r);
    setSupabaseConfig(getStoredSupabaseConfig());
    if (c.length > 0 && !selectedCandidate) {
      setSelectedCandidate(c[0]);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'CSI#HACKACCINO2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect admin password');
    }
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-soil/90 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
        <div 
          className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-cream text-soil shadow-2xl border border-soil/20 p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-soil text-blush shadow-lg mb-5">
            <Crown size={28} />
          </div>
          <h3 className="font-display text-xl font-black uppercase tracking-tight text-soil mb-1">
            Admin Access Required
          </h3>
          <p className="text-xs text-soil/60 font-mono mb-6">
            Enter the senior panel password to view live data.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-soil/20 bg-white px-4 py-2.5 text-sm text-center text-soil focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20"
              autoFocus
            />
            {authError && <p className="text-xs font-bold text-red-500 bg-red-50 p-2 rounded-lg">{authError}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-soil py-3 text-xs font-semibold uppercase tracking-wider text-cream transition-all hover:bg-blush hover:text-soil shadow-md"
            >
              Unlock Dashboard
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full pt-2 text-xs font-mono text-soil/50 hover:text-soil transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredCandidates = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.enrollment.toLowerCase().includes(search.toLowerCase())
  );

  const candidateAttendees = selectedCandidate
    ? registrations.filter(
        (r) => formatEnrollment(r.juniorEnrollment) === formatEnrollment(selectedCandidate.enrollment)
      )
    : [];

  const totalAttendees = registrations.length;

  const exportCSV = () => {
    const headers = [
      'Candidate_Name',
      'Candidate_Enrollment',
      'Candidate_Rank',
      'Student_Name',
      'Student_Enrollment',
      'Student_Email',
      'Student_Phone',
      'Event_Name',
      'Timestamp',
    ];

    const rows = registrations.map((r) => {
      const cand = candidates.find(
        (c) => formatEnrollment(c.enrollment) === formatEnrollment(r.juniorEnrollment)
      );
      return [
        `"${cand?.name || r.juniorName || ''}"`,
        `"${r.juniorEnrollment}"`,
        `"${cand?.rank || ''}"`,
        `"${r.studentName}"`,
        `"${r.studentEnrollment}"`,
        `"${r.studentEmail || ''}"`,
        `"${r.studentPhone || ''}"`,
        `"${r.eventName}"`,
        `"${r.timestamp}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `CSI_BU_HYPE4_Interview_Task_Results_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-soil/90 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div 
        className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-cream text-soil shadow-[0_25px_70px_rgba(0,0,0,0.6)] border border-soil/20 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-soil/15 px-6 sm:px-8 py-5 bg-white/80 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-soil text-blush flex items-center justify-center shadow-md">
              <Crown size={22} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[0.65rem] font-mono text-blush uppercase tracking-widest font-bold">
                  Senior Panel · Internal Evaluation
                </span>
                <span className="rounded-full bg-emerald-100 text-emerald-800 text-[0.65rem] font-mono px-2 py-0.2 font-semibold">
                  LIVE RECRUITMENT MODE
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-soil">
                PR & Management Junior Interview Dashboard
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 rounded-full bg-soil px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cream hover:bg-blush hover:text-soil transition-colors shadow-sm"
              title="Download Excel/CSV report"
            >
              <Download size={14} />
              Export CSV
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-soil/60 hover:bg-soil/10 hover:text-soil transition-colors"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Event Quick Bar */}
        <div className="bg-blush/15 border-b border-blush/30 px-6 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className="font-bold text-soil">Assigned Interview Task:</span>
            <span className="font-mono text-soil/80">Rally students for <strong>{EVENT_DETAILS.title}</strong></span>
            <span className="text-soil/40">•</span>
            <span className="font-mono text-soil/70">{EVENT_DETAILS.date} | {EVENT_DETAILS.venue}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={EVENT_DETAILS.lumaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blush font-bold hover:underline inline-flex items-center gap-1 font-mono"
            >
              Official Luma Page
              <ExternalLink size={12} />
            </a>

            <button
              onClick={onOpenSupabaseConfig}
              className="text-xs font-mono text-soil/70 hover:text-emerald-700 flex items-center gap-1"
            >
              <Database size={12} className={supabaseConfig.url ? "text-emerald-500" : "text-amber-500"} />
              {supabaseConfig.url ? 'Supabase Connected' : 'Connect Supabase'}
            </button>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-white p-4 border border-soil/10 shadow-sm">
              <span className="text-[0.68rem] font-mono text-soil/50 uppercase">TOTAL APPLICANTS</span>
              <p className="font-display text-2xl sm:text-3xl font-bold text-soil mt-1">{candidates.length}</p>
              <span className="text-[0.68rem] text-soil/60 font-sans">PR & Management Juniors</span>
            </div>
            <div className="rounded-2xl bg-white p-4 border border-soil/10 shadow-sm">
              <span className="text-[0.68rem] font-mono text-soil/50 uppercase">TOTAL CONVINCED ATTENDEES</span>
              <p className="font-display text-2xl sm:text-3xl font-bold text-blush mt-1">{totalAttendees}</p>
              <span className="text-[0.68rem] text-soil/60 font-sans">Registered for HYPE 4.0</span>
            </div>
            <div className="rounded-2xl bg-white p-4 border border-soil/10 shadow-sm">
              <span className="text-[0.68rem] font-mono text-soil/50 uppercase">TOP CANDIDATE</span>
              <p className="font-display text-xl sm:text-2xl font-bold text-soil mt-1 truncate">
                {candidates[0]?.name || 'N/A'}
              </p>
              <span className="text-[0.68rem] font-mono text-emerald-600 font-bold">
                {candidates[0]?.referralsCount || 0} Registrations Logged
              </span>
            </div>
            <div className="rounded-2xl bg-white p-4 border border-soil/10 shadow-sm">
              <span className="text-[0.68rem] font-mono text-soil/50 uppercase">AVERAGE CONVERSION</span>
              <p className="font-display text-2xl sm:text-3xl font-bold text-soil mt-1">
                {candidates.length ? (totalAttendees / candidates.length).toFixed(1) : 0}
              </p>
              <span className="text-[0.68rem] text-soil/60 font-sans">Students / Candidate</span>
            </div>
          </div>

          {/* Split View: Candidates List (Left) & Selected Candidate Recruited Students (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Candidates Ranking List */}
            <div className="lg:col-span-5 rounded-2xl bg-white p-5 border border-soil/15 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-soil/10 pb-3">
                <h4 className="font-display text-lg font-bold uppercase text-soil">
                  Junior Applicants
                </h4>
                <div className="relative w-40">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-soil/40" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-soil/20 bg-cream/40 pl-8 pr-2.5 py-1 text-xs text-soil"
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {filteredCandidates.map((c) => {
                  const isSelected = selectedCandidate && formatEnrollment(c.enrollment) === formatEnrollment(selectedCandidate.enrollment);

                  return (
                    <div
                      key={c.enrollment}
                      onClick={() => setSelectedCandidate(c)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all duration-150 flex items-center justify-between ${
                        isSelected
                          ? 'border-blush bg-blush/10 shadow-sm'
                          : 'border-soil/10 bg-cream/30 hover:bg-cream/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono font-bold text-xs w-6 text-center ${
                          c.rank === 1 ? 'text-blush font-black' : 'text-soil/50'
                        }`}>
                          #{c.rank}
                        </span>
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="h-9 w-9 rounded-full object-cover border border-soil/10"
                        />
                        <div>
                          <p className="font-display font-bold uppercase text-soil text-sm leading-tight">
                            {c.name}
                          </p>
                          <p className="font-mono text-[0.7rem] text-blush font-semibold">
                            {c.enrollment}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-bold text-sm text-soil block">
                          {c.referralsCount}
                        </span>
                        <span className="text-[0.62rem] font-mono text-soil/50 uppercase">
                          ATTENDEES
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Detailed Attendee Log for Selected Candidate */}
            <div className="lg:col-span-7 rounded-2xl bg-white p-5 border border-soil/15 shadow-sm space-y-4">
              {selectedCandidate ? (
                <>
                  <div className="flex flex-wrap items-center justify-between border-b border-soil/10 pb-3 gap-2">
                    <div>
                      <span className="text-[0.65rem] font-mono text-blush uppercase font-bold tracking-wider">Candidate Outreach Portfolio</span>
                      <h4 className="font-display text-xl font-bold uppercase text-soil">
                        {selectedCandidate.name} ({selectedCandidate.enrollment})
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-soil text-cream px-3 py-1 text-xs font-mono font-bold">
                        Rank #{selectedCandidate.rank}
                      </span>
                      <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-mono font-bold">
                        {selectedCandidate.referralsCount} Verified Leads
                      </span>
                    </div>
                  </div>

                  {/* List of Attendees Recruited by this Junior */}
                  <div>
                    <h5 className="text-xs font-mono font-bold uppercase text-soil/60 mb-2">
                      Students Recruited for HYPE 4.0:
                    </h5>

                    {candidateAttendees.length > 0 ? (
                      <div className="divide-y divide-soil/10 max-h-[320px] overflow-y-auto border border-soil/10 rounded-xl">
                        {candidateAttendees.map((att, i) => (
                          <div key={i} className="p-3 bg-cream/20 hover:bg-cream/50 transition-colors flex items-center justify-between text-xs">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-soil font-sans">{att.studentName}</span>
                                <span className="font-mono text-blush font-semibold">{att.studentEnrollment}</span>
                              </div>
                              <p className="text-[0.68rem] text-soil/60 font-mono mt-0.5">
                                {att.studentEmail} • {att.studentPhone || 'No Phone'}
                              </p>
                            </div>

                            <div className="text-right">
                              <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[0.62rem] font-mono text-emerald-800 font-bold">
                                <CheckCircle2 size={10} />
                                Verified Lead
                              </span>
                              <span className="block text-[0.62rem] text-soil/40 font-mono mt-0.5">
                                {new Date(att.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl bg-cream/40 p-6 text-center text-xs font-mono text-soil/50 border border-dashed border-soil/20">
                        No attendees logged by this candidate yet.
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-xs text-soil/50 font-mono">
                  Select a candidate from the left to inspect their convinced attendees.
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
