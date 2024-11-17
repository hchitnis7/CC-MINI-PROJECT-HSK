import { useSliderStyles } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import "./Register.css";
import { auth, app } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
  
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate('');

    let btnStyle = {
        padding: "5px 10px",
        border: "2px solid white",
        borderRadius: "5px",
        backgroundColor: "#333"
    };

    const register = (e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                // const user = userCredential.user;
                console.log(userCredential);
                navigate('/login');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                alert(errorMessage);
                // ..
            });
    }
  return (
    <>
    <div className="container">
        <form onSubmit={register} className='flex'>
            <div className='title'>Register</div>
            <input type="text" name="uemail" id="email" placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/>
            <input type="password" name="upass" id="pass" placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} />
            <input type="submit" value="Register" style={btnStyle}/>
        </form>
        <div className="sign">Already have an account? <Link to="/login">Login</Link></div>
    </div>
    </>
  )
}

export default Register
