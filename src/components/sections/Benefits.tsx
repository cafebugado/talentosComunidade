import { User, Users, BookOpen, Briefcase, FolderGit2 } from 'lucide-react'

const benefits = [
  {
    icon: User,
    title: 'Seu perfil visível',
    description:
      'Crie seu perfil e apareça na área de membros. Mostre suas skills, projetos e evolua sendo visto por outros devs e recrutadores.',
  },
  {
    icon: Users,
    title: 'Conexões reais',
    description:
      'Conecte-se com pessoas que estão no mesmo momento que você. Troque experiências, peça ajuda e construa junto.',
  },
  {
    icon: BookOpen,
    title: 'Aprendizado na prática',
    description:
      'Participe de projetos, compartilhe o que está estudando e evolua com feedback de quem já está no mercado.',
  },
  {
    icon: Briefcase,
    title: 'Oportunidades dentro da comunidade',
    description:
      'Tenha acesso a vagas, freelas e parcerias que circulam diretamente entre os membros.',
  },
  {
    icon: FolderGit2,
    title: 'Construa seu portfólio na prática',
    description:
      'Participe de iniciativas da comunidade e ganhe experiência real para colocar no seu GitHub e LinkedIn.',
  },
]

export function Benefits() {
  return (
    <section id="beneficios" className="py-10 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Por que criar seu perfil na Café Bugado?
          </h2>
          <p className="text-gray-500 text-sm sm:text-lg max-w-xl mx-auto">
            Aqui você não só entra na comunidade, você passa a fazer parte dela de verdade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-[#7E46EA]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#7E46EA] transition-colors duration-300">
                <Icon className="w-6 h-6 text-[#7E46EA] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-10">
          Criar seu perfil leva menos de 2 minutos.
        </p>
      </div>
    </section>
  )
}
