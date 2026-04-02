import { render, screen } from '@testing-library/react'
// import { userEvent } from '@testing-library/user-event'
import { expect, test } from 'vitest'
import RouteLink from './RouteLink'

test('renders RouteLink component', () => {
    render(<RouteLink text="Home" href="/" />)
    const linkElement = screen.getByText(/Home/i)
    expect(linkElement).toBeTruthy()
})