import { useEffect, useState } from 'react'
import {
  addTodo,
  clearCompleted,
  removeTodo,
  toggleTodo,
} from '../lib/todos.js'

const STORAGE_KEY = 'todos:v1'

function readStoredTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState(readStoredTodos)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  return {
    todos,
    add: (text) => setTodos((current) => addTodo(current, text)),
    toggle: (id) => setTodos((current) => toggleTodo(current, id)),
    remove: (id) => setTodos((current) => removeTodo(current, id)),
    clearCompleted: () => setTodos((current) => clearCompleted(current)),
  }
}
