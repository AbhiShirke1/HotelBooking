import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser=async(e)=>{
        e.preventDefault()
        try {
            await axios.post('/register/', {name, email, password})
    
            alert('Registration successfull')
        } catch (error) {
            alert('Registration failed')
        }
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-32'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-lg mx-auto' onSubmit={registerUser}>
                    <input type="text" placeholder='Name' 
                    value={name} onChange={(e)=> setName(e.target.value)}/>
                    <input type="email" placeholder='Email' 
                    value={email}  onChange={(e)=> setEmail(e.target.value)}/>
                    <input type="password" placeholder='Password' 
                    value={password}  onChange={(e)=> setPassword(e.target.value)}/>

                    <button className='primary'>Register</button>

                    <div className='text-center py-2 text-gray-500'>
                        Already registered <Link className='text-black' to='/login'>Login</Link>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default RegisterPage
