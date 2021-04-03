// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  let submittedData
  const handleOnSubmit = data => (submittedData = data)
  render(<Login onSubmit={handleOnSubmit} />)

  const username = 'user name'
  userEvent.type(screen.getByLabelText(/username/i), username)

  const password = '123456789'
  userEvent.type(screen.getByLabelText(/password/i), password)

  userEvent.click(screen.getByRole('button'))

  expect(submittedData).toEqual({password, username})
})
