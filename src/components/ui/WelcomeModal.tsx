import { useEffect, useState } from 'react'
import { ExternalLink, Coffee, Users, Zap } from 'lucide-react'
import logoElemento from '../../assets/logoElemento.png'

interface WelcomeModalProps {
  name: string
  onClose: () => void
}

export function WelcomeModal({ name, onClose }: WelcomeModalProps) {
  const [visible, setVisible] = useState(false)
  const firstName = name.trim().split(' ')[0]

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300 ${
        visible ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transition-all duration-300 ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header roxo */}
        <div className="relative bg-[#7E46EA] px-8 pt-8 pb-12 text-white overflow-hidden">
          {/* Blobs decorativos */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-white/10 rounded-full" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-5 h-5 text-purple-200" />
              <span className="text-purple-200 text-sm font-medium">Café Bugado</span>
            </div>

            <div className="flex items-start gap-2 mb-1">
              <h2 className="text-2xl font-bold leading-snug">
                Bem-vindo(a),<br />
                <span className="text-yellow-300">{firstName}! 🎉</span>
              </h2>
            </div>
            <p className="text-purple-200 text-sm mt-2">
              Seu perfil foi criado com sucesso.
            </p>
          </div>
        </div>

        {/* Ícone flutuante */}
        <div className="flex justify-center -mt-7 relative z-10">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center p-1.5">
            <img src={logoElemento} alt="Café Bugado" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Corpo */}
        <div className="px-8 pt-4 pb-8">
          <p className="text-gray-700 text-sm leading-relaxed mb-6 text-center">
            Você acabou de entrar em uma comunidade feita por devs, para devs.
            Aqui você vai encontrar pessoas no mesmo caminho que você —
            aprendendo, construindo e evoluindo juntos.
          </p>

          {/* Lista de próximos passos */}
          <div className="space-y-3 mb-7">
            {[
              {
                icon: Users,
                label: 'Seu perfil já está visível para outros membros',
              },
              {
                icon: Zap,
                label: 'Conecte-se com devs da comunidade',
              },
              {
                icon: Coffee,
                label: 'Participe de projetos, cafés e discussões',
              },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#7E46EA]/10 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#7E46EA]" />
                </div>
                <span className="text-gray-600 text-sm">{label}</span>
              </div>
            ))}
          </div>

          {/* Botão principal */}
          <a
            href="https://cafebugado.com.br/comunidade"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="flex items-center justify-center gap-2 w-full bg-[#7E46EA] hover:bg-[#6c35d4] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 mb-3"
          >
            Ver meu perfil na comunidade
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={handleClose}
            className="w-full text-gray-400 hover:text-gray-600 text-sm py-2 transition-colors duration-200 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
