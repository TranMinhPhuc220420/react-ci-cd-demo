export const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

export function createTodo(text) {
  const trimmed = text.trim()
  if (!trimmed) return null

  return {
    id: crypto.randomUUID(),
    text: trimmed,
    completed: false,
    createdAt: Date.now(),
  }
}

export function addTodo(todos, text) {
  const todo = createTodo(text)
  if (!todo) return todos
  return [...todos, todo]
}

export function toggleTodo(todos, id) {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  )
}

export function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id)
}

export function clearCompleted(todos) {
  return todos.filter((todo) => !todo.completed)
}

export function filterTodos(todos, filter) {
  switch (filter) {
    case FILTERS.ACTIVE:
      return todos.filter((todo) => !todo.completed)
    case FILTERS.COMPLETED:
      return todos.filter((todo) => todo.completed)
    default:
      return todos
  }
}

export function remainingCount(todos) {
  return todos.filter((todo) => !todo.completed).length
}
