import React, { FunctionComponent } from 'react'
import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'
import { SideBar } from './SideBar/SideBar'
import { LayoutProps } from './Layout.props'

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<>
			<Header />
			<div>
				<SideBar />
				<div>
					{children}
				</div>
			</div>
			<Footer />
		</>
	)
}

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		)
	}
}
