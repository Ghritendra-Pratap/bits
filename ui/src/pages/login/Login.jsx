import React from 'react'
import './login.css'
import { useRef } from 'react'
import {loginCall} from "../../apiCalls"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import {CircularProgress} from "@material-ui/core"

const Login = () => {
    const email = useRef();
    const password = useRef();
    const {user,isFetching , dispatch} = useContext(AuthContext)

    console.log(user)
    const handleClick=(e)=>{
        e.preventDefault()
        loginCall({email:email.current.value ,password:password.current.value },dispatch)
    }
   
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">BItians</h3>
                    <span className="loginDesc">
                        Connect with Friends and the world around you on BItians
                    </span>
                </div>
                <div className="loginRight"  onSubmit = {handleClick} >
                    <form className="loginBox" >
                        <input type="Email" placeholder="Email" required  className="loginInput" ref={email} />
                        <input type="Password" placeholder="Password"  required className="loginInput" ref={password}/>
                        <button className="loginButton">{isFetching ? <CircularProgress color="primary"/> : "login"}</button>
                        <span className="forgotPassword">Forward Password?</span>
                        <button className="createNewAccount">{isFetching ? <CircularProgress /> : "Create New Account"}</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default Login
