import React, { ForwardedRef, forwardRef, useRef, useState } from 'react'
import { ProductProps } from './Product.props'
import styles from './Product.module.css'
import cn from 'classnames'
import { Card } from '../Card/Card'
import { Rating } from '../Rating/Rating'
import { Tag } from '../Tag/Tag'
import { Button } from '../Button/Button'
import { declOfNum, priceRU } from '../../helpers/helpers'
import { Divider } from '../Divider/Divider'
import Image from 'next/image'
import { Review } from '../Review/Review'
import { ReviewForm } from '../ReviewForm/ReviewForm'
import { motion } from 'framer-motion'

export const Product = motion(
	forwardRef(
		(
			{ product, className, ...props }: ProductProps,
			ref: ForwardedRef<HTMLDivElement>
		): JSX.Element => {
			const [isOpened, setIsOpened] = useState<boolean>(false)
			const reviewRef = useRef<HTMLDivElement>(null)

			const variants = {
				visible: {
					height: 'auto',
					opacity: 1
				},
				hidden: {
					height: 0,
					opacity: 0
				}
			}

			const scrollToReview = () => {
				setIsOpened(true)
				reviewRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				})
				reviewRef.current?.focus()
			}

			return (
				<div className={className} {...props} ref={ref}>
					<Card className={styles.product}>
						<div className={styles.logo}>
							<Image
								width={70}
								height={70}
								src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
								alt={product.title}
							/>
						</div>
						<div className={styles.title}>{product.title}</div>
						<div className={styles.price}>
							<span className="visualyHidden">price</span>
							{priceRU(product.price)}
							{product.oldPrice && (
								<Tag className={styles.oldPrice} color="green">
									<span className="visualyHidden">discount</span>
									{priceRU(product.price - product.oldPrice)}
								</Tag>
							)}
						</div>
						<div className={styles.credit}>
							<span className="visualyHidden">credit</span>
							{priceRU(product.credit)}/
							<span className={styles.month}>month</span>
						</div>
						<div className={styles.rating}>
							<span className="visualyHidden">
								{'rating' + (product.reviewAvg ?? product.initialRating)}
							</span>
							<Rating rating={product.reviewAvg ?? product.initialRating} />
						</div>
						<div className={styles.tags}>
							{product.categories.map((c) => (
								<Tag key={c} className={styles.category} color="ghost">
									{c}
								</Tag>
							))}
						</div>
						<div className={styles.priceTitle} aria-hidden={true}>
							Price
						</div>
						<div className={styles.creditTitle} aria-hidden={true}>
							Credit
						</div>
						<div className={styles.rateTitle}>
							<a href="#ref" onClick={scrollToReview}>
								{product.reviewCount}{' '}
								{declOfNum(product.reviewCount, ['rate', 'rates'])}
							</a>
						</div>
						<Divider className={styles.hr} />
						<div className={styles.description}>{product.description}</div>
						<div className={styles.feature}>
							{product.characteristics.map((c) => (
								<div key={c.name} className={styles.characteristics}>
									<span className={styles.characteristicsName}>{c.name}</span>
									<span className={styles.characteristicsDots}></span>
									<span className={styles.characteristicsValue}>{c.value}</span>
								</div>
							))}
						</div>
						<div className={styles.advBlock}>
							{product.advantages && (
								<div className={styles.advantages}>
									<div className={styles.advTitle}>Advantages</div>
									<div>{product.advantages}</div>
								</div>
							)}
							{product.disadvantages && (
								<div className={styles.disadvantages}>
									<div className={styles.advTitle}>Disadvantages</div>
									<div>{product.disadvantages}</div>
								</div>
							)}
						</div>
						<Divider className={styles.hr} />
						<div className={styles.actions}>
							<Button appearance="primary">Learn more</Button>
							<Button
								appearance="ghost"
								arrow={isOpened ? 'down' : 'right'}
								className={styles.reviewBtn}
								onClick={() => setIsOpened(!isOpened)}
								aria-expanded={isOpened}
							>
								Read reviews
							</Button>
						</div>
					</Card>
					<motion.div
						layout
						variants={variants}
						initial={'hidden'}
						animate={isOpened ? 'visible' : 'hidden'}
						style={{ overflow: 'hidden' }}
					>
						<Card
							color="blue"
							ref={reviewRef}
							className={styles.reviews}
							tabIndex={isOpened ? 0 : -1}
						>
							{product.reviews.map((r) => (
								<div key={r._id}>
									<Review review={r} />
									<Divider />
								</div>
							))}
							<ReviewForm productId={product._id} isOpened={isOpened} />
						</Card>
					</motion.div>
				</div>
			)
		}
	)
)
