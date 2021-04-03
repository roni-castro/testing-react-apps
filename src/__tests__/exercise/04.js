// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import {fake, build} from '@jackfranklin/test-data-bot'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', () => {
  const handleOnSubmit = jest.fn()
  render(<Login onSubmit={handleOnSubmit} />)

  const {username, password} = buildLoginForm()
  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)

  userEvent.click(screen.getByRole('button'))

  expect(handleOnSubmit).toHaveBeenCalledWith({password, username})
  expect(handleOnSubmit).toHaveBeenCalledTimes(1)
})
