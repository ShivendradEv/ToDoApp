import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router';

const Signup = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            // Update display name
            await updateProfile(user, { displayName: data.name });
            navigate("/login");
        } catch (error) {
            setError(error.message);
            console.error("Error on signup:", error);
        }
    };

    return (
        <div className='container lg-container'>
            <form className='signup login' onSubmit={handleSubmit(onSubmit)}>
                {error && <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>}
                <div className='login-head'>
                    <img src='/assets/login-icon.png' alt='login icon' />
                    <h1>Register</h1>
                </div>
                <div className='form-group'>
                    <input type='text' className='form-control' placeholder='Enter your name' {...register("name", { required: true })} />
                    {errors.name && <span>This field is required</span>}
                </div>
                <div className='form-group'>
                    <input type='text' className='form-control' placeholder='Enter your email' {...register("email", { required: true })} />
                    {errors.email && <span>This field is required</span>}
                </div>
                <div className='form-group'>
                    <input type='password' className='form-control' placeholder='Enter your password' {...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>}
                </div>
                <input type="submit" value="Signup" />
                <p>Already have an account <NavLink to="/login">Login</NavLink></p>
            </form>
        </div>
    )
}

export default Signup
