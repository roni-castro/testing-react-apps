// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

const clickEvent = new MouseEvent('click', {
  bubbles: true,
  cancelable: true,
  view: window,
})

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(<Counter />, div)
  const [decrementBtn, incrementBtn] = document.body.querySelectorAll('button')
  const messageDiv = div.firstChild.querySelector('div')

  expect(messageDiv).toHaveTextContent('Current count: 0')
  incrementBtn.dispatchEvent(clickEvent)
  expect(messageDiv).toHaveTextContent('Current count: 1')
  decrementBtn.dispatchEvent(clickEvent)
  expect(messageDiv).toHaveTextContent('Current count: 0')
})

/* eslint no-unused-vars:0 */
