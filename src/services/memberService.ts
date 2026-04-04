import { supabase } from '../lib/supabase'
import type { MemberSchemaData } from '../schemas/memberSchema'

export interface RegisterMemberResult {
  success: boolean
  error?: string
}

export async function registerMember(data: MemberSchemaData): Promise<RegisterMemberResult> {
  const payload = {
    full_name: data.full_name,
    email: data.email,
    city: data.city,
    uf: data.state,
    interest_area: data.interest_area,
    about: data.about,
    linkedin_url: data.linkedin_url,
    github_url: data.github_url,
    portfolio_url: data.portfolio_url || null,
    whatsapp: data.whatsapp || null,
    job_title: data.current_role || null,
    experience_level: data.experience_level || null,
    availability: data.availability || null,
    terms_accepted: data.terms_accepted,
  }

  const { error } = await supabase.from('community_members').insert([payload])

  if (error) {
    if (error.code === '23505') {
      const constraint = error.message ?? ''
      if (constraint.includes('community_members_full_name_key')) {
        return { success: false, error: 'duplicate:name' }
      }
      if (constraint.includes('community_members_linkedin_url_key')) {
        return { success: false, error: 'duplicate:linkedin' }
      }
      if (constraint.includes('community_members_github_url_key')) {
        return { success: false, error: 'duplicate:github' }
      }
      return { success: false, error: 'duplicate:email' }
    }
    return { success: false, error: 'Erro ao realizar cadastro. Tente novamente.' }
  }

  return { success: true }
}
