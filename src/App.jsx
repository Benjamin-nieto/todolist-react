import React, { useState, useRef, useEffect } from 'react';
import { TodoList } from './components/TodoList.jsx';
import { v4 as uuidv4 } from 'uuid';

const key = 'todoApp.todos';

export function App() {

    const [todos, setTodos] = useState([
        //{ id: null, task: null, completed: false },
    ]);

    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(key));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(todos))
    }, [todos]);


    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    };


    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;

        if (task === '') {
            return;
        } else {
            setTodos((prevTodos) => {
                return [...prevTodos, { id: uuidv4(), task, completed: false }]
            });
        }

        todoTaskRef.current.value = null;

    };

    const handleTodoDelete = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleTodoAdd();
        }
    }

    return (
        <React.Fragment>
            <h1> To do List 💻</h1>
            <div>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            </div>
            <div id="elements">
            <input  ref={todoTaskRef} type="text" placeholder="Agregar tarea" onKeyPress={handleKeyPress}></input>
            <button onClick={handleTodoAdd}>➕</button>
            <button onClick={handleTodoDelete}>❌</button>
            </div>
            <div id="infoTask">Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar</div>
        </React.Fragment>
    );

}