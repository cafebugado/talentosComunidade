-- =============================================
-- Café Bugado – Schema do banco de dados
-- Execute este SQL no Supabase SQL Editor
-- =============================================

-- Tabela principal
CREATE TABLE IF NOT EXISTS public.community_members (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name         text NOT NULL,
  email             text NOT NULL UNIQUE,
  city              text NOT NULL,
  uf                text NOT NULL,
  interest_area     text NOT NULL,
  about             text NOT NULL,
  linkedin_url      text,
  github_url        text,
  portfolio_url     text,
  whatsapp          text,
  job_title         text,
  experience_level  text,
  availability      text,
  profile_image_url text,
  terms_accepted    boolean NOT NULL DEFAULT false,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_community_members_updated
  BEFORE UPDATE ON public.community_members
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Índices
CREATE INDEX IF NOT EXISTS idx_community_members_email ON public.community_members(email);
CREATE INDEX IF NOT EXISTS idx_community_members_uf ON public.community_members(uf);
CREATE INDEX IF NOT EXISTS idx_community_members_interest_area ON public.community_members(interest_area);
CREATE INDEX IF NOT EXISTS idx_community_members_created_at ON public.community_members(created_at DESC);

-- Row Level Security
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;

-- Policy: permite INSERT público (cadastro sem autenticação)
CREATE POLICY "allow_public_insert"
  ON public.community_members
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: leitura apenas para usuários autenticados (admin)
CREATE POLICY "allow_authenticated_select"
  ON public.community_members
  FOR SELECT
  TO authenticated
  USING (true);

-- =============================================
-- Supabase Storage – Bucket para fotos de perfil
-- =============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy de upload público para o bucket
CREATE POLICY "allow_public_upload"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'profile-images');
