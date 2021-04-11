// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function TestComponent() {
  const {count, increment, decrement} = useCounter()
  return (
    <>
      <div>Counter: {count}</div>
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<TestComponent />)

  const counter = screen.getByText(/counter/i)
  expect(counter).toHaveTextContent('Counter: 0')

  const incrementButton = screen.getByRole('button', {name: /increment/i})
  userEvent.click(incrementButton)
  expect(counter).toHaveTextContent('Counter: 1')

  const decrementButton = screen.getByRole('button', {name: /decrement/i})
  userEvent.click(decrementButton)
  expect(counter).toHaveTextContent('Counter: 0')
})
