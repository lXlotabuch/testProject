import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Carousel from './Carousel'

describe('All tests for Carousel', () => {
  test('render test with childrens & props', () => {
    render(
      <Carousel carouselSettings={{ dots: false }}>
        <div>Some tag</div>
        <div>Some tag</div>
        <div>Some tag</div>
      </Carousel>
    )
  })

  test('check is chilrens found', () => {
    const { getAllByText } = render(
      <Carousel carouselSettings={{ dots: false }}>
        <div>Some children</div>
        <div>Some children</div>
        <div>Some children</div>
      </Carousel>
    )
    expect(getAllByText('Some children')).toBeDefined()
    expect(getAllByText('Some children')).toBeTruthy()
  })
})