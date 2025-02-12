const fs = require('fs');
const { parse } = require('path');
const {v4: uuidv4} = require('uuid');

//=========================================================================================================//

// Auxiliar function to parse the data from the JSON file
const parseData = () => { 
  // get the data from the JSON file
  const data = fs.readFileSync('./database/todos.json', 'utf8'); 
  
  // Parse the JSON string to an object
  return JSON.parse(data); 
}

// Auxiliar function to write the data to the JSON file
const writeData = (data) => { 
  // Write the data to the JSON file
  fs.writeFileSync('./database/todos.json', JSON.stringify(data)); 
}

//=========================================================================================================//

// Get all todos
const getTodos = async (req, res) => { 
  try {
    // Get the todos from the JSON file
    const todos = parseData(); 
    
    // Send the todos as a response
    res.status(200).json(todos) 
  } catch (error) {
    // If there is an error, send an error response
    res.status(500).json({ message: "There was an error fetching the todos." }) 
  }
}


// Create a new todo
const createTodo = async (req, res) => { 
  try {
    // Get the title from the request body
    const { title } = req.body; 

    // If there is no title
    if (!title) { 
      // Send a bad request response
      return res.status(400).json({ message: 'Title is required' }) 
    }
    

    // Get the todos from the JSON file
    const todos = parseData(); 

    // Create a new todo object
    const newTodo = { id: uuidv4(), title, done: false }; 
    
    // Add the new todo to the todos array
    todos.push(newTodo);
    
    // Write the new todos array to the JSON file
    writeData(todos); 
    
    // Send the new todo as a response
    res.status(200).json(newTodo); 
  } catch (error) {
    // If there is an error, send an error response
    res.status(500).json({ message: "There was an error creating a new todo item." }) 
  }
}


// Update a todo
const updateTodo = async (req, res) => { 
  try {
    // Get the id from the request parameters
    const { id } = req.params; 

    // Get the title and done from the request body
    const { title, done } = req.body; 

    // Get the todos from the JSON file
    const todos = parseData(); 

    // Find the todo with the id
    const todo = todos.find(todo => todo.id === id); 

    // If there is no todo with the id
    if (!todo) { 
      // Send a not found response
      return res.status(404).json({ message: 'Todo not found' }) 
    }

    // The || (or operator) is used to update only the fields that are present in the request body
    // In the line "todo.title = title || todo.title" if the title is present in the request body, it will update the title of the todo, 
    // otherwise it will keep the current title
    todo.title = title || todo.title;
    
    todo.done = done;

    // Write the updated todos array to the JSON file
    writeData(todos); 
    
    // Send the updated todo as a response
    res.status(200).json(todo); 
  } catch (error) {
    // If there is an error, send an error
    res.status(500).json({ message: "There was an error updating the todo item." }) 

    // Its not recommended to send the error message (there may be sensitive data in the error message) to the client, instead send a custom message
    // res.status(500).json({ message: error.message })
  }
}


// Delete a todo
const deleteTodo = async (req, res) => { 
  try {
    // Get the id from the request parameters
    const { id } = req.params;

    // Get the todos from the JSON file
    const todos = parseData(); 

    // Find the index of the todo with the id
    const todoIndex = todos.findIndex(todo => todo.id === id); 

    // If there is no todo with the id
    if (todoIndex === -1) { 
      // Send a not found response
      return res.status(404).json({ message: 'Todo not found' }) 
    }

    // Remove the todo from the todos array
    todos.splice(todoIndex, 1); 
    
    // Write the updated todos array to the JSON file
    writeData(todos); 
    
    // Send a success response
    res.status(200).json({ message: 'Todo deleted' });
    
  } catch (error) {
    // If there is an error, send an error response
    res.status(500).json({ message: "There was an error deleting the todo item." })
  }
}


// Export the wanted functions, some functions can be omitted to prevent access to them
// For example the functions "parseData" and "writeData" can be omitted as they are not meant to be accessed from outside the controller 
module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
}