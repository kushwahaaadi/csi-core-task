import React, { useState, useEffect } from "react";
import InteractiveSphere from "./components/InteractiveSphere";
import GalleryModal from "./components/GalleryModal";
import PRRegisterModal from "./components/PRRegisterModal";
import LeaderboardSection from "./components/LeaderboardSection";
import HypeEventBanner from "./components/HypeEventBanner";
import PRHero from "./components/PRHero";
import SupabaseConfigModal from "./components/SupabaseConfigModal";
import AdminInterviewerDashboard from "./components/AdminInterviewerDashboard";
import { Toaster, toast } from "sonner";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Sparkles,
  Crown,
  UserPlus,
  Sliders,
  GitBranch,
} from "lucide-react";
import { formatEnrollment } from "./lib/validation";
import { EVENT_DETAILS } from "./lib/supabase";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [prRegisterModalOpen, setPrRegisterModalOpen] = useState(false);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Default active candidate referral key (defaults to user's S24CSEU1214)
  const [activeJuniorEnrollment, setActiveJuniorEnrollment] =
    useState("S24CSEU1214");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get("ref");
    if (refCode) {
      const formatted = formatEnrollment(refCode);
      setActiveJuniorEnrollment(formatted);
      setPrRegisterModalOpen(true);
    }
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="exported-root font-sans selection:bg-blush selection:text-soil">
      <Toaster
        position="bottom-right"
        toastOptions={{ className: "font-mono text-xs uppercase" }}
      />
      <div hidden></div>
      <main className="bg-cream text-soil">
        {/* ===================== HEADER ===================== */}
        <header className="fixed inset-x-0 top-0 z-40 bg-soil/85 backdrop-blur-xl border-b border-white/5">
          <div className="mx-auto flex items-center justify-between transition-[padding,max-width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-full max-w-[1100px] px-5 sm:px-6 h-[64px] text-cream">
            <div className="flex min-w-0 items-center">
              {/* Logo */}
              <a
                className="relative z-50 flex shrink-0 items-center gap-2.5 group"
                href="#top"
                aria-label="CSI Bennett University Home"
              >
                <div className="relative flex items-center justify-center h-9 w-9 rounded-full bg-soil border border-blush/60 p-1 shadow-md transition-transform duration-300 group-hover:scale-105">
                  <img
                    alt="CSI Bennett Logo"
                    className="h-full w-full object-contain"
                    src="/csi-logo.png"
                  />
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 border border-soil"></span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-sm sm:text-base tracking-wider text-cream uppercase leading-none">
                    CSI Bennett
                  </span>
                  <span className="font-mono text-[0.62rem] text-blush tracking-widest uppercase leading-tight mt-0.5">
                    PR & Interview Task
                  </span>
                </div>
              </a>

              {/* Desktop Nav */}
              <nav
                className="hidden absolute inset-x-4 top-[4.25rem] flex-col gap-4 rounded-2xl bg-white px-5 py-6 text-soil shadow-[0_12px_40px_rgba(65,51,51,0.12)] md:static md:ml-7 md:flex md:flex-row md:items-center md:gap-6 md:bg-transparent md:p-0 md:shadow-none md:text-inherit"
                aria-label="Main navigation"
              >
                <a
                  href="#leaderboard"
                  className="text-[0.85rem] font-semibold transition-colors duration-200 text-cream/90 hover:text-cream flex items-center gap-1"
                >
                  <Crown size={13} className="text-blush" />
                  Campus Leaderboard
                </a>
                <a
                  href="#about"
                  className="text-[0.85rem] font-medium transition-colors duration-200 text-cream/80 hover:text-cream"
                >
                  The Chapter
                </a>
              </nav>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative z-50 ml-3 shrink-0 border-0 p-2 md:hidden bg-soil/70 rounded-full text-cream backdrop-blur-md"
                aria-label="Toggle navigation"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Right Desktop CTA Buttons */}
            <div className="relative z-50 flex shrink-0 items-center gap-2">
              <button
                onClick={() => setAdminDashboardOpen(true)}
                className="hidden lg:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] font-mono uppercase bg-white/10 text-cream/90 hover:bg-blush hover:text-soil transition-all border border-white/10"
                title="Open Interviewer Panel"
              >
                <Sliders size={12} />
                Panel Dashboard
              </button>

              <button
                onClick={() => setPrRegisterModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-[0.65rem] sm:text-[0.82rem] font-bold uppercase tracking-wider transition-all duration-200 bg-blush text-soil hover:bg-white hover:shadow-lg active:scale-[0.98] whitespace-nowrap"
              >
                <UserPlus size={15} />
                <span className="hidden sm:inline">Verify Attendee</span>
                <span className="inline sm:hidden">Verify</span>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mx-4 mt-2 rounded-2xl bg-soil/95 backdrop-blur-xl border border-white/10 p-5 text-cream shadow-2xl animate-[fadeIn_0.2s_ease-out]">
              <div className="flex flex-col space-y-3 font-display uppercase tracking-wide text-sm">
                <a
                  href="#leaderboard"
                  onClick={handleNavClick}
                  className="p-2 text-cream font-bold hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Crown size={16} className="text-blush" />
                  Interview Leaderboard
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setPrRegisterModalOpen(true);
                  }}
                  className="p-2 text-left bg-blush/20 text-blush font-bold hover:bg-blush/30 rounded-lg transition-colors flex items-center gap-2"
                >
                  <UserPlus size={16} />
                  Verify Attendee (+100 XP)
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAdminDashboardOpen(true);
                  }}
                  className="p-2 text-left text-xs font-mono text-cream hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Sliders size={14} />
                  Senior Interviewer Panel
                </button>
              </div>
            </div>
          )}
        </header>

        {/* ===================== HERO SECTION ===================== */}
        <section
          id="top"
          className="relative isolate flex min-h-[100svh] items-start justify-center overflow-hidden bg-black text-cream"
        >
          {/* CSS Grid Matrix Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Base dark background */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />

            {/* Grid lines */}
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(242,118,94,0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(242,118,94,0.4) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />

            {/* Finer sub-grid */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(242,118,94,0.6) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(242,118,94,0.6) 1px, transparent 1px)
                `,
                backgroundSize: "15px 15px",
              }}
            />

            {/* Animated coral glow pulse — center */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(242,118,94,0.18)_0%,transparent_55%)] animate-[gridPulse_4s_ease-in-out_infinite]" />

            {/* Secondary glow — top left */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(242,118,94,0.12)_0%,transparent_45%)] animate-[gridPulse_6s_ease-in-out_infinite_1s]" />

            {/* Vignette edges */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0a0a0a_100%)]" />
          </div>

          {/* Hero Typography & CTA */}
          <div className="relative z-10 mx-auto mt-[22vh] sm:mt-[25vh] flex w-full max-w-[1280px] flex-col items-center px-5 text-center">
            {/* PR & Management Interview Task Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cream/15 bg-white/5 backdrop-blur-md px-4 py-1.5 text-[0.75rem] font-mono tracking-widest uppercase text-cream/90 shadow-sm animate-[fadeIn_0.6s_ease-out]">
              <span className="h-2 w-2 rounded-full bg-blush animate-ping"></span>
              CSI BENNETT — PR & MANAGEMENT RECRUITMENT 2026
            </div>

            <h1 className="font-display text-[clamp(1.8rem,9vw,7rem)] font-bold uppercase leading-[1.1] tracking-[0.02em] text-cream">
              <span className="block overflow-hidden">
                <span className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <span className="whitespace-normal sm:whitespace-nowrap">Not your average</span>
                </span>
              </span>
              <span className="block overflow-hidden mt-1 sm:mt-2">
                <span className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <span className="whitespace-normal sm:whitespace-nowrap text-cream">
                    interview task
                  </span>
                </span>
              </span>
            </h1>

            <div className="transition-[opacity,transform] duration-500 delay-150">
              <p className="mt-6 max-w-[46ch] text-[0.95rem] sm:text-[1.05rem] font-normal leading-[1.6] text-cream/80 font-sans">
                Convince Bennett students to attend <strong>HYPE 4.0</strong>,
                verify their registration, and earn your place in the CSI
                Bennett University Core Team.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row font-medium max-w-[100vw] overflow-hidden px-4">
              <button
                onClick={() => setPrRegisterModalOpen(true)}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blush px-7 py-3 text-[0.86rem] font-bold uppercase tracking-wider text-soil transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white hover:scale-105 active:scale-[0.98] shadow-xl"
              >
                <Sparkles size={16} />
                Verify Attendee (+100 XP)
              </button>

              <a
                href="#hype4"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 text-[0.86rem] font-semibold uppercase tracking-wider text-soil transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white active:scale-[0.98]"
              >
                <GitBranch size={16} className="text-blush" />
                Inspect HYPE 4.0 Event
              </a>
            </div>

            {/* Candidate Key Card */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 rounded-xl bg-white/10 backdrop-blur-md px-4 py-3 sm:py-2 text-xs font-mono border border-white/10 text-cream/90 max-w-full text-center">
              <span className="text-cream/50 uppercase">
                YOUR RECRUITMENT KEY:
              </span>
              <span className="font-bold text-blush tracking-wider break-all">
                {activeJuniorEnrollment}
              </span>
              <span className="text-cream/30 hidden sm:inline">|</span>
              <button
                onClick={() => {
                  const url = `${window.location.origin}/?ref=${activeJuniorEnrollment}`;
                  navigator.clipboard.writeText(url);
                  toast.success("Recruitment link copied to clipboard!");
                }}
                className="text-xs text-cream hover:text-blush underline ml-1"
              >
                Copy My Recruitment Link
              </button>
            </div>
          </div>
        </section>

        {/* ===================== TICKER MARQUEE ===================== */}
        <section
          className="overflow-hidden border-y border-soil/10 bg-cream py-6 sm:py-7 select-none"
          aria-label="Community disciplines"
        >
          <div className="nt-marquee-track flex gap-10 px-6 font-display text-[1.1rem] sm:text-[1.25rem] font-bold uppercase tracking-[0.02em] text-soil/60">
            <span className="flex items-center gap-10 whitespace-nowrap">
              CSI BENNETT RECRUITMENT 2026<span className="text-blush">●</span>
            </span>
            <span className="flex items-center gap-10 whitespace-nowrap">
              HYPE 4.0<span className="text-blush">●</span>
            </span>
            <span className="flex items-center gap-10 whitespace-nowrap">
              +100 XP PER VERIFIED ATTENDEE<span className="text-blush">●</span>
            </span>
            <span className="flex items-center gap-10 whitespace-nowrap">
              BUILD YOUR REACH<span className="text-blush">●</span>
            </span>
            <span className="flex items-center gap-10 whitespace-nowrap">
              BUILD YOUR TEAM<span className="text-blush">●</span>
            </span>
            <span className="flex items-center gap-10 whitespace-nowrap">
              BUILD THE CHAPTER<span className="text-blush">●</span>
            </span>
            <span className="flex items-center gap-10 whitespace-nowrap">
              CSI BENNETT RECRUITMENT 2026<span className="text-blush">●</span>
            </span>
          </div>
        </section>

        {/* ===================== OFFICIAL EVENT SPOTLIGHT (HYPE 4.0) ===================== */}
        <div id="hype4">
          <HypeEventBanner
            onOpenRegister={() => setPrRegisterModalOpen(true)}
            candidateEnrollment={activeJuniorEnrollment}
          />
        </div>

        {/* ===================== LIVE LEADERBOARD WARZONE ===================== */}
        <LeaderboardSection
          onOpenRegister={() => setPrRegisterModalOpen(true)}
          onOpenAdminDashboard={() => setAdminDashboardOpen(true)}
          onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
        />

        {/* ===================== PR & OUTREACH MISSION BANNER ===================== */}
        <PRHero
          onOpenRegister={() => setPrRegisterModalOpen(true)}
          defaultEnrollment={activeJuniorEnrollment}
        />

        {/* ===================== ABOUT SECTION ===================== */}
        <section
          id="about"
          className="cv-auto bg-cream py-24 sm:py-32 md:py-40 border-b border-soil/5"
        >
          <div className="mx-auto w-full max-w-[1040px] px-5 sm:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="font-display text-[clamp(2.2rem,5.15vw,4.5rem)] font-bold uppercase leading-[1.1] tracking-[0.02em] text-soil mb-10 sm:mb-14"
            >
              <span className="block overflow-hidden">
                <span className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  Tech moves fast.
                </span>
              </span>
              <span className="block overflow-hidden mt-1">
                <span className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  We make sure
                </span>
              </span>
              <span className="block overflow-hidden mt-1">
                <span className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-blush">
                  Bennett leads it.
                </span>
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
            >
              <p className="m-0 text-[0.95rem] leading-[1.75] text-soil/80 font-sans">
                <strong>
                  Computer Society of India (CSI), Bennett University
                </strong>{" "}
                is a student-driven technology community built to create a space
                where curiosity turns into skills, ideas turn into projects, and
                students turn into creators and leaders. The chapter brings
                together students from different technical backgrounds and gives
                them opportunities to learn beyond the classroom through
                hands-on experiences, collaborative projects, technical
                workshops, hackathons, competitions, speaker sessions,
                bootcamps, and campus-wide technology initiatives.
              </p>
              <p className="m-0 text-[0.95rem] leading-[1.75] text-soil/80 font-sans">
                Over the years, CSI Bennett has been at the centre of several
                student-led experiences, including <strong>Hackaccino</strong>,
                our flagship hackathon that brings together developers,
                designers, innovators, and problem-solvers to build, experiment,
                and compete. Alongside Hackaccino, the chapter continues to
                organise technical sessions, Git & GitHub bootcamps, coding and
                development activities, industry-focused interactions, and
                community initiatives that help students discover new
                technologies and connect with people who share the same
                curiosity to build.
              </p>
              <p className="m-0 text-[0.95rem] leading-[1.75] text-soil/70 font-sans">
                <strong>But CSI is not defined by events alone.</strong> It is
                the people behind them — the developers writing code, the
                designers shaping experiences, the teams managing operations,
                the PR and outreach members bringing students together, and the
                leaders who turn an idea into something the entire campus can
                experience. We believe technology becomes more meaningful when
                people build it together.
              </p>
              <p className="m-0 text-[0.95rem] leading-[1.75] text-soil/70 font-sans">
                From the first idea to the final execution, CSI Bennett exists
                to learn, build, connect, and lead — while creating a stronger
                and more active technology culture across Bennett University.{" "}
                <span className="text-blush font-black text-xl sm:text-2xl tracking-wide font-display uppercase">
                  HAIL CSI!
                </span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===================== 3 CORE VALUE CARDS ===================== */}
        <div className="relative">
          <div className="mx-auto w-full max-w-[1040px] px-5 sm:px-6 py-8 sm:py-10 md:py-12">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Card 01 */}
              <Tilt
                tiltMaxAngleX={4}
                tiltMaxAngleY={4}
                scale={1.02}
                transitionSpeed={2000}
                className="h-full"
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-2xl bg-white p-5 sm:p-6 text-soil shadow-[0_12px_32px_rgba(65,51,51,0.08)] border border-soil/5 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-soil px-2 py-0.5 text-[0.62rem] font-mono uppercase tracking-[0.08em] text-cream">
                        01
                      </span>
                      <span className="text-[0.68rem] font-mono text-soil/40 uppercase">
                        WHAT WE LOOK FOR
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="font-display text-[2.2rem] font-bold leading-none">
                        01
                      </p>
                      <p className="mt-2 font-display text-[1.25rem] font-bold uppercase">
                        Outreach Grit
                      </p>
                    </div>
                    <p className="mt-4 rounded-xl bg-cream px-3.5 py-3 text-[0.82rem] leading-[1.55] text-soil/75 font-sans">
                      Can you make people care? We look at how effectively you
                      reach students, communicate the opportunity, and turn
                      conversations into registrations.
                    </p>
                  </div>
                </motion.article>
              </Tilt>

              {/* Card 02 */}
              <Tilt
                tiltMaxAngleX={4}
                tiltMaxAngleY={4}
                scale={1.02}
                transitionSpeed={2000}
                className="h-full"
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-2xl bg-white p-5 sm:p-6 text-soil shadow-[0_12px_32px_rgba(65,51,51,0.08)] border border-soil/5 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-soil px-2 py-0.5 text-[0.62rem] font-mono uppercase tracking-[0.08em] text-cream">
                        02
                      </span>
                      <span className="text-[0.68rem] font-mono text-soil/40 uppercase">
                        WHAT WE LOOK FOR
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="font-display text-[2.2rem] font-bold leading-none">
                        02
                      </p>
                      <p className="mt-2 font-display text-[1.25rem] font-bold uppercase">
                        Execution Over Talk
                      </p>
                    </div>
                    <p className="mt-4 rounded-xl bg-cream px-3.5 py-3 text-[0.82rem] leading-[1.55] text-soil/75 font-sans">
                      Ideas are easy. Execution isn't. Your referral activity
                      gives us a real view of how you plan, communicate, follow
                      up, and deliver.
                    </p>
                  </div>
                </motion.article>
              </Tilt>

              {/* Card 03 */}
              <Tilt
                tiltMaxAngleX={4}
                tiltMaxAngleY={4}
                scale={1.02}
                transitionSpeed={2000}
                className="h-full"
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-2xl bg-white p-5 sm:p-6 text-soil shadow-[0_12px_32px_rgba(65,51,51,0.08)] border border-soil/5 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-soil px-2 py-0.5 text-[0.62rem] font-mono uppercase tracking-[0.08em] text-cream">
                        03
                      </span>
                      <span className="text-[0.68rem] font-mono text-soil/40 uppercase">
                        WHAT WE LOOK FOR
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="font-display text-[2.2rem] font-bold leading-none">
                        03
                      </p>
                      <p className="mt-2 font-display text-[1.25rem] font-bold uppercase">
                        Culture & Teamwork
                      </p>
                    </div>
                    <p className="mt-4 rounded-xl bg-cream px-3.5 py-3 text-[0.82rem] leading-[1.55] text-soil/75 font-sans">
                      No one builds a campus movement alone. Work with tech
                      teams, designers, management, and fellow PR members to
                      turn HYPE 4.0 into a campus-wide experience.
                    </p>
                  </div>
                </motion.article>
              </Tilt>
            </div>
          </div>
        </div>

        {/* ===================== INTERACTIVE 3D SPHERE ARCHIVE ===================== */}
        <section
          id="community"
          className="relative overflow-x-clip bg-cream py-12 sm:py-16"
        >
          <div
            className="relative min-h-[620px] w-full cursor-pointer md:min-h-[820px]"
            role="region"
            aria-label="3D Interactive Event and Project Sphere"
          >
            <div className="pointer-events-auto absolute inset-0 z-0 flex items-center justify-center">
              <InteractiveSphere
                onSelectNode={() => setGalleryModalOpen(true)}
              />
            </div>

            <div className="pointer-events-none relative z-10 mx-auto flex flex-col justify-between min-h-[620px] max-w-[1240px] px-5 py-16 sm:px-8 md:min-h-[820px] md:px-10 md:py-24">
              <h2 className="font-display text-[clamp(2.4rem,5.85vw,5.5rem)] font-bold uppercase leading-[1.1] tracking-[0.02em] text-soil">
                <span className="block overflow-hidden">
                  <span className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <span className="whitespace-nowrap">A chapter</span>
                  </span>
                </span>
              </h2>

              <div className="self-end text-right mt-16">
                <h2 className="font-display text-[clamp(2.4rem,5.85vw,5.5rem)] font-bold uppercase leading-[1.1] tracking-[0.02em] text-soil">
                  <span className="block overflow-hidden">
                    <span className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      Built to move.
                    </span>
                  </span>
                </h2>
                <p className="mt-4 text-[0.75rem] sm:text-sm font-sans text-soil/70 max-w-[28ch] ml-auto uppercase tracking-wide leading-relaxed">
                  People, ideas, events and execution — all moving in the same
                  direction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== FINAL CTA SECTION ===================== */}
        <section className="bg-blush text-soil py-24 sm:py-32 text-center px-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="max-w-[800px] mx-auto"
          >
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[1.1] tracking-[0.02em]">
              READY TO MAKE NOISE?
            </h2>
            <p className="mt-6 text-lg sm:text-xl font-medium font-sans max-w-[40ch] mx-auto opacity-90">
              Don't just join the chapter.
              <br />
              Help move it forward.
            </p>
            <button
              onClick={() => setPrRegisterModalOpen(true)}
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-soil px-8 py-4 text-sm font-bold uppercase tracking-wider text-cream transition-all duration-200 hover:scale-105 active:scale-[0.98] shadow-xl hover:shadow-2xl"
            >
              JOIN THE TEAM
            </button>
            <p className="mt-6 text-xs font-mono font-bold tracking-widest uppercase opacity-75">
              PR • OUTREACH • MANAGEMENT • EVENTS
            </p>
          </motion.div>
        </section>

        {/* ===================== FOOTER ===================== */}
        <footer className="cv-auto bg-soil text-cream">
          <div className="mx-auto w-full max-w-[1040px] px-5 sm:px-6 py-16 sm:py-20 md:py-24">
            <a
              href="#top"
              className="inline-block group"
              aria-label="CSI Bennett University Home"
            >
              <div className="flex items-center gap-3">
                <img
                  alt="CSI Bennett"
                  className="h-10 w-10 object-contain"
                  src="/csi-logo.png"
                />
                <div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-wider text-cream">
                    CSI BENNETT
                  </h3>
                  <p className="font-mono text-[0.65rem] tracking-widest text-blush uppercase">
                    HYPE 4.0 Recruitment Warzone · Bennett University
                  </p>
                </div>
              </div>
            </a>

            <p className="mt-4 m-0 max-w-[42ch] text-[0.92rem] leading-[1.6] text-cream/70 font-sans">
              Built by Bennett University students who got tired of waiting for
              someone else to build it.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-cream/15 pt-8 text-[0.88rem] sm:grid-cols-3">
              <div>
                <p className="m-0 max-w-[34ch] text-cream/70 font-sans text-xs leading-relaxed">
                  Humans building with machines. Bennett University, Plot Nos
                  8-11, TechZone II, Greater Noida, Uttar Pradesh 201310.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="font-mono text-[0.7rem] text-cream/50">
                    HYPE 4.0 Drive Active
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 font-sans text-xs">
                <span className="font-mono uppercase text-cream/40 text-[0.7rem] tracking-wider mb-1">
                  INTERVIEW SHORTCUTS
                </span>
                <button
                  onClick={() => setAdminDashboardOpen(true)}
                  className="text-left transition-colors hover:text-blush"
                >
                  Interviewer Panel Dashboard
                </button>
                <a
                  className="transition-colors hover:text-blush"
                  href={EVENT_DETAILS.lumaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official Luma Page (k6dsna5h)
                </a>
              </div>

              <div className="flex flex-col gap-2 sm:items-end font-sans text-xs">
                <span className="font-mono uppercase text-cream/40 text-[0.7rem] tracking-wider mb-1">
                  CLOUD DATABASE
                </span>
                <button
                  onClick={() => setSupabaseModalOpen(true)}
                  className="transition-colors hover:text-emerald-400 text-left sm:text-right"
                >
                  Supabase Cloud Status
                </button>
                <span className="text-cream/45 font-mono text-[0.75rem] mt-3">
                  © 2026 CSI Bennett University
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ===================== INTERACTIVE MODALS ===================== */}
      <PRRegisterModal
        isOpen={prRegisterModalOpen}
        onClose={() => setPrRegisterModalOpen(false)}
        defaultJuniorEnrollment={activeJuniorEnrollment}
      />

      <AdminInterviewerDashboard
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        onOpenSupabaseConfig={() => {
          setAdminDashboardOpen(false);
          setSupabaseModalOpen(true);
        }}
      />

      <SupabaseConfigModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
      />

      <GalleryModal
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
      />
      {/* Floating Mobile CTA */}
      <button
        onClick={() => setPrRegisterModalOpen(true)}
        className="fixed bottom-5 right-5 z-50 md:hidden flex items-center gap-2 rounded-full bg-blush px-5 py-3 text-sm font-bold uppercase tracking-wider text-soil shadow-2xl shadow-blush/30 hover:bg-white active:scale-95 transition-all animate-[fadeIn_0.5s_ease-out]"
        aria-label="Verify Attendee"
      >
        <Sparkles size={16} />
        Verify
      </button>
    </div>
  );
}
