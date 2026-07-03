import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the todo app', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Todo List' })).toBeInTheDocument()
    expect(screen.getByText('CI/CD on Vercel')).toBeInTheDocument()
  })

  it('adds a todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('New todo'), 'Deploy to Vercel')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('Deploy to Vercel')).toBeInTheDocument()
  })

  it('toggles a todo as completed', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('New todo'), 'Run tests')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await user.click(screen.getByLabelText('Toggle Run tests'))

    expect(screen.getByText('Run tests').closest('li')).toHaveClass('completed')
  })

  it('removes a todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('New todo'), 'Temporary task')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await user.click(screen.getByLabelText('Remove Temporary task'))

    expect(screen.queryByText('Temporary task')).not.toBeInTheDocument()
  })
})
