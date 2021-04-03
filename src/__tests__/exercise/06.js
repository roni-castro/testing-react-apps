// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

beforeAll(() => {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})
test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: -11,
      longitude: -22,
    },
  }

  const {promise, resolve} = deferred()

  global.navigator.geolocation.getCurrentPosition.mockImplementation(
    successCallback => promise.then(() => successCallback(fakePosition)),
  )

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(async () => {
    resolve()
    await promise
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude: -11/i)).toBeInTheDocument()
  expect(screen.getByText(/longitude: -22/i)).toBeInTheDocument()
})
