import React, { useState } from 'react'
import { useUser } from '../../../context/UserProvider'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../loading/Spinner';
import { toast, Bounce } from 'react-toastify';
import { ModalContent, 
         Title, 
         Form, 
         Input, 
         ButtonAction} from '../../../styles'

const ResetProfileForm = ({handleReset}) => {

  const { user, token, refetchUser } = useUser()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const [address, setAddress] = useState(user.address)
  const notify = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });

  const data = {
    username: username,
    email: email,
    phone: phone,
    address: address,
    password: "",
    confirmPassword: ""
  }

  const submitChanges = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      let response = await axios.patch(`http://localhost:2000/users/${token}`, data)
      refetchUser()
      setLoading(false)
    
    } catch (error) {
      console.log(error)
    }
    
    handleReset()
  }

  return (
    <>
    <ModalContent className="reset-container">
        <Title><p>Edit Profile</p><hr/></Title>
        <Form>
          <Input type="text" placeholder={user.username} value={username} onChange={(e) => setUsername(e.target.value)}/>
          <Input type="email" placeholder={user.email} value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input type="text" placeholder={user.phone} value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input type="textarea" placeholder={user.address} value={address} onChange={(e) => setAddress(e.target.value)} />
          <ButtonAction onClick={(e) => submitChanges(e)} className='button'>
            {loading? <Spinner size={20}/>
            : "Save Changes"}
          </ButtonAction>
        </Form>
    </ModalContent>
    </>
  )
}

export default ResetProfileForm