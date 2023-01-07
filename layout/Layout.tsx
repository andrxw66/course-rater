import React, { FunctionComponent, useState, KeyboardEvent, useRef } from 'react'
import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'
import { SideBar } from './SideBar/SideBar'
import { LayoutProps } from './Layout.props'
import styles from './Layout.module.css'
import { AppContextProvider, IAppContext } from '../context/app.context'
import { Up } from '../components'
import cn from 'classnames'

const Layout = ({ children }: LayoutProps): JSX.Element => {

	const [isOpened, setIsOpened] = useState<boolean>(false)

	const bodyRef = useRef<HTMLDivElement>(null)

	const skipContentAction = (key: KeyboardEvent) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault()
			bodyRef.current?.focus()
		}
		setIsOpened(false)
	}

	return (
		<div className={styles.wrapper}>
			<a
				onFocus={() => setIsOpened(true)}
				href=''
				tabIndex={1}
				className={cn(styles.skipLink, {
					[styles.displayed]: isOpened
				})}
				onKeyDown={skipContentAction}
			>
				Straight to content
			</a>
			<Header className={styles.header} />
			<SideBar className={styles.sidebar} />
			<div tabIndex={0} className={styles.body} ref={bodyRef}>
				{children}
			</div>
			<Footer className={styles.footer} />
			<Up />
		</div>
	)
}

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		)
	}
}
