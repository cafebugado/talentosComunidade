import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { Benefits } from '../components/sections/Benefits'
import { MemberForm } from '../components/sections/MemberForm'

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <Benefits />
        <MemberForm />
      </main>
      <Footer />
    </div>
  )
}
