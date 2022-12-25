import { useState } from 'react'
import { Button, Htag, Paragraph, Rating, Tag } from '../components'
import { withLayout } from '../layout/Layout'

function Home(): JSX.Element {

	const [rating, setRating] = useState<number>(4)

	return (
		<>
			<Htag tag='h1'>Courses</Htag>
			<Button appearance='primary' arrow='right'>Button</Button>
			<Button appearance='ghost' arrow='right'>Button</Button>
			<Paragraph size='l'>dsadasdas</Paragraph>
			<Tag size='m' color='primary'>asdasdas</Tag>
			<Rating rating={rating} setRating={setRating} isEditable></Rating>
		</>
	)
}

export default withLayout(Home)
