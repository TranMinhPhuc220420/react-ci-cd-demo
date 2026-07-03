export default function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Toggle ${todo.text}`}
        />
        <span>{todo.text}</span>
      </label>
      <button
        type="button"
        className="remove-btn"
        onClick={() => onRemove(todo.id)}
        aria-label={`Remove ${todo.text}`}
      >
        ×
      </button>
    </li>
  )
}
