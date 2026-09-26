import React, { useState } from 'react';
import { X, Calendar, MapPin, Users, ArrowUpRight, Tag, CheckCircle } from 'lucide-react';

const EVENTS_DATA = [
  {
    id: 1,
    title: 'HackBU 2026: The 36-Hour National Flagship',
    date: 'OCT 12-14, 2026',
    time: '36 Hours Non-stop',
    location: 'Bennett University Sports Complex & Labs',
    category: 'Hackathon',
    prize: '₹2,50,000 Prize Pool',
    status: 'Upcoming',
    description: 'Bennett University’s premier national hackathon brought to you by CSI. 800+ builders, 150+ teams, live mentorship from Silicon Valley engineers, and midnight pizza marathons.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    tags: ['Hackathon', 'AI/ML', 'Full Stack', 'Web3', 'Hardware']
  },
  {
    id: 2,
    title: 'PromptCraft: Autonomous AI & Agentic Systems',
    date: 'NOV 04, 2026',
    time: '2:00 PM - 6:30 PM',
    location: 'Auditorium 2, Academic Block A',
    category: 'Masterclass',
    prize: 'Certificate & GPU Compute Credits',
    status: 'Registration Open',
    description: 'A hands-on engineering bootcamp on LLM orchestrations, building autonomous multi-agent swarms with LangGraph and local fine-tuning on high-performance compute clusters.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    tags: ['Generative AI', 'Agentic AI', 'RAG', 'Deep Learning']
  },
  {
    id: 3,
    title: 'NullSector: Red vs Blue Campus CTF',
    date: 'AUG 28, 2026',
    time: '8:00 PM - 8:00 AM (Overnight)',
    location: 'Cybersecurity Lab 304 & Discord',
    category: 'Warzone CTF',
    prize: '₹50,000 + Badges',
    status: 'Completed / Archive',
    description: 'An overnight offensive and defensive cyber wargame. Focuses on reverse engineering, binary exploitation, web vulnerabilities, and cryptographic cipher cracking.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tags: ['Cybersecurity', 'CTF', 'Ethical Hacking', 'Reverse Eng']
  },
  {
    id: 4,
    title: 'CodePulse: Bennett Algorithmic Sprint',
    date: 'JUL 19, 2026',
    time: '6:00 PM - 9:00 PM',
    location: 'Online Contest Arena',
    category: 'Competitive Programming',
    prize: 'CSI Trophies + Swag Pack',
    status: 'Completed / Archive',
    description: 'High-speed competitive programming contest with 200+ Bennett students covering dynamic programming, graph theory, and mathematical problem sets on custom test suites.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    tags: ['Algorithms', 'Data Structures', 'C++', 'ICPC Prep']
  },
  {
    id: 5,
    title: 'OpenSource Summer of Code (OSSoC)',
    date: 'JUN - JUL 2026',
    time: '6-Week Mentorship',
    location: 'GitHub Organization & Hybrid Sprints',
    category: 'Mentorship',
    prize: 'Merged PRs + Official Credentials',
    status: 'Completed / Archive',
    description: 'Our annual open-source incubator where 120+ freshmen and sophomores made their first upstream contributions to production-grade repositories and tools.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    tags: ['Open Source', 'Git', 'Linux', 'Collaboration']
  }
];

export default function EventModal({ isOpen, onClose, onOpenJoin }) {
  const [activeTab, setActiveTab] = useState('all');
  const [registeredEvents, setRegisteredEvents] = useState({});

  if (!isOpen) return null;

  const handleRegisterEvent = (eventId) => {
    setRegisteredEvents((prev) => ({
      ...prev,
      [eventId]: true,
    }));
  };

  const filteredEvents = activeTab === 'all'
    ? EVENTS_DATA
    : activeTab === 'upcoming'
    ? EVENTS_DATA.filter(e => e.status !== 'Completed / Archive')
    : EVENTS_DATA.filter(e => e.status === 'Completed / Archive');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-soil/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div 
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-cream text-soil shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-soil/15 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-soil/10 px-6 sm:px-8 py-5 bg-white/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blush animate-pulse"></span>
              <p className="text-xs font-mono uppercase tracking-wider text-soil/60">CSI Bennett Event Log</p>
            </div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-soil">
              Flagship Events & Archives
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-soil/60 hover:bg-soil/10 hover:text-soil transition-colors"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-soil/5 border-b border-soil/10 text-xs font-medium">
          <button
            onClick={() => setActiveTab('all')}
            className={`rounded-full px-4 py-1.5 transition-all ${
              activeTab === 'all'
                ? 'bg-soil text-cream shadow-sm'
                : 'text-soil/70 hover:bg-soil/10'
            }`}
          >
            All Events ({EVENTS_DATA.length})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`rounded-full px-4 py-1.5 transition-all ${
              activeTab === 'upcoming'
                ? 'bg-soil text-cream shadow-sm'
                : 'text-soil/70 hover:bg-soil/10'
            }`}
          >
            Upcoming / Active
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`rounded-full px-4 py-1.5 transition-all ${
              activeTab === 'past'
                ? 'bg-soil text-cream shadow-sm'
                : 'text-soil/70 hover:bg-soil/10'
            }`}
          >
            Past Archives
          </button>
        </div>

        {/* Event List */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {filteredEvents.map((evt) => (
            <article
              key={evt.id}
              className="group rounded-2xl bg-white p-5 sm:p-6 shadow-[0_8px_24px_rgba(65,51,51,0.06)] border border-soil/10 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(65,51,51,0.12)] hover:border-soil/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Image */}
                <div className="md:col-span-4 h-48 md:h-full min-h-[160px] rounded-xl overflow-hidden relative">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 rounded-full bg-soil/85 backdrop-blur-md px-2.5 py-1 text-[0.65rem] font-mono uppercase text-cream">
                    {evt.category}
                  </div>
                </div>

                {/* Details */}
                <div className="md:col-span-8 flex flex-col justify-between h-full space-y-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-soil/60 font-mono mb-1.5">
                      <span className="flex items-center gap-1 text-blush font-semibold">
                        <Calendar size={13} />
                        {evt.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} />
                        {evt.location}
                      </span>
                    </div>

                    <h4 className="font-display text-xl font-bold uppercase tracking-tight text-soil group-hover:text-blush transition-colors">
                      {evt.title}
                    </h4>

                    <p className="mt-2 text-xs sm:text-sm text-soil/75 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-soil/10">
                    <div className="flex flex-wrap gap-1.5">
                      {evt.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-soil/5 px-2 py-0.5 text-[0.68rem] font-medium text-soil/70"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div>
                      {registeredEvents[evt.id] ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                          <CheckCircle size={14} /> Registered
                        </span>
                      ) : evt.status === 'Completed / Archive' ? (
                        <span className="inline-flex items-center text-xs font-medium text-soil/50 bg-soil/5 px-3 py-1.5 rounded-full">
                          Archived Event
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRegisterEvent(evt.id)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-soil px-5 py-2 text-xs font-semibold uppercase tracking-wider text-cream transition-all hover:bg-blush hover:text-soil active:scale-95 shadow-sm"
                        >
                          RSVP Seat
                          <ArrowUpRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
