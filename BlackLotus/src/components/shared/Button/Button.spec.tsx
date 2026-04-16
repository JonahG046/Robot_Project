import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import Button from './Button'

describe('Button component', () => {
  test('renders the provided text inside the button', () => {
    render(<Button text="Click me" />)

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
  })

  test('applies default styling classes when no custom props are provided', () => {
    render(<Button text="Default" />)

    const button = screen.getByRole('button', { name: 'Default' })
    expect(button).toHaveClass('primary-color')
    expect(button).toHaveClass('bg-brand')
    expect(button).toHaveClass('text-white')
  })

  test('includes the custom background class when provided', () => {
    render(<Button text="Custom" background="bg-slate-500" />)

    const button = screen.getByRole('button', { name: 'Custom' })
    expect(button).toHaveClass('bg-slate-500')
  })

  test('includes the custom text color class when provided', () => {
    render(<Button text="Colored" textColor="black" />)

    const button = screen.getByRole('button', { name: 'Colored' })
    expect(button).toHaveClass('text-black')
  })


  test('calls the callback once with the correct payload when clicked', async () => {
    const user = userEvent.setup()
    const callback = vi.fn()

    render(<Button text="Submit" callback={callback} />)

    const button = screen.getByRole('button', { name: 'Submit' })
    await user.click(button)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('button clicked')
  })

  test('does not throw when no callback prop is passed', async () => {
    const user = userEvent.setup()

    render(<Button text="No callback" />)

    const button = screen.getByRole('button', { name: 'No callback' })
    await expect(user.click(button)).resolves.toBeUndefined()
  })

  test('renders an empty button when text is an empty string', () => {
    render(<Button text="" />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('')
  })

  test('still renders and is clickable when only callback is supplied', async () => {
    const user = userEvent.setup()
    const callback = vi.fn()

    render(<Button callback={callback} text="Only callback" />)

    const button = screen.getByRole('button', { name: 'Only callback' })
    await user.click(button)

    expect(callback).toHaveBeenCalled()
  })
})

