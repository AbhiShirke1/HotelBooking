import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../../UserContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext)

    const handleLoginSubmit=async(e)=>{
        e.preventDefault();

        try {
            const userInfo = await axios.post('/login', {email, password})
            setUser(userInfo.data)
            alert('Login successfull')
            setRedirect(true)
        } catch (error) {
            alert('Login Failed')
        }

    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-32'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-lg mx-auto' onSubmit={handleLoginSubmit}>

                    <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    <input type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>

                    <button className='primary'>Login</button>

                    <div className='text-center py-2 text-gray-500'>
                        Don't have an account yet? <Link className='text-black' to='/register'>Register</Link>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default LoginPage
