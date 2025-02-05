import React, { useState, useEffect, useRef, useContext } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import { db } from "../firebase";
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import SingleTodo from './SingleTodo';
import AuthContext from '../context/AuthContext';
import { NavLink } from 'react-router';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const inputRef = useRef();

    const { user, setUser } = useContext(AuthContext);

    // Fetch todos only when user is logged in
    useEffect(() => {
        if (!user) return;

        const store = query(collection(db, "Todo", user.uid, "userTodos"));
        const unsubscribe = onSnapshot(store, (querySnapshot) => {
            let todoArr = [];
            querySnapshot.forEach((doc) => {
                todoArr.push({ ...doc.data(), id: doc.id });
            });
            setTodos(todoArr);
        });

        return () => unsubscribe();
    }, [user]);

    // Update todo
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, "Todo", user.uid, "userTodos", todo.id), {
            completed: !todo.completed
        });
    };

    // Create todo
    const createTodo = async (e) => {
        e.preventDefault();
        if (input === "") {
            alert("Enter valid todo");
            return;
        }
        await addDoc(collection(db, "Todo", user.uid, "userTodos"), {
            title: input,
            completed: false,
        });
        setInput("");
    };

    // Delete todo
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, "Todo", user.uid, "userTodos", id));
    };

    const handleCreateTodo = (e) => {
        e.preventDefault();
        inputRef.current.focus();
        inputRef.current.scrollIntoView();
    }

    if (!user) {
        return (
            <div className='container'>
                <h1>Welcome to Your Todo List!</h1>
                <p>Stay organized and keep track of your daily tasks effortlessly. <NavLink to={"/login"}>Login</NavLink > to access your personalized to-do list, manage your tasks, and stay productive.</p>
                <p><b>Please <NavLink to={"/login"}>Login</NavLink > to view your todos and start checking off your tasks today!</b></p>
            </div>
        );
    }

    return (
        <>
            <div className='hero'>
                <div className='hero-text'>
                    <h2>Stay Organized. <br /> Get Things Done.</h2>
                    <p>A simple and powerful way to manage your tasks and boost productivity. Turn your ideas into action. Plan, track, and achieve your goals.</p>
                    <a href='#' className='btn' onClick={(e) => handleCreateTodo(e)}>Create todo</a>
                </div>
                <div className='hero-image'>
                    <img src='/assets/banner.png' alt='hero banner image' />
                </div>
            </div>
            <div className='container'>
                <div className='todos'>
                    <h1 className='heading'>Create ToDo</h1>
                    <form className='todo-input' onSubmit={createTodo}>
                        <input type='text' placeholder='Create todo' value={input} onChange={(e) => setInput(e.target.value)} ref={inputRef} />
                        <button type='submit'><IoMdAddCircle /></button>
                    </form>
                    <div className='todo-list'>
                        <SingleTodo todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
                        <p>You have {todos.length} todos</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;
