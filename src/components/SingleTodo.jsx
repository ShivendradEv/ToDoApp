import React from 'react';
import { MdDeleteForever } from "react-icons/md";

const SingleTodo = ({ todos, toggleComplete, deleteTodo }) => {
    return (
        <>
            {todos?.map((item) => (
                <div className={`todo ${item.completed ? "completed" : ""}`} key={item.id}>
                    <input type='checkbox' checked={item.completed ? true : false} onChange={() => toggleComplete(item)} />
                    <h2>{item.title}</h2>
                    <button type='button' onClick={() => deleteTodo(item.id)}><MdDeleteForever /></button>
                </div>
            ))}
        </>
    );
}

export default SingleTodo;