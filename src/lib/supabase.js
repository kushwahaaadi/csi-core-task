import { createClient } from '@supabase/supabase-js';
import { formatEnrollment, validateBennettEnrollment } from './validation';

// Official Event Info from Luma https://luma.com/k6dsna5h
export const EVENT_DETAILS = {
  id: 'hype-4-0',
  title: 'HYPE 4.0 — Hack Your Profile',
  tagline: 'Interactive Git & GitHub Session by CSI, Bennett University',
  date: '28 Sept 2026',
  time: '6:00 PM - 8:00 PM',
  venue: 'PLH 101, Bennett University',
  lumaUrl: 'https://luma.com/k6dsna5h',
  image: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,anim=false,background=white,quality=75,width=1200,height=630/event-social/hj/02c2267b-a519-44ff-8250-4164821274c5.png',
  description: 'Kickstart your developer journey with an interactive Git & GitHub session by CSI, Bennett University. Learn the basics, manage your code, collaborate, and start building your GitHub profile. Bring your laptop — hands-on session!'
};

// Storage keys
const STORAGE_KEY_CONFIG = 'csi_bu_supabase_config';

// Helper to get active Supabase client
export function getSupabaseClient() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  let stored = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) stored = JSON.parse(raw);
  } catch (e) {}

  const url = (stored && stored.url) || envUrl;
  const key = (stored && stored.key) || envKey;

  if (url && key && url.startsWith('http')) {
    try {
      return createClient(url, key);
    } catch (err) {
      console.warn('Supabase initialization error:', err);
      return null;
    }
  }

  return null;
}

// Kept for UI modal compatibility
export function saveSupabaseConfig(url, key) {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify({ url: url.trim(), key: key.trim() }));
    return true;
  } catch (err) {
    return false;
  }
}

// Kept for UI modal compatibility
export function getStoredSupabaseConfig() {
  try {
    const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
    const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        url: parsed.url || envUrl,
        key: parsed.key || envKey,
        isCustom: true,
      };
    }
    return { url: envUrl, key: envKey, isCustom: false };
  } catch {
    return { url: '', key: '', isCustom: false };
  }
}

/**
 * Fetch Leaderboard for PR & Management Interview Candidates
 */
