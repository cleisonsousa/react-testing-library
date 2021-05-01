import React from 'react'
//import ReactDOM from 'react-dom'
import {FavoriteNumber} from '../favorite-number'
import {render, screen} from '@testing-library/react'
//import {getQueriesForElement} from '@testing-library/dom'

// function render(ui) {
//   const container = document.createElement('div')
//   ReactDOM.render(ui, container)
//   const queries = getQueriesForElement(container)
//   return {container, ...queries}
// }

test('renders a number input with a label "Favorite Number"', () => {
  // const {getByLabelText, debug} = render(<FavoriteNumber />)
  render(<FavoriteNumber />)
  // debug()
  // const input = getByLabelText(/favorite number/i)

  // This line is a trigger for FALSE POSITIVO whe UI is broken but the TEST continue works.
  // expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
  const input = screen.getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
  // debug(input)
})