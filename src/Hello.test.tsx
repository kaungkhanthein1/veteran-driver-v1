import { render, screen } from '@testing-library/react'

function Hello() {
  return <h1>Hello, Aung Kyaw Win! it's me</h1>
}

test('renders hello message', () => {
  render(<Hello />)
  expect(screen.getByText(/hello/i)).toBeInTheDocument()
})
