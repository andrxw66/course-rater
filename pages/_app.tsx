import '../styles/globals.css'
import ym, { YMInitializer } from 'react-yandex-metrika'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'

Router.events.on('routeChangeComplete', (url: string) => {
	if (typeof window !== 'undefined') {
		ym('hit', url)
	}
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<YMInitializer
				accounts={[]}
				options={{ webvisor: true, defer: true }}
				version="2"
			/>
			<Component {...pageProps} />
		</>
	)
}
