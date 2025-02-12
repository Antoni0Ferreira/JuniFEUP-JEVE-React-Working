import axios from '@/config/axios';
import { TrashIcon } from '@radix-ui/react-icons';

// TodoItem functional component definition
// Props:
// - todo: Object representing a single todo item
// - setTodos: Function to update the list of todos in the parent component
export default function TodoItem({ todo, setTodos }) {

  // handleDelete function to delete a todo item
  // Makes an API call to delete the todo item based on its id
  const handleDelete = async () => {
    try {
      // Logging todo and todo.id for debugging purposes
      console.log(todo);
      console.log(todo.id);
      // API call to delete the todo item
      await axios.delete(`/api/todos/${todo.id}`);
      // Update the todos state in the parent component
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    } catch (error) {
      // Log any errors to the console
      console.error(error);
    }
  }

  // toggleDone function to toggle the completion status of a todo item
  // Makes an API call to update the 'done' status of the todo item
  const toggleDone = async () => {
    try {
      // API call to update the 'done' status of the todo item
      await axios.put(`/api/todos/${todo.id}`, { done: !todo.done });
      // Update the todos state in the parent component
      setTodos((prev) => prev.map((t) => {
        if (t.id === todo.id) {
          return { ...t, done: !t.done };
        }
        return t;
      }));
    } catch (error) {
      console.error(error);
    }
  }

  // Render the TodoItem component
  return (
    <div className="flex justify-between items-center my-2 gap-2">
      <div className="flex items-center gap-1">
        <input type="checkbox" checked={todo.done} onChange={toggleDone} /> {/* Checkbox to toggle 'done' status */}
        <h3 className="text-base">{todo.title}</h3> {/* Display the todo item title */}
      </div>
      <div>
        <button className="bg-red-500 text-white p-1 rounded-md" onClick={handleDelete}>
          <TrashIcon /> {/* Delete button with TrashIcon */}
        </button>
      </div>
    </div>
  );
}