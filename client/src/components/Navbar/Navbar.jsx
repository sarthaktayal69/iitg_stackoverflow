import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'

const Navbar = () => {

    const dispatch = useDispatch()
    var User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate();
    
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT'});
        navigate('/')
        dispatch(setCurrentUser(null))
    }

    useEffect(() => {
        const token = User?.token 
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogout()
            }
        }
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile'))))
    },[User?.token, dispatch])

  return (
    <nav className='main-nav'>
        <div className="navbar">
            <Link to='/' className='nav-item nav-logo'>
                <img className='logo-icon' src={logo} alt="logo" />
            </Link>
            <Link to='/Questions' className='nav-item nav-btn'>Questions</Link>

            <a href="https://github.com/shawsk04/IITG-StackOverflow" className='nav-item nav-btn' rel="noreferrer" target='_blank'>Github</a>
            <a href="https://shawsk04.github.io/" className='nav-item nav-btn' rel="noreferrer" target='_blank'>About Developer</a>
            
            <div className='nav-profile-btn'>
                {User === null ? 
                    <Link to='/Auth' className='nav-item nav-links'>Log in</Link> : 
                    <>
                        <Avatar backgroundColor='#009dff' px="10px" py="5px" borderRadius="50%" color='white'><Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                        <button className='nav-item nav-links logout-btn' onClick={handleLogout}>Log out</button>
                    </>
                }
            </div>
            
        </div>
    </nav>
  )
}

export default Navbar   