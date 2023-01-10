import React from 'react'
import { Htag } from '../components'
import { withLayout } from '../layout/Layout'

export const Error404 = () => {
	return <Htag tag="h1">Error404</Htag>
}

export default withLayout(Error404)
