import { useState } from 'react'
import DeployInfo from './components/DeployInfo.jsx'
import TodoFilter from './components/TodoFilter.jsx'
import TodoInput from './components/TodoInput.jsx'
import TodoList from './components/TodoList.jsx'
import { useTodos } from './hooks/useTodos.js'
import { FILTERS, filterTodos, remainingCount } from './lib/todos.js'
import './App.css'

function App() {
  const { todos, add, toggle, remove, clearCompleted } = useTodos()
  const [filter, setFilter] = useState(FILTERS.ALL)

  const visibleTodos = filterTodos(todos, filter)
  const remaining = remainingCount(todos)
  const completed = todos.length - remaining
  const percent = todos.length ? Math.round((completed / todos.length) * 100) : 0

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo List</h1>
        <p className="subtitle">CI/CD on Vercel</p>
      </header>

      <main className="todo-app">
        {todos.length > 0 && (
          <section className="progress" aria-label="Progress">
            <div className="progress-head">
              <span><strong>{completed}</strong> of {todos.length} done</span>
              <span>{percent}%</span>
            </div>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span style={{ width: `${percent}%` }} />
            </div>
          </section>
        )}

        <TodoInput onAdd={add} />
        <TodoList todos={visibleTodos} onToggle={toggle} onRemove={remove} />
        {todos.length > 0 && (
          <TodoFilter
            filter={filter}
            onChange={setFilter}
            remaining={remaining}
            onClearCompleted={clearCompleted}
          />
        )}
      </main>

      <DeployInfo />
    </div>
  )
}

export default App
