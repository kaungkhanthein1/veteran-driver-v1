import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from './LoginPage'

test('LoginPage renders without crashing', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  )
})
