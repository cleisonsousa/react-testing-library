import React from 'react'
import {render, screen} from '@testing-library/react'
//import {reportError} from '../api'
import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from '../error-boundary'
import userEvent from '@testing-library/user-event'

jest.mock('../api')

// jest.mock('../api', () => ({
//     reportError: jest.fn(() => ({success: true}))
// }))

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
  console.error('hi')
})

afterEach(() => {
  jest.clearAllMocks()
})

function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('💣')   
  } else {
    return null
  }
}

test('calls reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValue({success: true})
  const {rerender} = render(<ErrorBoundary><Bomb /></ErrorBoundary>)

  rerender(<ErrorBoundary><Bomb shouldThrow/></ErrorBoundary>)
  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)

  expect(console.error).toHaveBeenCalledTimes(2)

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(`"There was a problem."`)

  console.error.mockClear()
  mockReportError.mockClear()

  rerender(<ErrorBoundary><Bomb /></ErrorBoundary>)
  userEvent.click(screen.getByText(/try again/i))
  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  expect(screen.queryByText(/try again/i)).not.toBeInTheDocument()
})