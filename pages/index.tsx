import { GetStaticProps } from 'next'
import { useState } from 'react'
import { Button, Htag, Input, Paragraph, Rating, Tag, Textarea } from '../components'
import { withLayout } from '../layout/Layout'
import axios from 'axios'
import { MenuItem } from '../interfaces/IMenu'

function Home({ menu }: HomeProps): JSX.Element {

	const [rating, setRating] = useState<number>(4)

	return (
		<>
			<Input placeholder='name' />
			<Textarea placeholder='fam' />
		</>
	)
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	})
	return {
		props: {
			menu, firstCategory
		}
	}
}

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[]
	firstCategory: number
}
