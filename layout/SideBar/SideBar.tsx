import React from 'react'
import { SideBarProps } from './SideBar.props'

export const SideBar = ({ ...props }: SideBarProps): JSX.Element => {
	return (
		<div {...props}>
			SideBar
		</div>
	)
}
