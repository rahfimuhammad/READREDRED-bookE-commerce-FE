import React, { useState } from 'react'
import { useUser } from '../../../context/UserProvider'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../loading/Spinner';
import { ToastContainer } from 'react-toastify';
import { ModalContent, 
         Title, 
         Form, 
         Input, 
         ButtonAction} from '../../../styles'

const ResetPasswordForm = ({handleReset}) => {

  const { token } = useUser()
  const [curretPassword, setCurrentPassword] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const data = {
    curretPassword: curretPassword,
    password: password,
    confirmPassword: confirmPassword
  }

  const submitChanges = async () => {

    try {
      setLoading(true)
      let response = await axios.patch(`http://localhost:2000/users/${token}`, data)
      console.log(response?.data?.message)
      setLoading(false)

    } catch (error) {
      console.log(error)
    }
    handleReset()
  }

  return (
    <ModalContent className='reset-container'>
        <Title><p>Reset Password</p><hr/></Title>
        <Form>
            <Input type="password" placeholder='current password' onChange={(e) => setCurrentPassword(e.target.value)}/>
            <Input type="password" placeholder='new password' onChange={(e) => setPassword(e.target.value)}/>
            <Input type="password" placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)}/>
            <ButtonAction onClick={submitChanges}>
              {loading? <Spinner size={20} /> 
              : "Save Changes"}
            </ButtonAction>
        </Form>
    </ModalContent>
  )
}

export default ResetPasswordForm