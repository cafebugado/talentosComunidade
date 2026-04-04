import { useEffect, useState } from 'react'

const lines = [
  { delay: 0,    duration: 60,  content: <><span className="text-[#7E46EA]">&gt;_</span> <span className="text-[#4ade80]">cd</span> <span className="text-white">cafe-bugado</span></> },
  { delay: 800,  duration: 60,  content: <><span className="text-[#7E46EA]">&gt;_</span> <span className="text-[#4ade80]">cadastrar</span> <span className="text-[#38bdf8]">--membro</span> <span className="text-white">você</span></> },
  { delay: 1800, duration: 50,  content: <><span className="text-gray-400">Validando dados...</span></> },
  { delay: 2600, duration: 50,  content: <><span className="text-yellow-400">WARN</span> <span className="text-gray-300"> detectado: café insuficiente</span></> },
  { delay: 3400, duration: 50,  content: <><span className="text-[#38bdf8]">INFO</span> <span className="text-gray-300"> preparando mais café...</span></> },
  { delay: 4200, duration: 50,  content: <><span className="text-[#4ade80]">SUCCESS</span> <span className="text-gray-300"> café reabastecido!</span></> },
  { delay: 5000, duration: 60,  content: <><span className="text-[#7E46EA]">&gt;_</span> <span className="text-[#4ade80]">npm</span> <span className="text-white">start</span></> },
  { delay: 5800, duration: 80,  content: <><span className="text-[#7E46EA]">Café Bugado</span> <span className="text-gray-300">rodando em</span> <span className="text-[#38bdf8]">comunidade://ativa/</span> <span>✨</span></> },
]

// Pinguim ASCII simples
const Penguin = () => (
  <pre className="text-[10px] leading-tight text-gray-500 select-none hidden lg:block absolute bottom-3 right-4 font-mono">
{` .~.
 /V\\
/ ' \\
/(   )\\
 ^'~'^`}
  </pre>
)

type LineState = { visible: boolean; typed: boolean }

export function TerminalAnimation() {
  const [states, setStates] = useState<LineState[]>(
    lines.map(() => ({ visible: false, typed: false }))
  )
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    // Cursor blink
    const cursorInterval = setInterval(() => setCursor((c) => !c), 500)

    // Schedule each line
    const timers: ReturnType<typeof setTimeout>[] = []
    lines.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setStates((prev) => {
            const next = [...prev]
            next[i] = { visible: true, typed: false }
            return next
          })
          // Mark as typed after duration
          timers.push(
            setTimeout(() => {
              setStates((prev) => {
                const next = [...prev]
                next[i] = { visible: true, typed: true }
                return next
              })
            }, line.duration * 8)
          )
        }, line.delay)
      )
    })

    // Loop: restart after last line + pause
    const loopTimer = setTimeout(() => {
      setStates(lines.map(() => ({ visible: false, typed: false })))
    }, lines[lines.length - 1].delay + 4000)

    return () => {
      clearInterval(cursorInterval)
      timers.forEach(clearTimeout)
      clearTimeout(loopTimer)
    }
  }, [states.every((s) => s.typed) && states[lines.length - 1]?.typed ? 1 : 0])

  // Restart loop
  useEffect(() => {
    if (!states[lines.length - 1]?.typed) return
    const timer = setTimeout(() => {
      setStates(lines.map(() => ({ visible: false, typed: false })))
    }, 3500)
    return () => clearTimeout(timer)
  }, [states[lines.length - 1]?.typed])

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      {/* Janela do terminal */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20">
        {/* Barra superior */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#1e1e2e] border-b border-white/5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-gray-500 font-mono">cafebugado.terminal</span>
          {/* Pinguim pequeno inline na barra */}
          <span className="ml-auto text-base" title="Linux">🐧</span>
        </div>

        {/* Corpo do terminal */}
        <div className="bg-[#13131f] px-5 py-5 font-mono text-sm min-h-[260px] relative">
          <div className="space-y-2">
            {lines.map((line, i) => {
              const state = states[i]
              if (!state?.visible) return null
              return (
                <div
                  key={i}
                  className="flex items-start gap-0 animate-fadeIn"
                >
                  <span className="leading-6">{line.content}</span>
                  {/* Cursor piscando na última linha visível */}
                  {i === states.filter((s) => s.visible).length - 1 && !state.typed && (
                    <span
                      className={`inline-block w-2 h-4 bg-[#7E46EA] ml-0.5 mt-1 transition-opacity ${cursor ? 'opacity-100' : 'opacity-0'}`}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Cursor idle quando tudo digitado */}
          {states[lines.length - 1]?.typed && (
            <div className="mt-2 flex items-center gap-1">
              <span className="text-[#7E46EA]">&gt;_</span>
              <span
                className={`inline-block w-2 h-4 bg-[#7E46EA] ml-0.5 transition-opacity ${cursor ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          )}

          <Penguin />
        </div>
      </div>

      {/* Label abaixo */}
      <p className="text-xs text-gray-600 text-center mt-3 font-mono">
        // cadastrando via terminal • powered by linux 🐧
      </p>
    </div>
  )
}
