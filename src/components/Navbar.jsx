import React, { useContext } from 'react';
import { NavLink } from "react-router";
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

const Navbar = () => {

    const { user, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className='navbar'>
            <div className='navbar-brand'>
                <a href='/'><img src='/assets/todo-logo.png' alt='logo' /> Taskly</a>
            </div>
            <ul className='nav-items'>
                <li><NavLink to='/'>Home</NavLink></li>
                {!user &&
                    <>
                        <li><NavLink to='/login'>Login</NavLink></li>
                        <li><NavLink to='/signup'>Register</NavLink></li>
                    </>
                }
                {user && <li className='logout'><a onClick={(e) => handleLogout(e)}>Logout</a></li>}
            </ul>
        </div>
    )
}

export default Navbar
