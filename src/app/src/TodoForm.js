
export default function TodoForm({ description, setDescription, onSubmit }) {
    return (
      <form onSubmit={onSubmit}>
        <label>ToDo: </label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add ToDo!</button>
      </form>
    );
  }
  