import React from 'react'
import styles from './ReviewForm.module.css'
import { ReviewFormProps } from './ReviewForm.props'
import cn from 'classnames'
import { Input } from '../Input/Input'
import { Rating } from '../Rating/Rating'
import { Textarea } from '../Textarea/Textarea'
import { Button } from '../Button/Button'
import CloseIcon from './cross.svg'
import { useForm, Controller } from 'react-hook-form'
import { IReviewForm } from './IReviewForm'

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {

	const { register, control, handleSubmit, formState: { errors } } = useForm<IReviewForm>()

	const onSubmit = (data: IReviewForm) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', { required: { value: true, message: 'Field is required!' } })}
					placeholder='Name'
					error={errors.name}
				/>
				<Input
					{...register('title', { required: { value: true, message: 'Field is required!' } })}
					placeholder='Review title'
					className={styles.title}
					error={errors.title}
				/>
				<div className={styles.rating}>
					<span>Rate: </span>
					<Controller control={control} name='rating' render={({ field }) => (
						<Rating isEditable rating={field.value} ref={field.ref} setRating={field.onChange} />
					)}
					/>
				</div>
				<Textarea
					{...register('description', { required: { value: true, message: 'Field is required!' } })}
					placeholder='Review text'
					className={styles.description}
					error={errors.description}

				/>
				<div className={styles.submit}>
					<Button appearance='primary'>Submit</Button>
					<span className={styles.info}>* Before publication, the review will be pre-moderated and checked</span>
				</div>
			</div>
			<div className={styles.success}>
				<div className={styles.successTitle}>Your review send!</div>
				<div className={styles.successDescription}>Thank you! Your review will be published after verification.</div>
				<CloseIcon className={styles.close} />
			</div>
		</form>
	)
}
