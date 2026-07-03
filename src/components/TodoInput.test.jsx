import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import TodoInput from './TodoInput.jsx'

describe('TodoInput', () => {
  it('calls onAdd with text and clears input on submit', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()

    render(<TodoInput onAdd={onAdd} />)

    const input = screen.getByLabelText('New todo')
    await user.type(input, 'Write tests')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(onAdd).toHaveBeenCalledWith('Write tests')
    expect(input).toHaveValue('')
  })

  it('does not submit empty text', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()

    render(<TodoInput onAdd={onAdd} />)

    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(onAdd).not.toHaveBeenCalled()
  })
})
