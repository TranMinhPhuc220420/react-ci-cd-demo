import { FILTERS } from '../lib/todos.js'

const FILTER_OPTIONS = [
  { value: FILTERS.ALL, label: 'All' },
  { value: FILTERS.ACTIVE, label: 'Active' },
  { value: FILTERS.COMPLETED, label: 'Completed' },
]

export default function TodoFilter({ filter, onChange, remaining, onClearCompleted }) {
  return (
    <div className="todo-footer">
      <span className="remaining">{remaining} item{remaining !== 1 ? 's' : ''} left</span>
      <div className="filters" role="group" aria-label="Filter todos">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={filter === option.value ? 'active' : ''}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <button type="button" className="clear-btn" onClick={onClearCompleted}>
        Clear completed
      </button>
    </div>
  )
}
