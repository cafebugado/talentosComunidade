-- =============================================
-- Migration 002 – Unique constraints
-- Execute no Supabase SQL Editor
-- =============================================

-- Nome completo único
ALTER TABLE public.community_members
  ADD CONSTRAINT community_members_full_name_key UNIQUE (full_name);

-- LinkedIn único
ALTER TABLE public.community_members
  ADD CONSTRAINT community_members_linkedin_url_key UNIQUE (linkedin_url);

-- GitHub único
ALTER TABLE public.community_members
  ADD CONSTRAINT community_members_github_url_key UNIQUE (github_url);
