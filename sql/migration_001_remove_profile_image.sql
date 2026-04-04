-- =============================================
-- Migration 001 – Remove profile_image_url
-- Execute no Supabase SQL Editor
-- =============================================

ALTER TABLE public.community_members
  DROP COLUMN IF EXISTS profile_image_url;
