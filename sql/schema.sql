-- =============================================
-- Café Bugado – Schema do banco de dados
-- Execute este SQL no Supabase SQL Editor
-- Pode ser executado mais de uma vez sem erro
-- =============================================

-- Tabela principal (estado final)
CREATE TABLE IF NOT EXISTS public.community_members (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name         text NOT NULL,
  email             text NOT NULL,
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
  terms_accepted    boolean NOT NULL DEFAULT false,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT community_members_email_key        UNIQUE (email),
  CONSTRAINT community_members_full_name_key    UNIQUE (full_name),
  CONSTRAINT community_members_linkedin_url_key UNIQUE (linkedin_url),
  CONSTRAINT community_members_github_url_key   UNIQUE (github_url)
);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_community_members_updated ON public.community_members;
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
DROP POLICY IF EXISTS "allow_public_insert" ON public.community_members;
CREATE POLICY "allow_public_insert"
  ON public.community_members
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: leitura para usuários autenticados (admin)
DROP POLICY IF EXISTS "allow_authenticated_select" ON public.community_members;
CREATE POLICY "allow_authenticated_select"
  ON public.community_members
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: leitura pública (existia no projeto antigo, criada pelo painel)
DROP POLICY IF EXISTS "allow_public_select" ON public.community_members;
CREATE POLICY "allow_public_select"
  ON public.community_members
  FOR SELECT
  TO anon
  USING (true);
