import React from 'react'
import { Menu } from '../Menu/Menu'
import { SideBarProps } from './SideBar.props'

export const SideBar = ({ ...props }: SideBarProps): JSX.Element => {
	return (
		<div {...props}>
			<Menu />
		</div>
	)
}
