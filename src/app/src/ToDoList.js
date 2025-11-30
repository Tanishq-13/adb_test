
export default function TodoList({ todos }) {
    if (todos.length === 0) return <p>No TODOs found</p>;
  
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.description}</li>
        ))}
      </ul>
    );
  }
  