import { useEffect, useState } from "react";
import TodoList from "./ToDoList";
import TodoForm from "./TodoForm";
import { getTodos, createTodo } from "./api";
import "./App.css";

export function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError("Failed to load todos");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      await createTodo(description);
      setDescription("");
      loadTodos();
    } catch (err) {
      setError("Failed to create todo");
    }
  };

  return (
    <div className="App">
      <h1>List of TODOs</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <TodoList todos={todos} />

      <h1>Create a ToDo</h1>
      <TodoForm
        description={description}
        setDescription={setDescription}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
