import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './Auth.css'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth'

const Auth = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isSignup, setIsSignup] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSwitch = () => {
        setIsSignup(!isSignup)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(isSignup){
            if(!name){
                alert("Please enter username!")
            }
            else if(!email){
                alert('Please enter email!')
            }
            else if(!password){
                alert("Please enter password!")
            }
            else dispatch(signup({ name, email, password }, navigate))
        }
        else{
            if(!email){
                alert('Please enter email!')
            }
            else if(!password){
                alert("Please enter password!")
            }
            else dispatch(login({ email, password }, navigate))
        }
    }

    return (
        <section class='auth-section'>
            { isSignup && <AboutAuth />}
            <div class='auth-container-2'>
                <img src={icon} alt='stack overflow' className='iitg-logo'/>
                <form onSubmit={handleSubmit}>
                    {
                        isSignup && (
                            <label htmlFor='name'>
                                <h4>Username</h4>
                                <input type="text" id='name' name='name' onChange={(e) => {setName(e.target.value)}} />
                            </label>
                        )
                    }
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input type="email" name='email' id='email' onChange={(e) => {setEmail(e.target.value)}} />
                    </label>
                    <label htmlFor="password">
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <h4>Password</h4>
                        </div>
                        <input type="password" name='password' id='password' onChange={(e) => {setPassword(e.target.value)}} />
                    </label>

                    <button type='submit' className='auth-btn'>{ isSignup ? 'Sign up': 'Log in'}</button>

                </form>
                <p>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                    <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{ isSignup ? "Log in" : 'sign up'}</button>
                </p>
            </div>
        </section>
    )
}

export default Auth
