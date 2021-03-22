// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(<Counter />, div)
  const buttons = div.querySelectorAll('button')
  const decrementBtn = buttons[0]
  const incrementBtn = buttons[1]
  const messageDiv = div.firstChild.querySelector('div')

  expect(messageDiv.textContent).toBe('Current count: 0')
  incrementBtn.click()
  expect(messageDiv.textContent).toBe('Current count: 1')
  decrementBtn.click()
  expect(messageDiv.textContent).toBe('Current count: 0')

  div.remove()
})

/* eslint no-unused-vars:0 */
