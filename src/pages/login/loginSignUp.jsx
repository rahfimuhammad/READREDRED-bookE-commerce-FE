import React, { useState } from 'react'
import { useUser } from '../../context/UserProvider'
import { usePostData } from '../../hooks/usePost';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import Logo from "../../assets/logo.png"
import { ButtonAction, 
         Input, 
         ModalContent, 
         Form, 
         MainContainer } from '../../styles';
import axios from 'axios';

const LoginSignUp = () => {

  const [logReg, setLogreg] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPasword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {saveUser, isLogin} = useUser()
  const navigate = useNavigate()
  const {postData} = usePostData()

  const createUser = {
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  }

  const userLogin = {
    email: email,
    password: password,
  }

const handleSignUp = async (e) => {
  e.preventDefault()
  
  await postData('http://localhost:2000/users', createUser)
  setLogreg(!logReg)
}

const handleLogin = async (e) => {
  e.preventDefault()

  try {
    let response = await axios.post('http://localhost:2000/login', userLogin)
    saveUser(response?.data?.role, response?.data?.id)
    isLogin()
    
    response?.data?.role === "admin"? navigate("/admin")
    :
    navigate("/")
  
  } catch (error) {
    
    console.log(error.message)
  }
}

  return (
    <>
    <Navbar/>
      <MainContainer style={{padding: "0", minHeight: "calc(100vh - 60px", justifyContent: "center"}}>
        <ModalContent style={{gap: "15px"}}>
          <img style={{height: "50px"}} src={Logo} alt="" />
          <Form>
            {logReg && <Input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />}
            <Input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder='password' value={password} onChange={(e) => setPasword(e.target.value)} />
            {logReg &&<Input type="password" placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />}
            {logReg? <ButtonAction className='button' onClick={handleSignUp}>Sign Up</ButtonAction> : <ButtonAction className='button' onClick={handleLogin}>Login</ButtonAction>}
          </Form>
          {logReg? <p>Already have an account? <b onClick={() => setLogreg(false)}>Login</b></p> :
          <p>Don't have an account? <b onClick={() => setLogreg(true)}>Sign Up</b></p>}
        </ModalContent>
      </MainContainer>
    </>
  )
}

export default LoginSignUp