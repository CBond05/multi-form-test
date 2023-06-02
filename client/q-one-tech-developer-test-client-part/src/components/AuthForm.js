// форматирование!
import React from 'react';
import { useLogin } from "../hooks/useLogin"
import { useAuthContext } from '../hooks/useAuthContext'

const AuthForm = ({nextStep, setUsername, setPassword, username, password}) => {
    const {login, error, isLoading} = useLogin();
    const { user } = useAuthContext()
    const handleAuthSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
        if(user) {
            nextStep();
        }  
    }
    return (
        <div className='main'>
        <div className='wizzard'>
            <div className='wizzard-step-1'>
                <p className='wizzard-step-active-1'>Step 1</p>
                <p className='wizzard-step-active-2'>Log in User</p>
            </div> 
            <div className='wizzard-step-2'>
                <p className='wizzard-step-not-active-1'>Step 2</p>
                <p className='wizzard-step-not-active-2'>Add item</p>
            </div> 
            <div className='wizzard-step-3'>
                <p className='wizzard-step-not-active-1'>Step 3</p>
                <p className='wizzard-step-not-active-2'>Preview item</p>
            </div>
            <div className='wizzard-step-4'>
                <p className='wizzard-step-not-active-1'>Step 4</p>
                <p className='wizzard-step-not-active-2'>Edit item</p>
            </div>
        </div>
        <div className='auth-form'>
            <div className='auth-container'>
                <div className='group-input-wrapper-1'>
                    <label className='lbl'>Enter User Name</label>
                    <input 
                    type="username" 
                    name="username" 
                    placeholder="Enter User Name" 
                    className={'input ' + (error ? 'input-error' : '')}
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username}/>
                </div>
                <div className='group-input-wrapper-2'>
                    <label className='lbl'>Password</label>
                    <input 
                    type="text" 
                    name="password" 
                    placeholder="Enter Password" 
                    className={'input ' + (error ? 'input-error' : '')}
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} />
                </div>
                <div className='footer'>
                <button 
                    disabled={isLoading} 
                    onClick={handleAuthSubmit} 
                    className='next-step-button'
                    >
                    Log In
                </button>
                </div>           
            </div>
        </div>
        </div> 
    ) 
}
  
  export default AuthForm;
