import { GetStaticProps } from 'next'
import { useState } from 'react'
import { Button, Htag, Paragraph, Rating, Tag } from '../components'
import { withLayout } from '../layout/Layout'
import axios from 'axios'
import { MenuItem } from '../interfaces/IMenu'

function Home({ menu }: HomeProps): JSX.Element {

	const [rating, setRating] = useState<number>(4)

	return (
		<>
			<Htag tag='h1'>Courses</Htag>
			<Button appearance='primary' arrow='right'>Button</Button>
			<Button appearance='ghost' arrow='right'>Button</Button>
			<Paragraph size='l'>dsadasdas</Paragraph>
			<Tag size='m' color='primary'>asdasdas</Tag>
			<Rating rating={rating} setRating={setRating} isEditable></Rating>
			<ul>
				{menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
			</ul>
		</>
	)
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps = async () => {
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
