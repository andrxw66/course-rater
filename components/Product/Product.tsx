import React, { useState } from 'react'
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

export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {

	const [isOpened, setIsOpened] = useState<boolean>(false)

	return (
		<>
			<Card className={styles.product}>
				<div className={styles.logo}><Image width={70} height={70} src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} /></div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					{priceRU(product.price)}
					{product.oldPrice && <Tag className={styles.oldPrice} color='green'>{priceRU(product.price - product.oldPrice)}</Tag>}
				</div>
				<div className={styles.credit}>
					{priceRU(product.credit)}/<span className={styles.month}>month</span>
				</div>
				<div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
				<div className={styles.tags}>{product.categories.map(c => <Tag key={c} className={styles.category} color='ghost'>{c}</Tag>)}</div>
				<div className={styles.priceTitle}>Price</div>
				<div className={styles.creditTitle}>Credit</div>
				<div className={styles.rateTitle}>{product.reviewCount} {declOfNum(product.reviewCount, ['rate', 'rates'])}</div>
				<Divider className={styles.hr} />
				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div key={c.name} className={styles.characteristics}>
							<span className={styles.characteristicsName}>{c.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && <div className={styles.advantages}>
						<div className={styles.advTitle}>
							Advantages
						</div>
						<div >
							{product.advantages}
						</div>
					</div>}
					{product.disadvantages && <div className={styles.disadvantages}>
						<div className={styles.advTitle}>
							Disadvantages
						</div>
						<div>
							{product.disadvantages}
						</div>
					</div>}
				</div>
				<Divider className={styles.hr} />
				<div className={styles.actions}>
					<Button appearance='primary'>Learn more</Button>
					<Button appearance='ghost' arrow={isOpened ? 'down' : 'right'} className={styles.reviewBtn} onClick={() => setIsOpened(!isOpened)}>Read reviews</Button>
				</div>
			</Card>
			<Card color='blue' className={cn(styles.reviews, {
				[styles.opened]: isOpened,
				[styles.closed]: !isOpened
			})}>
				{product.reviews.map(r => (
					<div key={r._id}>
						<Review review={r} />
						<Divider />
					</div>
				))}
			</Card>
		</>
	)
}
