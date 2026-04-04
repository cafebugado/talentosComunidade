import { useState } from 'react'
import { registerMember } from '../services/memberService'
import type { MemberSchemaData } from '../schemas/memberSchema'
import { toast } from 'sonner'

type DuplicateField = 'name' | 'email' | 'linkedin' | 'github' | null

export function useRegisterMember() {
  const [isLoading, setIsLoading] = useState(false)
  const [duplicateField, setDuplicateField] = useState<DuplicateField>(null)
  const [welcomeName, setWelcomeName] = useState<string | null>(null)

  async function submit(data: MemberSchemaData) {
    setIsLoading(true)
    try {
      const result = await registerMember(data)
      if (result.success) {
        setWelcomeName(data.full_name)
        return true
      } else {
        if (result.error?.startsWith('duplicate:')) {
          const field = result.error.split(':')[1] as DuplicateField
          setDuplicateField(field)
        } else {
          toast.error(result.error || 'Erro ao realizar cadastro.')
        }
        return false
      }
    } catch {
      toast.error('Erro inesperado. Por favor, tente novamente.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    submit,
    isLoading,
    duplicateField,
    closeDuplicateModal: () => setDuplicateField(null),
    welcomeName,
    closeWelcomeModal: () => setWelcomeName(null),
  }
}
