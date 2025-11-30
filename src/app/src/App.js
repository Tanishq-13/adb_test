import { useEffect, useState } from "react";
import "./App.css";

export function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:8000/todos/");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      const res = await fetch("http://localhost:8000/todos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      await res.json();
      setDescription("");
      fetchTodos();
    } catch (err) {
      console.error("POST error:", err);
    }
  };

  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        {todos.length === 0 ? (
          <p>No TODOs found</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>{todo.description}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h1>Create a ToDo</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "5px" }}>
            <button type="submit">Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
