import '../styles/globals.css'
import { OneshotProvider } from '../contexts/OneshotContext'
import { EthersProvider } from '../contexts/EthersContext'
import { OneshotModalProvider } from '../contexts/OneshotModalContext'

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <SafeHydrate>
      <EthersProvider>
        <OneshotProvider>
          <OneshotModalProvider>
            <Component {...pageProps} />
          </OneshotModalProvider>
        </OneshotProvider>
      </EthersProvider>
    </SafeHydrate>
  )
}

export default MyApp
