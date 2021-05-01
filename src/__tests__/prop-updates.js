import React from 'react'
import {FavoriteNumber} from '../favorite-number'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'


test('entering an invalid value shows an error message', () => {
  const { rerender } = render(<FavoriteNumber />)
  const input = screen.getByLabelText(/favorite number/i)
  
  expect(input).toHaveAttribute('type', 'number')
  userEvent.type(input, '10')
  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  rerender(<FavoriteNumber max={10} />)
  expect(screen.queryByRole('alert')).toBeNull()
})