import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Empty, Spin } from 'antd'
import {ProductCard} from '../../ProductCard/ProductCard'
import { getProductsToCatalog } from '../../../store/products/middleware'
import CatalogPagination from '../CatalogPagination/CatalogPagination'
import { ProductsWrapper, Wrapper } from './StyledCatalogProductsPlace'
import makeConfigFromUrl from '../../../utils/makeConfigFromUrl'
import makeUrlFromConfig from '../../../utils/makeUrlFromConfig'
import { selectCatalogProducts, selectIsLoading, selectProductsQuantity } from '../../../store/products/reducer'

const mapStateToProps = (state) => ({
  catalogProducts: selectCatalogProducts(state),
  productsQuantity: selectProductsQuantity(state),
  isLoading: selectIsLoading(state)
})

const CatalogProductsPlace = connect(mapStateToProps, {
  getProductsToCatalog
})((
  {
    isLoading,
    catalogProducts,
    productsQuantity,
    getProductsToCatalog
  }
) => {
  const {search} = useLocation()
  const config = useMemo(() => (search ? makeConfigFromUrl(search) : {}), [search])

  useEffect(() => {
    if (config.perPage) {
      getProductsToCatalog(search)
    } else {
      config.perPage = 16
      getProductsToCatalog(`?${makeUrlFromConfig(config)}`)
    }
  }, [config, getProductsToCatalog, search])

  if (isLoading) return <Spin size="large" tip="Loading..." style={{margin: '50px auto'}} />

  return (
    !productsQuantity
      ? (
        <Empty description={false}>
          <span>Sorry, no products</span>
        </Empty>
      )
      : (
        <Wrapper>
          <ProductsWrapper>
            {catalogProducts
              .map((el) => (
                <ProductCard
                  key={el.itemNo}
                  productInfo={el}
                />
              ))}
          </ProductsWrapper>
          {productsQuantity > (config.perPage || 16) && <CatalogPagination />}
        </Wrapper>
      )
  )
})

export default CatalogProductsPlace