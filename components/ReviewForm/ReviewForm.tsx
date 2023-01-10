import React, { useState } from 'react'
import styles from './ReviewForm.module.css'
import { ReviewFormProps } from './ReviewForm.props'
import cn from 'classnames'
import { Input } from '../Input/Input'
import { Rating } from '../Rating/Rating'
import { Textarea } from '../Textarea/Textarea'
import { Button } from '../Button/Button'
import CloseIcon from './cross.svg'
import { useForm, Controller } from 'react-hook-form'
import { IReviewForm, IReviewSendResponse } from './IReviewForm'
import axios from 'axios'
import { API } from '../../helpers/api'

export const ReviewForm = ({
	productId,
	className,
	isOpened,
	...props
}: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors
	} = useForm<IReviewForm>()

	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [error, setError] = useState<string>()

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSendResponse>(
				API.review.createDemo,
				{ ...formData, productId }
			)
			if (data.message) {
				setIsSuccess(true)
				reset()
			} else {
				setError('Something went wrong')
			}
		} catch (e) {
			if (e instanceof Error) {
				setError(e.message)
			}
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<>
				<div className={cn(styles.reviewForm, className)} {...props}>
					<Input
						{...register('name', {
							required: { value: true, message: 'Field is required!' }
						})}
						placeholder="Name"
						error={errors.name}
						tabIndex={isOpened ? 0 : -1}
						aria-invalid={errors.name ? true : false}
					/>
					<Input
						{...register('title', {
							required: { value: true, message: 'Field is required!' }
						})}
						placeholder="Review title"
						className={styles.title}
						error={errors.title}
						tabIndex={isOpened ? 0 : -1}
						aria-invalid={errors.title ? true : false}
					/>
					<div className={styles.rating}>
						<span>Rate: </span>
						<Controller
							control={control}
							rules={{
								required: { value: true, message: 'Indicate the rating' }
							}}
							name="rating"
							render={({ field }) => (
								<Rating
									isEditable
									rating={field.value}
									ref={field.ref}
									setRating={field.onChange}
									error={errors.rating}
									tabIndex={isOpened ? 0 : -1}
								/>
							)}
						/>
					</div>
					<Textarea
						{...register('description', {
							required: { value: true, message: 'Field is required!' }
						})}
						placeholder="Review text"
						className={styles.description}
						error={errors.description}
						tabIndex={isOpened ? 0 : -1}
						aria-label="Review text"
						aria-invalid={errors.description ? true : false}
					/>
					<div className={styles.submit}>
						<Button
							appearance="primary"
							tabIndex={isOpened ? 0 : -1}
							onClick={() => clearErrors()}
						>
							Submit
						</Button>
						<span className={styles.info}>
							* Before publication, the review will be pre-moderated and checked
						</span>
					</div>
				</div>
				{isSuccess && (
					<div className={cn(styles.panel, styles.success)} role="alert">
						<div className={styles.successTitle}>Your review send!</div>
						<div className={styles.successDescription}>
							Thank you! Your review will be published after verification.
						</div>
						<button
							onClick={() => setIsSuccess(false)}
							className={styles.close}
							aria-label="Close alert"
						>
							<CloseIcon />
						</button>
					</div>
				)}
				{error && (
					<div className={cn(styles.panel, styles.error)} role="alert">
						<div className={styles.successTitle}>
							Something went wrong, try to reload page!
						</div>
						<button
							onClick={() => setError(undefined)}
							className={styles.close}
							aria-label="Close alert"
						>
							<CloseIcon />
						</button>
					</div>
				)}
			</>
		</form>
	)
}
