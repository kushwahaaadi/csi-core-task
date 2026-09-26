import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle, Sparkles, Send, ArrowRight } from 'lucide-react';

export default function JoinModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    enrollment: '',
    year: '1st Year',
    wing: 'AI & Data Science',
    github: '',
    interest: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f2765e', '#ffffff', '#315b8c', '#e8c9a8']
      });
    } catch (err) {
      // fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-soil/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-cream text-soil shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-soil/15 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="flex items-center justify-between border-b border-soil/10 px-6 py-5 bg-white/60">
          <div className="flex items-center gap-3">
            <img src="/csi-logo.png" alt="CSI BU" className="h-8 w-8 object-contain" />
            <div>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-soil">
                Join CSI Bennett
              </h3>
              <p className="text-[0.75rem] text-soil/60 font-mono">
                BU Chapter · Fall 2026 Cohort
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-soil/60 hover:bg-soil/10 hover:text-soil transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-xl bg-blush/15 p-4 border border-blush/30">
                <p className="text-xs text-soil/80 leading-relaxed font-sans">
                  <strong className="text-soil">No portfolio required.</strong> We care about curiosity, grit, and showing up. From first-time coders to system architects, everyone is welcome.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-soil/70 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-soil/20 bg-white px-4 py-2.5 text-sm text-soil focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-soil/70 mb-1">
                    Bennett Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@bennett.edu.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-soil/20 bg-white px-4 py-2.5 text-sm text-soil focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-soil/70 mb-1">
                    Enrollment No.
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. E23CSEU0000"
                    value={formData.enrollment}
                    onChange={(e) => setFormData({ ...formData, enrollment: e.target.value })}
                    className="w-full rounded-xl border border-soil/20 bg-white px-4 py-2.5 text-sm text-soil focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-soil/70 mb-1">
                    Current Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full rounded-xl border border-soil/20 bg-white px-4 py-2.5 text-sm text-soil focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20 transition-all"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year / M.Tech</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-soil/70 mb-1">
                    Primary Domain of Interest
                  </label>
                  <select
                    value={formData.wing}
                    onChange={(e) => setFormData({ ...formData, wing: e.target.value })}
                    className="w-full rounded-xl border border-soil/20 bg-white px-4 py-2.5 text-sm text-soil focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20 transition-all"
                  >
                    <option>AI & Machine Learning</option>
                    <option>Full-Stack & Cloud</option>
                    <option>Cybersecurity & CTFs</option>
                    <option>Competitive Programming</option>
                    <option>Robotics & IoT</option>
                    <option>Design & UI/UX</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-soil/70 mb-1">
                  GitHub / Portfolio / Social Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/yourhandle"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full rounded-xl border border-soil/20 bg-white px-4 py-2.5 text-sm text-soil focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-soil/70 mb-1">
                  What project or skill are you most interested in building this year?
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what excites you in tech..."
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full rounded-xl border border-soil/20 bg-white px-4 py-2.5 text-sm text-soil focus:border-blush focus:outline-none focus:ring-2 focus:ring-blush/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-soil py-3 text-center text-sm font-semibold uppercase tracking-wider text-cream transition-all duration-200 hover:bg-blush hover:text-soil active:scale-[0.98] shadow-md flex items-center justify-center gap-2 mt-4"
              >
                Submit Application
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-5 animate-[scaleIn_0.3s_ease-out]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle size={36} />
              </div>
              <div>
                <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-soil">
                  Welcome to the Vanguard, {formData.name || 'Builder'}!
                </h4>
                <p className="mt-2 text-sm text-soil/70 max-w-sm mx-auto">
                  Your application for the <strong>{formData.wing}</strong> wing at CSI Bennett University has been received.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="mx-auto max-w-sm rounded-2xl bg-white p-5 text-left border border-soil/15 shadow-sm space-y-3 font-mono">
                <div className="flex justify-between items-center border-b border-soil/10 pb-2 text-[0.75rem] text-soil/60">
                  <span>CSI BENNETT MEMBER PASS</span>
                  <span className="text-blush font-bold">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-soil/60">APPLICANT:</span>
                  <span className="font-semibold text-soil">{formData.name || 'Bennett Engineer'}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-soil/60">DOMAIN:</span>
                  <span className="font-semibold text-soil">{formData.wing}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-soil/60">PASS ID:</span>
                  <span className="text-blush">CSI-BU-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://wa.me/919150401402?text=Hi%2C%20I%20applied%20to%20CSI%20Bennett%20University."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-emerald-700 transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  Join WhatsApp Group
                </a>
                <button
                  onClick={handleReset}
                  className="rounded-full border border-soil/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-soil hover:bg-soil hover:text-cream transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
