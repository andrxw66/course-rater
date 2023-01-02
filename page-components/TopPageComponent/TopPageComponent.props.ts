import { TopLevelCategory, TopPageModel } from '../../interfaces/IPage'
import { ProductModel } from '../../interfaces/IProduct'

export interface TopPageComponentProps {
	firstCategory: TopLevelCategory
	page: TopPageModel
	products: ProductModel[]
}
