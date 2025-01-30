import React from 'react';
import { MdDeleteForever } from "react-icons/md";

const SingleTodo = ({ todos }) => {
    return (
        <>
            {todos?.map((item, index) => (
                <div className='todo' key={item.id}>
                    <input type='checkbox' />
                    <h2>{item.title}</h2>
                    <button type='button'><MdDeleteForever /></button>
                </div>
            ))}
        </>
    );
}

export default SingleTodo;