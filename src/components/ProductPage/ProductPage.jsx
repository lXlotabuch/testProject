/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { message } from 'antd'
import { Container } from '../common/Container'
import CartGroup from './CartGroup/CartGroup'
import {
  PageContainer,
  ProductImagesCarouselBox,
  InformationBox,
  StyledImg,
  ProductHeading,
  AboutProduct,
  PriceBox,
  ImageBox,
  FavoriteBox,
  FavoriteText,
} from './StylesProductPage'
import Carousel from '../Carousel/Carousel'
import upperCaseFirstLetter from '../../utils/upperCaseFirstLetter'
import SpinAnimation from '../SpinAnimation/SpinAnimation'
import { getOneProduct } from '../../store/products/middleware'
import ProductRate from './ProductRate/ProductRate'
import FavoriteIcon from '../FavotiteIcon/FavoriteIcon'
import { forDesktop } from '../../styles/mediaBreakPoints'

const ProductPage = () => {
  const [product, setProduct] = useState(null)
  const { itemNo } = useParams()
  const history = useHistory()

  useEffect(() => {
    const getProduct = async () => {
      const response = await getOneProduct(itemNo)
      if (response.status === 200) setProduct(() => response.data)
      else {
        message.error('Something went wrong')
        history.push('/')
      }
    }
    getProduct()
  }, [history, itemNo])

  const carouselSettings = {
    dots: false,
    responsive: [
      {
        breakpoint: forDesktop.minWidth,
        settings: {
          dots: true
        }
      }
    ]
  }

  if (!product) return <SpinAnimation width="100%" height="80vh" />

  return (
    <Container>
      <PageContainer>
        <ProductImagesCarouselBox>
          <Carousel carouselSettings={carouselSettings}>
            {product.imageUrls.map((url) => (
              <ImageBox key={url}>
                <StyledImg src={url} key={url} alt="Product image" />
              </ImageBox>
            ))}
          </Carousel>
        </ProductImagesCarouselBox>
        <InformationBox>
          <ProductHeading>{upperCaseFirstLetter(product.name)}</ProductHeading>
          <PriceBox>
            <b>
              {product.currentPrice}
            </b>
            ₴.
          </PriceBox>
          <div style={{ marginBottom: '6px' }}>
            Product number:
            {' '}
            {product.itemNo}
          </div>
          <ProductRate
            reviews={product.reviews}
            productID={product._id}
            itemNo={product.itemNo}
          />
          <FavoriteBox>
            <FavoriteIcon product={product} showTooltip />
            <FavoriteText>Add to favorite!</FavoriteText>
          </FavoriteBox>
          <AboutProduct>
            <li>
              Brand:
              {' '}
              <b>{product.brand}</b>
            </li>
            <li>
              Color:
              {' '}
              <b>{product.color}</b>
            </li>
            {Object.entries(product.params).map(([key, value]) => (
              <li key={key}>
                {key}
                :
                {' '}
                <b>
                  {value}
                </b>
              </li>
            ))}
            <li>
              Description:
              {' '}
              <b>
                {product.description}
                .
              </b>
            </li>
          </AboutProduct>
          <CartGroup product={product} avilableQuantity={product.quantity} />
        </InformationBox>
      </PageContainer>
    </Container>
  )
}

export default ProductPage