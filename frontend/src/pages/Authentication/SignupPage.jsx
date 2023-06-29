import React from 'react'
import loginImage from '../../assets/img/login-img.png'
import { Link } from 'react-router-dom'

const styles = {
    backgroundInputField : {
        backgroundColor: '#F2DCA1',
    },
    backgroundButton : {
        backgroundColor: '#E9C462',
        opacity: '0.8'
    },
    textColor : {
        color: '#E9C462'
    }
}

function SignupPage() {
  return (
    <div className='grid grid-cols-3'>
        <div className='col-span-2 text-center mt-10'>
            <div>
                <h1 className='uppercase font-bold text-5xl'>welcome to parklio</h1>
                <form className='mt-10'>
                    <div>
                        <input type = "text" placeholder = "Full Name" required style = {styles.backgroundInputField} className='font-bold p-2 text-black rounded-xl'/>
                    </div>
                    <div className='mt-10'>
                        <input type = "text" placeholder = "Email" required style = {styles.backgroundInputField} className='font-bold p-2 text-black rounded-xl'/>
                    </div>
                    <div className='mt-10'>
                        <input type = "password" placeholder = "Password" required style = {styles.backgroundInputField} className='font-bold p-2 text-black rounded-xl'/>
                    </div>
                    <div className='mt-10'>
                        <input type = "password" placeholder = "Confirm Password" required style = {styles.backgroundInputField} className='font-bold p-2 text-black rounded-xl'/>
                    </div>
                    <div className='mt-10'>
                        <button type = "submit" style={styles.backgroundButton} className='font-bold text-2xl p-2 rounded-xl hover:bg-ye'>SIGN UP</button>
                    </div>
                </form>
                <div className='mt-5'>
                    <h2>Already had your account?</h2>
                    <Link to = '/'><h2 style={styles.textColor} className='font-bold'>Log in</h2></Link>
                </div>
            </div>
        </div>
        <div className=''>
            <img src = {loginImage} alt = "Login" className=''/>
        </div>
    </div>
  )
}

export default SignupPage