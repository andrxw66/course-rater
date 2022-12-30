import React, { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import { FirstLevelMenuItem, PageItem } from '../../interfaces/IMenu'
import styles from './Menu.module.css'
import CoursesIcon from './icons/Courses.svg'
import ServicesIcon from './icons/Services.svg'
import BooksIcon from './icons/Books.svg'
import ProductsIcon from './icons/Products.svg'
import { TopLevelCategory } from '../../interfaces/IPage'
import cn from 'classnames'

const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: 'Courses', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
	{ route: 'services', name: 'Services', icon: <ServicesIcon />, id: TopLevelCategory.Services },
	{ route: 'books', name: 'Books', icon: <BooksIcon />, id: TopLevelCategory.Books },
	{ route: 'products', name: 'Products', icon: <ProductsIcon />, id: TopLevelCategory.Products },
]

export const Menu = (): JSX.Element => {

	const { menu, setMenu, firstCategory } = useContext(AppContext)

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(m => (
					<div key={m.route}>
						<a href={`/${m.route}`}>
							<div className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: m.id == firstCategory
							})}>
								{m.icon}
								<span>
									{m.name}
								</span>
							</div>
						</a>
						{m.id == firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		)
	}

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map(m => (
					<div key={m._id.secondCategory}>
						<div className={styles.secondLevel}>
							{m._id.secondCategory}
							<div className={cn(styles.secondLevelBlock, {
								[styles.secondLevelBlockOpened]: m.isOpened
							})}>
								{buildThirdLevel(m.pages, menuItem.route)}
							</div>
						</div>
					</div>
				))}
			</div>
		)
	}

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return (
			pages.map(page => (
				<a href={`/${route}/${page.alias}`} key={page._id} className={cn(styles.thirdLevel, {
					[styles.thirdLevelActive]: false
				})}>
					{page.category}
				</a>
			))
		)
	}

	return (
		<div className={styles.menu}>
			{buildFirstLevel()}
		</div>
	)
}


