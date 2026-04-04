import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus, LinkIcon, Phone } from 'lucide-react'
import { memberSchema, type MemberSchemaData } from '../../schemas/memberSchema'
import { INTEREST_AREAS, EXPERIENCE_LEVELS, AVAILABILITY_OPTIONS, BRAZIL_STATES } from '../../constants/options'
import { maskWhatsApp } from '../../utils/masks'
import { useRegisterMember } from '../../hooks/useRegisterMember'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import { FormField } from '../ui/FormField'
import { DuplicateModal } from '../ui/DuplicateModal'
import { WelcomeModal } from '../ui/WelcomeModal'

const INTEREST_OPTIONS = INTEREST_AREAS.map((a) => ({ value: a, label: a }))
const LEVEL_OPTIONS = EXPERIENCE_LEVELS.map((l) => ({ value: l, label: l }))
const AVAILABILITY_OPTS = AVAILABILITY_OPTIONS.map((a) => ({ value: a, label: a }))
const STATE_OPTIONS = BRAZIL_STATES.map((s) => ({ value: s.value, label: `${s.value} – ${s.label}` }))

export function MemberForm() {
  const { submit, isLoading, duplicateField, closeDuplicateModal, welcomeName, closeWelcomeModal } = useRegisterMember()

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<MemberSchemaData>({
    resolver: zodResolver(memberSchema),
    mode: 'onChange',
    defaultValues: {
      terms_accepted: false,
    },
  })

  const aboutValue = watch('about') ?? ''

  const onSubmit = async (data: MemberSchemaData) => {
    const success = await submit(data)
    if (success) reset()
  }

  return (
    <>
    {welcomeName && <WelcomeModal name={welcomeName} onClose={closeWelcomeModal} />}
    {duplicateField && <DuplicateModal field={duplicateField} onClose={closeDuplicateModal} />}
    <section id="cadastro" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#7E46EA]/10 rounded-2xl mb-4">
            <UserPlus className="w-7 h-7 text-[#7E46EA]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3">
            Entre para a comunidade
          </h2>
          <p className="text-gray-500 text-sm sm:text-lg">
            Preencha o formulário abaixo. É rápido, gratuito e vale muito.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10 space-y-8"
        >
          {/* Dados principais */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Informações principais
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <FormField label="Nome completo" htmlFor="full_name" error={errors.full_name?.message} required>
                  <Input id="full_name" placeholder="Seu nome completo" error={!!errors.full_name} {...register('full_name')} />
                </FormField>
              </div>
              <div className="sm:col-span-2">
                <FormField label="E-mail" htmlFor="email" error={errors.email?.message} required>
                  <Input id="email" type="email" placeholder="seu@email.com" error={!!errors.email} {...register('email')} />
                </FormField>
              </div>
              <FormField label="Cidade" htmlFor="city" error={errors.city?.message} required>
                <Input id="city" placeholder="Sua cidade" error={!!errors.city} {...register('city')} />
              </FormField>
              <FormField label="Estado" htmlFor="state" error={errors.state?.message} required>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="state"
                      options={STATE_OPTIONS}
                      placeholder="Selecione o estado"
                      error={!!errors.state}
                      {...field}
                    />
                  )}
                />
              </FormField>
              <FormField label="Área de interesse" htmlFor="interest_area" error={errors.interest_area?.message} required>
                <Controller
                  name="interest_area"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="interest_area"
                      options={INTEREST_OPTIONS}
                      placeholder="Selecione sua área"
                      error={!!errors.interest_area}
                      {...field}
                    />
                  )}
                />
              </FormField>
              <FormField label="Cargo atual" htmlFor="current_role" error={errors.current_role?.message}>
                <Input id="current_role" placeholder="Ex: Desenvolvedor Front-end" error={!!errors.current_role} {...register('current_role')} />
              </FormField>
              <FormField label="Nível de experiência" htmlFor="experience_level" error={errors.experience_level?.message}>
                <Controller
                  name="experience_level"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="experience_level"
                      options={LEVEL_OPTIONS}
                      placeholder="Selecione seu nível"
                      error={!!errors.experience_level}
                      {...field}
                    />
                  )}
                />
              </FormField>
              <FormField label="Disponibilidade" htmlFor="availability" error={errors.availability?.message}>
                <Controller
                  name="availability"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="availability"
                      options={AVAILABILITY_OPTS}
                      placeholder="Selecione sua disponibilidade"
                      error={!!errors.availability}
                      {...field}
                    />
                  )}
                />
              </FormField>
            </div>
          </div>

          {/* Sobre */}
          <div>
            <FormField
              label="Sobre você"
              htmlFor="about"
              error={errors.about?.message}
              required
              hint="Fale sobre sua trajetória, interesses e o que você busca na comunidade."
            >
              <Textarea
                id="about"
                rows={5}
                placeholder="Conte um pouco sobre você, sua trajetória e o que espera da comunidade..."
                error={!!errors.about}
                currentLength={aboutValue.length}
                maxLength={600}
                {...register('about')}
              />
            </FormField>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-purple-500" />
              Links e redes sociais
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField label="LinkedIn" htmlFor="linkedin_url" error={errors.linkedin_url?.message} required>
                <Input id="linkedin_url" placeholder="https://linkedin.com/in/usuario" error={!!errors.linkedin_url} {...register('linkedin_url')} />
              </FormField>
              <FormField label="GitHub" htmlFor="github_url" error={errors.github_url?.message} required>
                <Input id="github_url" placeholder="https://github.com/usuario" error={!!errors.github_url} {...register('github_url')} />
              </FormField>
              <FormField label="Portfólio" htmlFor="portfolio_url" error={errors.portfolio_url?.message}>
                <Input id="portfolio_url" placeholder="https://seusite.com.br" error={!!errors.portfolio_url} {...register('portfolio_url')} />
              </FormField>
              <FormField
                label="WhatsApp"
                htmlFor="whatsapp"
                error={errors.whatsapp?.message}
              >
                <Controller
                  name="whatsapp"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <Input
                        id="whatsapp"
                        placeholder="(11) 91234-5678"
                        className="pl-10"
                        error={!!errors.whatsapp}
                        value={value ?? ''}
                        onChange={(e) => onChange(maskWhatsApp(e.target.value))}
                        {...field}
                      />
                    </div>
                  )}
                />
              </FormField>
            </div>
          </div>

          {/* Termos */}
          <div>
            <div
              className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${
                errors.terms_accepted ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <input
                id="terms_accepted"
                type="checkbox"
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer shrink-0"
                {...register('terms_accepted')}
              />
              <label htmlFor="terms_accepted" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                Concordo com os{' '}
                <span className="text-purple-600 font-medium hover:underline cursor-pointer">
                  Termos de Uso
                </span>{' '}
                e{' '}
                <span className="text-purple-600 font-medium hover:underline cursor-pointer">
                  Política de Privacidade
                </span>{' '}
                do Café Bugado. Meus dados serão usados apenas para fins da comunidade.
              </label>
            </div>
            {errors.terms_accepted && (
              <p className="text-xs text-red-600 mt-1.5 ml-1 flex items-center gap-1" role="alert">
                <span>⚠</span> {errors.terms_accepted.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Enviando cadastro...' : 'Entrar na comunidade'}
          </Button>

          <p className="text-center text-xs text-gray-400">
            Seus dados ficam seguros e não serão compartilhados com terceiros.
          </p>
        </form>
      </div>
    </section>
    </>
  )
}
