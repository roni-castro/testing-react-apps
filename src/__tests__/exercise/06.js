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

  let setPositionState
  useCurrentPosition.mockImplementation(() => {
    const [state, setState] = React.useState([])
    setPositionState = setState
    return state
  })

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setPositionState([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})
