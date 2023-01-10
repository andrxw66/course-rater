import React, { useEffect, useReducer } from 'react'
import { HhData, Htag, Tag, Advantages, Sort, Product } from '../../components'
import { TopPageComponentProps } from './TopPageComponent.props'
import styles from './TopPageComponent.module.css'
import { TopLevelCategory } from '../../interfaces/IPage'
import { SortEnum } from '../../components/Sort/Sort.props'
import { sortReducer } from './sort.reducer'
import { useReducedMotion } from 'framer-motion'

export const TopPageComponent = ({
	products,
	page,
	firstCategory
}: TopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
		sortReducer,
		{ products, sort: SortEnum.Rating }
	)

	const shouldReduceMotion = useReducedMotion()

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort })
	}

	useEffect(() => {
		dispatchSort({ type: 'reset', initialState: products })
	}, [products])

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag="h1">{page.title}</Htag>
				{products && (
					<Tag color="grey" size="m" aria-label={products.length + 'elements'}>
						{products.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div role="list">
				{sortedProducts &&
					sortedProducts.map((p) => (
						<Product
							role="listitem"
							layout={shouldReduceMotion ? false : true}
							product={p}
							key={p._id}
						/>
					))}
			</div>
			<div className={styles.hhTitle}>
				<Htag tag="h2">Vacancies - {page.category}</Htag>
				<Tag color="red" size="m">
					hh.ru
				</Tag>
			</div>
			{firstCategory == TopLevelCategory.Courses && page.hh && (
				<HhData {...page.hh} />
			)}
			{page.advantages && page.advantages.length > 0 && (
				<>
					<Htag tag="h2">Advantages</Htag>
					<Advantages advantages={page.advantages} />
				</>
			)}
			{page.seoText && (
				<div
					className={styles.seo}
					dangerouslySetInnerHTML={{ __html: page.seoText }}
				/>
			)}
			<Htag tag="h2">Received skills</Htag>
			{page.tags.map((t) => (
				<Tag key={t} color="primary">
					{t}
				</Tag>
			))}
		</div>
	)
}
