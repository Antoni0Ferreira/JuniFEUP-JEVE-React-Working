import React from 'react';
import TodoItem from './todoItem';

// TodoList functional component definition
// Props:
// - todoList: Array of todo items to be displayed
// - setTodos: Function to update the list of todos in the parent component
export default function TodoList({ todoList, setTodos }) {
  // Render the TodoList component
  // Maps over the todoList array and renders a TodoItem component for each todo item
  // Passes each todo item and the setTodos function as props to the TodoItem component
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      {todoList.map((todo, index) => (
        // Render TodoItem for each todo in the todoList
        // Key is set to index for lack of a unique identifier
        <TodoItem key={index} todo={todo} setTodos={setTodos} />
      ))}
    </div>
  )
}