import React from 'react'
import ReactDOM from 'react-dom'
import {FavoriteNumber} from '../favorite-number'
import {queries, getQueriesForElement} from '@testing-library/dom'


test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  const {getByLabelText} = getQueriesForElement(div)
  const input = getByLabelText(/favorite number/i)
  // const input = queries.getByLabelText(div, /favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})