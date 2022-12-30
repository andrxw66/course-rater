import React from 'react'
import { Menu } from '../Menu/Menu'
import { SideBarProps } from './SideBar.props'
import Logo from '../logo.svg'
import styles from './SideBar.module.css'
import cn from 'classnames'

export const SideBar = ({ className, ...props }: SideBarProps): JSX.Element => {
	return (
		<div {...props} className={cn(className, styles.sidebar)}>
			<Logo className={styles.logo} />
			<div>Search</div>
			<Menu />
		</div>
	)
}
