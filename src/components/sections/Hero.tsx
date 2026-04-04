import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white text-gray-900">

      <div className="relative w-full px-6 sm:px-16 lg:px-28 py-0 sm:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* Coluna esquerda — texto */}
          <div className="flex-1 text-center">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8 tracking-tight">
              Entre para a comunidade onde<br />
              <span className="text-[#7E46EA]">seu perfil vira</span>{' '}
              oportunidade
            </h1>

            <p className="text-sm sm:text-lg text-gray-500 mb-10 leading-relaxed max-w-xl mx-auto">
              Cadastre-se na Café Bugado, apareça na área de membros e conecte-se com pessoas que também estão construindo na tecnologia. Aqui você não só entra, você participa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
              <a href="#cadastro">
                <button className="inline-flex items-center justify-center gap-2 bg-[#7E46EA] hover:bg-[#6c35d4] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 w-full sm:w-auto cursor-pointer">
                  Quero fazer parte da comunidade
                </button>
              </a>
              <a href="https://cafebugado.com.br/comunidade" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center justify-center gap-2 border border-[#7E46EA] text-[#7E46EA] hover:bg-[#7E46EA]/10 font-semibold px-6 py-3 rounded-xl transition-colors duration-200 w-full sm:w-auto cursor-pointer">
                  Ver membros da comunidade
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
            </div>

            <p className="text-sm text-gray-500 mb-14">
              Seu nome, seus projetos e sua evolução em um só lugar.
            </p>

            <div>
              <div className="text-2xl sm:text-4xl font-bold text-gray-900">10.000+ membros na comunidade</div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Somando WhatsApp, Telegram e Discord</p>
            </div>
          </div>

          {/* Coluna direita — logo */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <img
              src="https://cafebugado.com.br/logo.png"
              alt="Café Bugado"
              className="w-full max-w-sm object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
