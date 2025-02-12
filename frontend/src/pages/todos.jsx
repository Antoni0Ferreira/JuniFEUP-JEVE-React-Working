import React, { useEffect, useState } from 'react';
import axios from '@/config/axios'; // Import axios instance for API calls
import TodoList from '@/components/todoList'; // Import TodoList component

// Todos functional component
export default function Todos() {
  const [todos, setTodos] = useState([]); // State to store todos

  // Function to fetch todos from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos'); // API call to get todos
      setTodos(response.data); // Update state with fetched todos
    } catch (error) {
      console.error(error); // Log errors to the console
    }
  };

  // Function to create a new todo
  const createTodo = async (title) => {
    try {
      const response = await axios.post('/api/todos', { title }); // API call to create a new todo
      const newTodo = response.data; // Get the newly created todo from response
      setTodos([...todos, newTodo]); // Update state with new todo
    } catch (error) {
      console.error(error); // Log errors to the console
    }
  };

  // Handle form submission for creating a new todo
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const title = event.target.title.value; // Get the title from the form input
    createTodo(title); // Create a new todo
    event.target.reset(); // Reset the form fields
  }

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []); // Empty dependency array means this effect runs once on mount
  
  // Render the Todos component
  return (
    <div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Todo List</h5>
      <form className="mb-2" onSubmit={handleFormSubmit}>
        <div className='flex justify-between'>
          <input type="text" name="title" className='border border-gray-400 mr-2 p-0.5 flex-grow rounded-md'/>
          <button type="submit" className='rounded-md bg-blue-500 py-1 px-2 text-white'>Add</button>
        </div>
      </form>
      <TodoList todoList={todos} setTodos={setTodos}/> {/* Render TodoList component */}
    </div>
  );
};