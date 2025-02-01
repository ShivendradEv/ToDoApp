import React, { useState, useEffect } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import { db } from "../firebase";
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import SingleTodo from './SingleTodo';

const Todo = () => {

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    //Fetch todos
    useEffect(() => {
        const store = query(collection(db, "Todo"));
        const unsubscribe = onSnapshot(store, (querySnapshot) => {
            let todoArr = [];
            querySnapshot.forEach((doc) => {
                todoArr.push({ ...doc.data(), id: doc.id });
            })
            setTodos(todoArr);
        });
        return () => unsubscribe();
    }, []);

    // Update todo
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, "Todo", todo.id), {
            completed: !todo.completed
        })
    }

    //Create todo
    const createTodo = async (e) => {
        e.preventDefault();
        if (input === "") {
            alert("Enter valid todo");
            return;
        }
        await addDoc(collection(db, "Todo"), {
            title: input,
            completed: false,
        })
        setInput("");
    }

    //Delete todo
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, "Todo", id));
    }

    return (
        <div className='todos'>
            <h1 className='heading'>Create ToDo</h1>
            <form className='todo-input' onSubmit={(e) => createTodo(e)}>
                <input type='text' placeholder='Create todo' value={input} onChange={(e) => setInput(e.target.value)} />
                <button type='button' onClick={(e) => createTodo(e)}><IoMdAddCircle /></button>
            </form>
            <div className='todo-list'>
                <SingleTodo todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
                <p>You have {todos.length} todos</p>
            </div>
        </div>
    )
}

export default Todo
