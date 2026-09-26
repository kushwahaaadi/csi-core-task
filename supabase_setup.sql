-- ==============================================================================
-- CSI BENNETT UNIVERSITY - PR & MANAGEMENT INTERVIEW TASK & LEADERBOARD
-- EVENT: HYPE 4.0 — Hack Your Profile (Git & GitHub Session)
-- Luma URL: https://luma.com/k6dsna5h
-- ==============================================================================

-- 1. Create table for Junior Candidates taking the interview task
CREATE TABLE IF NOT EXISTS public.pr_interview_candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'PR & Management Applicant',
    referrals_count INTEGER DEFAULT 0,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create table for Students Convinced to Attend HYPE 4.0
CREATE TABLE IF NOT EXISTS public.hype_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    junior_enrollment TEXT NOT NULL,
    student_name TEXT NOT NULL,
    student_enrollment TEXT NOT NULL,
    student_email TEXT NOT NULL,
    student_phone TEXT,
    event_name TEXT DEFAULT 'HYPE 4.0 — Hack Your Profile',
    luma_confirmed BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    -- Prevent duplicate counting: each Bennett student can only be logged once!
    CONSTRAINT unique_hype_student UNIQUE (student_enrollment)
);

-- 3. Create Leaderboard Aggregation View for Senior Interviewers
CREATE OR REPLACE VIEW public.interview_leaderboard_view AS
SELECT 
    c.enrollment,
    c.name,
    c.role,
    COUNT(r.id) AS verified_attendees,
    COUNT(r.id) * 100 AS total_score,
    DENSE_RANK() OVER (ORDER BY COUNT(r.id) DESC) as rank
FROM public.pr_interview_candidates c
LEFT JOIN public.hype_registrations r ON UPPER(c.enrollment) = UPPER(r.junior_enrollment)
GROUP BY c.enrollment, c.name, c.role
ORDER BY verified_attendees DESC;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.pr_interview_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hype_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public read and write for the recruitment task portal
CREATE POLICY "Allow public read on candidates" 
ON public.pr_interview_candidates FOR SELECT USING (true);

CREATE POLICY "Allow public insert and update on candidates" 
ON public.pr_interview_candidates FOR ALL USING (true);

CREATE POLICY "Allow public read on hype registrations" 
ON public.hype_registrations FOR SELECT USING (true);

CREATE POLICY "Allow public insert on hype registrations" 
ON public.hype_registrations FOR INSERT WITH CHECK (true);

-- 5. Insert Seed Candidates
INSERT INTO public.pr_interview_candidates (enrollment, name, role, referrals_count)
VALUES 
    ('S24CSEU1214', 'Aditya Kushwaha', 'PR & Management Applicant', 0)
ON CONFLICT (enrollment) DO UPDATE 
SET name = EXCLUDED.name, referrals_count = EXCLUDED.referrals_count;

-- 6. Remove old demo entries (if they exist)
DELETE FROM public.hype_registrations WHERE junior_enrollment IN ('S24CSEU0312', 'E23CSEU0115', 'S24ECE0048');
DELETE FROM public.pr_interview_candidates WHERE enrollment IN ('S24CSEU0312', 'E23CSEU0115', 'S24ECE0048');
