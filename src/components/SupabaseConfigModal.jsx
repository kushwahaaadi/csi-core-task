import React, { useState, useEffect } from "react";
import {
  X,
  Database,
  CheckCircle2,
  AlertCircle,
  Key,
  Link2,
  Copy,
  Check,
} from "lucide-react";
import {
  getStoredSupabaseConfig,
  saveSupabaseConfig,
  getSupabaseClient,
} from "../lib/supabase";

export default function SupabaseConfigModal({ isOpen, onClose }) {
  const [url, setUrl] = useState("");
  const [anonKey, setAnonKey] = useState("");
  const [testStatus, setTestStatus] = useState(null); // 'testing' | 'success' | 'failed'
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    const cfg = getStoredSupabaseConfig();
    setUrl(cfg.url || "");
    setAnonKey(cfg.key || "");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    saveSupabaseConfig(url, anonKey);
    setTestStatus("saved");
    setTimeout(() => {
      window.location.reload(); // reload to re-instantiate Supabase client
    }, 1000);
  };

  const handleTestConnection = async () => {
    setTestStatus("testing");
    saveSupabaseConfig(url, anonKey);
    const client = getSupabaseClient();

    if (!client) {
      setTestStatus("failed");
      return;
    }

    try {
      const { data, error } = await client
        .from("pr_juniors")
        .select("count", { count: "exact", head: true });
      if (error) {
        setTestStatus("failed");
      } else {
        setTestStatus("success");
      }
    } catch (err) {
      setTestStatus("failed");
    }
  };

  const copySqlGuide = () => {
    const sql = `-- Run this in Supabase SQL editor:
CREATE TABLE IF NOT EXISTS pr_juniors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    wing TEXT DEFAULT 'PR & Management Wing',
    referrals_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    junior_enrollment TEXT NOT NULL,
    student_name TEXT NOT NULL,
    student_enrollment TEXT NOT NULL,
    student_email TEXT NOT NULL,
    student_phone TEXT,
    event_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_student_event UNIQUE (student_enrollment, event_name)
);`;
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-soil/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-cream text-soil shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-soil/15 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-soil/10 px-6 py-5 bg-white/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600">
              <Database size={22} />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-soil">
                Supabase Integration
              </h3>
              <p className="text-xs font-mono text-soil/60">
                Connect your cloud database for real-time live sync
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-soil/60 hover:bg-soil/10 hover:text-soil transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-800 leading-relaxed font-sans">
            ⚡ <strong>Offline-First Ready:</strong> Even without Supabase keys,
            the website actively saves all registrations, scores, and rankings
            into browser local storage cache with zero loss! When you connect
            your Supabase credentials below, it automatically syncs with the
            cloud.
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-soil/70 mb-1">
                Supabase Project URL
              </label>
              <div className="relative">
                <Link2
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-soil/40"
                />
                <input
                  type="url"
                  placeholder="https://your-project.supabase.co"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full rounded-xl border border-soil/20 bg-white pl-10 pr-4 py-2.5 text-xs font-mono text-soil focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-soil/70 mb-1">
                Supabase Anon Public API Key
              </label>
              <div className="relative">
                <Key
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-soil/40"
                />
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  className="w-full rounded-xl border border-soil/20 bg-white pl-10 pr-4 py-2.5 text-xs font-mono text-soil focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>

            {testStatus === "success" && (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100 p-3 rounded-xl">
                <CheckCircle2 size={16} />
                Successfully connected to Supabase table `pr_juniors`!
              </div>
            )}

            {testStatus === "failed" && (
              <div className="flex items-center gap-2 text-xs font-semibold text-red-700 bg-red-100 p-3 rounded-xl">
                <AlertCircle size={16} />
                Connection failed. Please ensure tables are created using the
                SQL below.
              </div>
            )}

            {testStatus === "saved" && (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100 p-3 rounded-xl">
                <CheckCircle2 size={16} />
                Saved! Reloading page to apply credentials...
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleTestConnection}
                className="flex-1 rounded-full border border-soil/30 bg-white py-2.5 text-xs font-semibold uppercase tracking-wider text-soil hover:bg-soil hover:text-cream transition-colors"
              >
                Test Connection
              </button>
              <button
                type="submit"
                className="flex-1 rounded-full bg-soil py-2.5 text-xs font-semibold uppercase tracking-wider text-cream hover:bg-emerald-600 transition-colors shadow-sm"
              >
                Save & Connect
              </button>
            </div>
          </form>

          {/* Quick SQL Copy helper */}
          <div className="border-t border-soil/10 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-soil/60">
                Supabase SQL Schema
              </span>
              <button
                onClick={copySqlGuide}
                className="text-xs text-blush font-semibold flex items-center gap-1 hover:underline"
              >
                {copiedSql ? <Check size={12} /> : <Copy size={12} />}
                {copiedSql ? "Copied SQL!" : "Copy SQL Schema"}
              </button>
            </div>
            <p className="text-[0.72rem] text-soil/60 font-sans">
              Run the provided <code>supabase_setup.sql</code> in your Supabase
              SQL editor to create the tables with 1-click.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
