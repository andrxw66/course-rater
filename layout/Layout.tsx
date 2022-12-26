import React, { FunctionComponent } from 'react'
import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'
import { SideBar } from './SideBar/SideBar'
import { LayoutProps } from './Layout.props'
import styles from './Layout.module.css'

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<Header className={styles.header} />
			<SideBar className={styles.sidebar} />
			<main className={styles.body}>
				{children}
			</main>
			<Footer className={styles.footer} />
		</div>
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
