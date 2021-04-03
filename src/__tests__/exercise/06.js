// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: -11,
      longitude: -22,
    },
  }

  let setHookValue
  useCurrentPosition.mockImplementation(() => {
    const [state, setState] = React.useState([])
    setHookValue = setState
    return state
  })

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setHookValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

test('displays the error when current location is not found', async () => {
  let setHookValue
  useCurrentPosition.mockImplementation(() => {
    const [state, setState] = React.useState([])
    setHookValue = setState
    return state
  })

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  const errorMessage = 'Error fetching the coordinates'
  act(() => {
    setHookValue([undefined, {message: errorMessage}])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"Error fetching the coordinates"`,
  )
})