export async function getLeaderboard() {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('interview_leaderboard_view')
      .select('*')
      .order('verified_attendees', { ascending: false });

    if (error) {
       console.warn('Supabase fetch failed:', error);
       return [];
    }

    if (data && data.length > 0) {
      return data.map((item, index) => ({
        rank: index + 1,
        enrollment: item.enrollment,
        name: item.name,
        role: item.role || 'PR & Management Applicant',
        score: item.total_score || 0,
        referralsCount: item.verified_attendees || 0,
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${item.enrollment}`,
        badge:
          index === 0
            ? 'Top Performer'
            : index === 1
            ? 'Strong Contender'
            : index === 2
            ? 'High Activity'
            : 'Qualified',
        status: index === 0 ? 'Top Pick' : 'In Review',
      }));
    }
    return [];
  } catch (err) {
    console.warn('Supabase fetch failed:', err);
    return [];
  }
}

/**
 * Register a student attendee under a PR junior applicant's referral code
 */
export async function submitRegistration({
  juniorName,
  juniorEnrollment,
  studentName,
  studentEnrollment,
  studentEmail,
  studentPhone,
  eventName = EVENT_DETAILS.title,
  lumaConfirmation = true,
}) {
  const normJunior = formatEnrollment(juniorEnrollment);
  const normStudent = formatEnrollment(studentEnrollment);

  // Validate enrollments
  const valJunior = validateBennettEnrollment(normJunior);
  if (!valJunior.isValid) {
    return { success: false, error: `Junior Candidate Error: ${valJunior.message}` };
  }

  const valStudent = validateBennettEnrollment(normStudent);
  if (!valStudent.isValid) {
    return { success: false, error: `Attendee Error: ${valStudent.message}` };
  }

  if (normJunior === normStudent) {
    return {
      success: false,
      error: 'Self-referral is prohibited! You cannot register yourself as the convinced student.',
    };
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
     return { success: false, error: 'Database connection is not configured.' };
  }

  try {
    // 1. Check if attendee is already registered
    const { data: existing, error: checkErr } = await supabase
       .from('hype_registrations')
       .select('id')
       .eq('student_enrollment', normStudent)
       .maybeSingle();
       
    if (existing) {
       return {
          success: false,
          error: `Student with enrollment (${normStudent}) is already registered by another candidate. Each attendee counts only once!`,
       };
    }

    // 2. Ensure junior candidate exists
    const { data: existingJunior } = await supabase
       .from('pr_interview_candidates')
       .select('enrollment')
       .eq('enrollment', normJunior)
       .maybeSingle();

    if (!existingJunior) {
       await supabase.from('pr_interview_candidates').insert({
          enrollment: normJunior,
          name: juniorName.trim() || `Junior Applicant (${normJunior})`,
          role: 'PR & Management Applicant',
       });
    }

    // 3. Insert registration record
    const { error: insertErr } = await supabase.from('hype_registrations').insert({
      junior_enrollment: normJunior,
      student_name: studentName.trim(),
      student_enrollment: normStudent,
      student_email: studentEmail.trim() || `${normStudent.toLowerCase()}@bennett.edu.in`,
      student_phone: studentPhone ? studentPhone.trim() : null,
      event_name: eventName,
      luma_confirmed: lumaConfirmation,
    });

    if (insertErr) {
       if (insertErr.code === '23505') {
          return {
             success: false,
             error: `Student with enrollment (${normStudent}) is already registered.`,
          };
       }
       throw insertErr;
    }

    const newRegistration = {
      juniorEnrollment: normJunior,
      studentName: studentName.trim(),
      studentEnrollment: normStudent
    };

    return {
      success: true,
      registration: newRegistration,
      message: `Success! ${newRegistration.studentName} registered for HYPE 4.0 under candidate ${normJunior}. +100 XP added!`,
    };
  } catch (err) {
    console.warn('Supabase sync warning:', err);
    return { success: false, error: 'An unexpected database error occurred.' };
  }
}

/**
 * Get all registrations for Senior Interview Panel
 */
export async function getAllRegistrations() {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  try {
     const { data, error } = await supabase
        .from('hype_registrations')
        .select('*')
        .order('created_at', { ascending: false });
        
     if (error) throw error;
     
     return data.map(r => ({
        id: r.id,
        juniorEnrollment: r.junior_enrollment,
        juniorName: `Candidate (${r.junior_enrollment})`,
        studentName: r.student_name,
        studentEnrollment: r.student_enrollment,
        studentEmail: r.student_email,
        studentPhone: r.student_phone,
        eventName: r.event_name,
        lumaRegistered: r.luma_confirmed,
        timestamp: r.created_at
     }));
  } catch(e) {
     console.warn('Failed to fetch registrations', e);
     return [];
  }
}

/**
 * Get specific candidate profile & referred attendees
 */
export async function getJuniorProfile(enrollment) {
  const norm = formatEnrollment(enrollment);
  
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  
  try {
     const { data: profile } = await supabase
        .from('interview_leaderboard_view')
        .select('*')
        .eq('enrollment', norm)
        .maybeSingle();
        
     const { data: regs } = await supabase
        .from('hype_registrations')
        .select('*')
        .eq('junior_enrollment', norm)
        .order('created_at', { ascending: false });
        
     const count = regs ? regs.length : (profile ? profile.verified_attendees : 0);
     
     return {
        junior: {
           enrollment: norm,
           name: profile ? profile.name : `Candidate (${norm})`,
           referralsCount: count,
           score: count * 100,
        },
        rank: profile ? profile.rank : 'Unranked',
        registrations: regs ? regs.map(r => ({
           id: r.id,
           juniorEnrollment: r.junior_enrollment,
           studentName: r.student_name,
           studentEnrollment: r.student_enrollment,
           studentEmail: r.student_email,
           studentPhone: r.student_phone,
           eventName: r.event_name,
           lumaRegistered: r.luma_confirmed,
           timestamp: r.created_at
        })) : [],
        totalCount: count,
        score: count * 100,
     };
  } catch(e) {
     console.warn('Failed to fetch profile', e);
     return null;
  }
}

export async function getRecentActivities() {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  
  try {
     const { data, error } = await supabase
        .from('hype_registrations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);
        
     if (error) throw error;
     
     return data.map(r => ({
        id: r.id,
        juniorEnrollment: r.junior_enrollment,
        juniorName: `Candidate (${r.junior_enrollment})`,
        studentName: r.student_name,
        studentEnrollment: r.student_enrollment,
        studentEmail: r.student_email,
        studentPhone: r.student_phone,
        eventName: r.event_name,
        lumaRegistered: r.luma_confirmed,
        timestamp: r.created_at
     }));
  } catch(e) {
     console.warn('Failed to fetch activities', e);
     return [];
  }
}
