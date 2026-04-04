import { Toaster } from 'sonner'
import { Home } from './pages/Home'

export default function App() {
  return (
    <>
      <Home />
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            fontFamily: 'Inter, system-ui, sans-serif',
          },
        }}
      />
    </>
  )
}
