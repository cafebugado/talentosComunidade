import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 text-gray-400 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm flex flex-wrap items-center justify-center gap-1.5 px-4 text-center leading-relaxed">
            Feito com <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400 shrink-0" /> bugs e muito café por gente que acredita no poder da colaboração.
          </p>
          <p className="text-sm">© {new Date().getFullYear()} Café Bugado</p>
        </div>
      </div>
    </footer>
  )
}
