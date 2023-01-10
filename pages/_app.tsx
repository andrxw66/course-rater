import '../styles/globals.css'
import ym, { YMInitializer } from 'react-yandex-metrika'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps, router }: AppProps) {
	useEffect(() => {
		router.events.on('routeChangeComplete', (url: string) => {
			if (typeof window !== 'undefined') {
				ym('hit', url)
			}
		})
	}, [router])

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
