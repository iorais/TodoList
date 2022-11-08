import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import "./App.css";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


const LOCAL_STORAGE_KEY = 'todoApp.todos'
const empty = []

function App() {
  const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.coomplete = !todo.complete
        setTodos(newTodos)
    }
    
    useEffect(() => {
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if(storedTodos) setTodos(storedTodos)
    }, [empty])

    useEffect (() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function handleAddTodo(e) {
        const name = todoNameRef.current.value
        
        if(name === '') return

        setTodos(prevTodos => {
            return[...prevTodos, {id: uuidv4(), name: name, complete: false}]
        })
        todoNameRef.current.value = null
    }

    return ( 
        <div>
            <Header />
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input ref={todoNameRef} type="text" />
            <button class="add" onClick={handleAddTodo}>Add To-do</button>
            <button class="clear">Clear Completed To-do's</button>
            <h2> {todos.length} Left</h2>
        </div>  
    )
}

export default App;