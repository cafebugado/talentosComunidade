export type ExperienceLevel =
  | 'Iniciante'
  | 'Júnior'
  | 'Pleno'
  | 'Sênior'
  | 'Estudante'
  | 'Transição de carreira'

export type InterestArea =
  | 'Front-end'
  | 'Back-end'
  | 'Full Stack'
  | 'Mobile'
  | 'UI/UX'
  | 'DevOps'
  | 'QA'
  | 'Dados'
  | 'IA'
  | 'Segurança'
  | 'Outro'

export type Availability =
  | 'Disponível para trabalho'
  | 'Aberto a oportunidades'
  | 'Não disponível no momento'

export interface MemberFormData {
  full_name: string
  email: string
  city: string
  state: string
  interest_area: InterestArea
  about: string
  linkedin_url?: string
  github_url?: string
  portfolio_url?: string
  whatsapp?: string
  current_role?: string
  experience_level?: ExperienceLevel
  availability?: Availability
  terms_accepted: boolean
}

export interface Member extends MemberFormData {
  id: string
  created_at: string
  updated_at: string
}
