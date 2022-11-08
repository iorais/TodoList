import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import "./App.css";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }
    
    useEffect(() => {
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if(storedTodos) setTodos(prevTodos => [...prevTodos, ...storedTodos])
    }, [])

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

    function handleClearTodos() {
      const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
    }

    function handleDeleteTodos() {
      const newTodos = []
      setTodos(newTodos)
    }

    return ( 
        <div>
            <Header />
            <div className="display">

              <div className="leftCol">
                <TodoList todos={todos} toggleTodo={toggleTodo}/>
              </div>

              <div className="rightCol">
                
                <div className="userInputs">
                  <input ref={todoNameRef} type="text" />
                  <button className="add" onClick={handleAddTodo}>Add</button>
                  <button className="clear" onClick={handleClearTodos}>Clear</button>
                  <button className="delete" onClick={handleDeleteTodos}>Delete</button>
                </div>

                <h2> {todos.filter(todo => !todo.complete).length} Left</h2>
              </div>

            </div>
        </div>  
    )
}

export default App;