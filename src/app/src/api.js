
export const getTodos = async () => {
    const res = await fetch("http://localhost:8000/todos/");
    if (!res.ok) throw new Error("Failed to fetch todos");
    return res.json();
  };
  
  export const createTodo = async (description) => {
    const res = await fetch("http://localhost:8000/todos/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
  
    if (!res.ok) throw new Error("Failed to create todo");
  
    return res.json();
  };
  