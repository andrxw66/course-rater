import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps
} from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx)

		return initialProps
	}

	render(): JSX.Element {
		return (
			<Html lang="en">
				<Head>
					<title>Course Rating</title>
					<link href="/favicon.ico" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://mc.yandex.ru" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap"
						rel="stylesheet"
					/>
					<meta property="og:locale" content="en_EN" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
