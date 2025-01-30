import React, { useState, useEffect } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import { db } from "../firebase";
import { query, collection, onSnapshot } from 'firebase/firestore';
import SingleTodo from './SingleTodo';

const Todo = () => {

    const [todos, setTodos] = useState([]);

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

    return (
        <div className='todos'>
            <h1 className='heading'>Create ToDo</h1>
            <form className='todo-input'>
                <input type='text' placeholder='Create todo' />
                <button type='button'><IoMdAddCircle /></button>
            </form>
            <div className='todo-list'>
                <SingleTodo todos={todos} />
                <p>You have {todos.length} todos</p>
            </div>
        </div>
    )
}

export default Todo
