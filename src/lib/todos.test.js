import { describe, expect, it } from 'vitest'
import {
  FILTERS,
  addTodo,
  clearCompleted,
  createTodo,
  filterTodos,
  remainingCount,
  removeTodo,
  toggleTodo,
} from './todos.js'

describe('createTodo', () => {
  it('returns null for empty text', () => {
    expect(createTodo('')).toBeNull()
    expect(createTodo('   ')).toBeNull()
  })

  it('creates a todo with trimmed text', () => {
    const todo = createTodo('  Buy milk  ')
    expect(todo).toMatchObject({
      text: 'Buy milk',
      completed: false,
    })
    expect(todo.id).toBeTruthy()
    expect(todo.createdAt).toBeTypeOf('number')
  })
})

describe('addTodo', () => {
  it('adds a new todo to the list', () => {
    const result = addTodo([], 'Learn Vite')
    expect(result).toHaveLength(1)
    expect(result[0].text).toBe('Learn Vite')
  })

  it('does not add empty todos', () => {
    expect(addTodo([], '  ')).toEqual([])
  })
})

describe('toggleTodo', () => {
  it('toggles completed state', () => {
    const todos = [{ id: '1', text: 'Task', completed: false }]
    const toggled = toggleTodo(todos, '1')
    expect(toggled[0].completed).toBe(true)
    expect(toggleTodo(toggled, '1')[0].completed).toBe(false)
  })

  it('does not mutate original array', () => {
    const todos = [{ id: '1', text: 'Task', completed: false }]
    toggleTodo(todos, '1')
    expect(todos[0].completed).toBe(false)
  })
})

describe('removeTodo', () => {
  it('removes todo by id', () => {
    const todos = [
      { id: '1', text: 'A', completed: false },
      { id: '2', text: 'B', completed: false },
    ]
    expect(removeTodo(todos, '1')).toHaveLength(1)
    expect(removeTodo(todos, '1')[0].id).toBe('2')
  })
})

describe('clearCompleted', () => {
  it('removes completed todos', () => {
    const todos = [
      { id: '1', text: 'A', completed: true },
      { id: '2', text: 'B', completed: false },
    ]
    expect(clearCompleted(todos)).toEqual([
      { id: '2', text: 'B', completed: false },
    ])
  })
})

describe('filterTodos', () => {
  const todos = [
    { id: '1', text: 'A', completed: false },
    { id: '2', text: 'B', completed: true },
  ]

  it('returns all todos', () => {
    expect(filterTodos(todos, FILTERS.ALL)).toHaveLength(2)
  })

  it('returns active todos', () => {
    expect(filterTodos(todos, FILTERS.ACTIVE)).toHaveLength(1)
    expect(filterTodos(todos, FILTERS.ACTIVE)[0].id).toBe('1')
  })

  it('returns completed todos', () => {
    expect(filterTodos(todos, FILTERS.COMPLETED)).toHaveLength(1)
    expect(filterTodos(todos, FILTERS.COMPLETED)[0].id).toBe('2')
  })
})

describe('remainingCount', () => {
  it('counts incomplete todos', () => {
    const todos = [
      { id: '1', text: 'A', completed: false },
      { id: '2', text: 'B', completed: true },
      { id: '3', text: 'C', completed: false },
    ]
    expect(remainingCount(todos)).toBe(2)
  })
})
