import { Button, Htag, Paragraph, Tag } from '../components'

export default function Home() {
	return (
		<div>
			<Htag tag='h1'>Courses</Htag>
			<Button appearance='primary' arrow='right'>Button</Button>
			<Button appearance='ghost' arrow='right'>Button</Button>
			<Paragraph size='l'>dsadasdas</Paragraph>
			<Tag size='m' color='primary'>asdasdas</Tag>
		</div>
	)
}
