import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  UserCheck,
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
  Laptop,
} from "lucide-react";
import { validateBennettEnrollment, formatEnrollment } from "../lib/validation";
import { submitRegistration, EVENT_DETAILS } from "../lib/supabase";

export default function PRRegisterModal({
  isOpen,
  onClose,
  defaultJuniorEnrollment = "",
  onRegistrationSuccess,
}) {
  const [juniorName, setJuniorName] = useState("");
  const [juniorEnrollment, setJuniorEnrollment] = useState(
    defaultJuniorEnrollment || "S24CSEU1214",
  );

  // Attendee state
  const [studentName, setStudentName] = useState("");
  const [studentEnrollment, setStudentEnrollment] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [lumaConfirmed, setLumaConfirmed] = useState(true);

  // Validation feedback
  const [juniorVal, setJuniorVal] = useState({ isValid: true, message: "" });
  const [studentVal, setStudentVal] = useState({ isValid: false, message: "" });

  // Submission state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [copiedKey, setCopiedKey] = useState(false);

  useEffect(() => {
    try {
      const savedJunior = localStorage.getItem("csi_bu_active_junior");
      if (savedJunior) {
        const parsed = JSON.parse(savedJunior);
        if (parsed.enrollment) setJuniorEnrollment(parsed.enrollment);
        if (parsed.name) setJuniorName(parsed.name);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (defaultJuniorEnrollment) {
      setJuniorEnrollment(formatEnrollment(defaultJuniorEnrollment));
    }
  }, [defaultJuniorEnrollment]);

  useEffect(() => {
    if (juniorEnrollment) {
      setJuniorVal(validateBennettEnrollment(juniorEnrollment));
    }
  }, [juniorEnrollment]);

  useEffect(() => {
    if (studentEnrollment) {
      setStudentVal(validateBennettEnrollment(studentEnrollment));
    } else {
      setStudentVal({ isValid: false, message: "" });
    }
  }, [studentEnrollment]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const valJ = validateBennettEnrollment(juniorEnrollment);
    if (!valJ.isValid) {
      setErrorMsg(`Junior Candidate error: ${valJ.message}`);
      return;
    }

    const valS = validateBennettEnrollment(studentEnrollment);
    if (!valS.isValid) {
      setErrorMsg(`Attendee student error: ${valS.message}`);
      return;
    }

    if (valJ.normalized === valS.normalized) {
      setErrorMsg(
        "Self-referral is forbidden! You cannot log yourself as the convinced attendee.",
      );
      return;
    }

    setLoading(true);

    try {
      const res = await submitRegistration({
        juniorName: juniorName.trim() || `PR Candidate (${valJ.normalized})`,
        juniorEnrollment: valJ.normalized,
        studentName: studentName.trim(),
        studentEnrollment: valS.normalized,
        studentEmail:
          studentEmail.trim() ||
          `${valS.normalized.toLowerCase()}@bennett.edu.in`,
        studentPhone: studentPhone.trim(),
        eventName: EVENT_DETAILS.title,
        lumaConfirmation: lumaConfirmed,
      });

      if (!res.success) {
        setErrorMsg(res.error || "Failed to submit registration.");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "csi_bu_active_junior",
        JSON.stringify({
          enrollment: valJ.normalized,
          name: juniorName.trim(),
        }),
      );

      try {
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.6 },
          colors: ["#f2765e", "#315b8c", "#e8c9a8", "#ffffff", "#22c55e"],
        });
      } catch (err) {}

      setSuccessData(res);
      if (onRegistrationSuccess) onRegistrationSuccess(res);
    } catch (err) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterAnother = () => {
    setStudentName("");
    setStudentEnrollment("");
    setStudentEmail("");
    setStudentPhone("");
    setSuccessData(null);
    setErrorMsg("");
  };

  const copyReferralKey = () => {
    navigator.clipboard.writeText(formatEnrollment(juniorEnrollment));
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-soil/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-cream text-soil shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-soil/15 max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-soil/10 px-6 sm:px-8 py-5 bg-white/70">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-blush p-2 flex items-center justify-center text-soil shadow-sm">
              <Sparkles size={22} className="text-soil" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[0.68rem] font-mono text-blush uppercase tracking-wider font-bold">
                  PR & Management Interview Task
                </span>
                <span className="text-[0.65rem] rounded-full bg-soil px-2 py-0.2 text-cream font-mono">
                  +100 XP / VERIFIED ATTENDEE
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-soil">
                Verify Student For HYPE 4.0
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-soil/60 hover:bg-soil/10 hover:text-soil transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Event Quick Info Banner */}
        <div className="bg-blush/10 border-b border-blush/20 px-6 sm:px-8 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4 text-xs font-sans">
          <div className="flex items-center gap-2 w-full truncate">
            <span className="font-bold text-soil shrink-0">Event:</span>
            <span className="font-mono text-soil/80 truncate">
              HYPE 4.0 (28 Sept | PLH 101, Bennett Univ)
            </span>
          </div>
          <a
            href={EVENT_DETAILS.lumaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blush font-bold hover:underline shrink-0 flex items-center gap-1 font-mono text-[0.72rem]"
          >
            Luma Link
            <ExternalLink size={11} />
          </a>
        </div>

        {/* Modal Form */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {!successData ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="flex items-start gap-2.5 rounded-xl bg-red-50 p-4 border border-red-200 text-red-700 text-xs sm:text-sm animate-[fadeIn_0.2s_ease-out]">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p>{errorMsg}</p>
                </div>
              )}

              {/* SECTION 1: JUNIOR INTERVIEWEE (AMBASSADOR) */}
              <div className="rounded-2xl bg-white p-5 border border-soil/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-soil/10 pb-2">
                  <span className="text-xs font-mono font-bold uppercase text-soil/80 flex items-center gap-1.5">
                    <UserCheck size={14} className="text-blush" />
                    1. Your Information (PR Candidate)
                  </span>
                  <button
                    type="button"
                    onClick={copyReferralKey}
                    className="text-[0.7rem] font-mono text-soil/60 hover:text-blush flex items-center gap-1 transition-colors"
                  >
                    {copiedKey ? (
                      <Check size={12} className="text-emerald-500" />
                    ) : (
                      <Copy size={12} />
                    )}
                    {copiedKey ? "Copied Key!" : "Copy Recruitment Key"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.72rem] font-semibold uppercase tracking-wider text-soil/70 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditya Kushwaha"
                      value={juniorName}
                      onChange={(e) => setJuniorName(e.target.value)}
                      className="w-full rounded-xl border border-soil/20 bg-cream/50 px-3.5 py-2 text-sm text-soil focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.72rem] font-semibold uppercase tracking-wider text-soil/70 mb-1">
                      Your Recruitment Key (Bennett Enrollment No.) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S24CSEU1214"
                      value={juniorEnrollment}
                      onChange={(e) =>
                        setJuniorEnrollment(e.target.value.toUpperCase())
                      }
                      className="w-full rounded-xl border border-soil/20 bg-cream/50 px-3.5 py-2 text-sm font-mono tracking-wider font-bold text-soil focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20"
                    />
                    <div className="mt-1 flex items-center justify-between text-[0.65rem] font-mono">
                      <span
                        className={
                          juniorVal.isValid
                            ? "text-emerald-600 font-semibold"
                            : "text-amber-600"
                        }
                      >
                        {juniorVal.message || "Example: S24CSEU1214"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: ATTENDEE (CONVINCED CANDIDATE) */}
              <div className="rounded-2xl bg-white p-5 border border-soil/10 shadow-sm space-y-4">
                <div className="border-b border-soil/10 pb-2 flex justify-between items-center">
                  <span className="text-xs font-mono font-bold uppercase text-soil/80 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-accent-blue" />
                    2. Recruited Student (Attendee for HYPE 4.0)
                  </span>
                  <span className="text-[0.68rem] text-soil/50 font-mono">
                    DEDUPLICATION ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.72rem] font-semibold uppercase tracking-wider text-soil/70 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Singh"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full rounded-xl border border-soil/20 bg-cream/50 px-3.5 py-2 text-sm text-soil focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.72rem] font-semibold uppercase tracking-wider text-soil/70 mb-1">
                      Student Bennett Enrollment No. *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S24CSEU0845"
                      value={studentEnrollment}
                      onChange={(e) =>
                        setStudentEnrollment(e.target.value.toUpperCase())
                      }
                      className={`w-full rounded-xl border px-3.5 py-2 text-sm font-mono tracking-wider focus:outline-none focus:ring-2 transition-all ${
                        studentVal.isValid
                          ? "border-emerald-500 bg-emerald-50/50 text-emerald-900 font-bold"
                          : "border-soil/20 bg-cream/50 focus:border-blush focus:ring-blush/20"
                      }`}
                    />
                    <div className="mt-1 flex items-center justify-between text-[0.65rem] font-mono">
                      <span
                        className={
                          studentVal.isValid
                            ? "text-emerald-600 font-semibold"
                            : "text-soil/50"
                        }
                      >
                        {studentVal.message ||
                          "Must be a valid Bennett University enrollment"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.72rem] font-semibold uppercase tracking-wider text-soil/70 mb-1">
                      Bennett Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@bennett.edu.in"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full rounded-xl border border-soil/20 bg-cream/50 px-3.5 py-2 text-sm text-soil focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.72rem] font-semibold uppercase tracking-wider text-soil/70 mb-1">
                      WhatsApp / Phone No. (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      className="w-full rounded-xl border border-soil/20 bg-cream/50 px-3.5 py-2 text-sm text-soil focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="lumaCheck"
                    checked={lumaConfirmed}
                    onChange={(e) => setLumaConfirmed(e.target.checked)}
                    className="h-4 w-4 rounded border-soil/30 text-blush focus:ring-blush"
                  />
                  <label
                    htmlFor="lumaCheck"
                    className="text-xs text-soil/80 font-sans cursor-pointer"
                  >
                    Recruited student confirmed they will attend{" "}
                    <strong>HYPE 4.0</strong> on 28th Sept with their laptop.
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-soil py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-cream transition-all duration-200 hover:bg-blush hover:text-soil active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-cream border-t-transparent rounded-full animate-spin"></span>
                    Validating & Verifying Attendee...
                  </span>
                ) : (
                  <>
                    Confirm Registration (+100 XP for{" "}
                    {juniorEnrollment || "You"})
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* SUCCESS VIEW */
            <div className="py-6 text-center space-y-6 animate-[scaleIn_0.25s_ease-out]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-md">
                <CheckCircle2 size={38} />
              </div>

              <div>
                <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-mono font-bold text-emerald-800 uppercase mb-2">
                  +100 XP AWARDED TO {successData.registration.juniorEnrollment}
                </span>
                <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-soil">
                  Registration Successfully Verified!
                </h4>
                <p className="mt-1 text-sm text-soil/75 max-w-md mx-auto font-sans">
                  <strong>{successData.registration.studentName}</strong> (
                  {successData.registration.studentEnrollment}) has been
                  officially registered under your candidate key for{" "}
                  <strong>HYPE 4.0</strong>!
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="mx-auto max-w-md rounded-2xl bg-white p-5 text-left border border-soil/15 shadow-md font-mono space-y-2.5 relative overflow-hidden">
                <div className="flex justify-between items-center border-b border-soil/10 pb-2 text-[0.72rem] text-soil/60">
                  <span>HYPE 4.0 · OFFICIAL PASS</span>
                  <span className="text-emerald-600 font-bold">VERIFIED</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-soil/60">STUDENT:</span>
                  <span className="font-bold text-soil">
                    {successData.registration.studentName}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-soil/60">ENROLLMENT:</span>
                  <span className="font-bold text-soil">
                    {successData.registration.studentEnrollment}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-soil/60">RECRUITED BY CANDIDATE:</span>
                  <span className="text-blush font-bold">
                    {successData.registration.juniorEnrollment}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-soil/60">EVENT DATE:</span>
                  <span className="text-soil/80 font-bold">
                    28 Sept 2026 | PLH 101
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                <button
                  onClick={handleRegisterAnother}
                  className="rounded-full bg-soil px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream hover:bg-blush hover:text-soil transition-colors shadow-sm"
                >
                  Verify Another Attendee (+100 XP)
                </button>
                <button
                  onClick={onClose}
                  className="rounded-full border border-soil/30 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-soil hover:bg-soil hover:text-cream transition-colors"
                >
                  View Leaderboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
