import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, app } from './firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate('');

    let btnStyle = {
        padding: "5px 10px",
        border: "2px solid white",
        borderRadius: "5px",
        backgroundColor: "#333"
    };

    const login = (e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                console.log(userCredential);
                navigate('/editor');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

  return (
    <>
    <div className="container">
        <form onSubmit={login} className='flex'>
            <div className='title'>Login</div>
            <input type="text" name="uemail" id="email" placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/>
            <input type="password" name="upass" id="pass" placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} />
            <input type="submit" value="Login" style={btnStyle}/>
        </form>
        <div className="sign">Don't have an account? <Link to="/">Register</Link></div>
    </div>
    </>
  )
}

export default Login
