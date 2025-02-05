import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router';

const Login = () => {

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate("/");
        } catch (error) {
            setError(error.message);
            console.error("Error on login: ", error);
        }
    };

    return (
        <div className='container lg-container'>
            <form className='login' onSubmit={handleSubmit(onSubmit)}>
                <div className='login-head'>
                    <img src='/assets/login-icon.png' alt='login icon' />
                    <h1>Login</h1>
                </div>
                <div className='form-group'>
                    <input type='email' className='form-control' placeholder='Enter your email' {...register("email", { required: true })} />
                    {errors.email && <span>This field is required</span>}
                </div>
                <div className='form-group'>
                    <input type='password' className='form-control' placeholder='Enter your password' {...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>}
                </div>
                <input type="submit" value="Login" />
                <p>Not an existing user <NavLink to="/signup">Register</NavLink></p>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Login
