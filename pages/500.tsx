import React from 'react'
import { Htag } from '../components'
import { withLayout } from '../layout/Layout'

const Error500 = () => {
	return <Htag tag="h1">Error500</Htag>
}

export default withLayout(Error500)
