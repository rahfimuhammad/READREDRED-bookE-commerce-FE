import React from 'react'
import Banner from "../../assets/banner.png"
import { useDeleteData } from '../../hooks/useDelete.js';
import { useUser } from "../../context/UserProvider.js";
import { useGetProducts } from "../../hooks/useFetch.js"
import { useNavigate } from 'react-router-dom'
import "./userComponent.css"
import Profile from "../../assets/profile.png"
import UserInfo from './Fragment/UserInfo.jsx';
import TopProducts from './Fragment/TopProducts.jsx';
import { SignOut,
         CalendarCheck } from 'phosphor-react'
import { ButtonProfile } from '../../styles.js';

const ProfilePage = ({ setEditProfile, setPassReset }) => {

    const {token, deleteSession} = useUser()
    const {deleteData} = useDeleteData()
    const navigate = useNavigate()
    const user = useGetProducts(`http://localhost:2000/users/${token}`)
    const data = user?.data

    const handleLogOut = async () => {
        
        await deleteData('http://localhost:2000/logout')
        deleteSession()
        navigate('/')
    }

  return (
        <div className='profile'>
            <div className="profile-wrapper">
                <div className='profile-header'>
                    <h3 style={{color: "white", margin: "0"}} className='profile-title'>Profile</h3>
                    <div style={{display: "flex", gap: "5px", alignItems: "center", cursor: "pointer"}} onClick={handleLogOut}>
                        <p style={{margin: "0", color: "white"}}>logout</p>
                        <SignOut size={32} color='white'/>
                    </div>
                </div>
                <img src={Banner} style={{width: "100%", height: "auto", backgroundColor: "#1d1e23"}}/>
                <div className="bio-container">
                    <div className="profile-pict-and-button">
                        <img src={Profile} style={{borderRadius: "50%"}}/>
                        <div className="button-profile-container">
                            <ButtonProfile onClick={() => setEditProfile(prevState => !prevState)}>
                                Reset Profile
                            </ButtonProfile>
                            <ButtonProfile onClick={() => setPassReset(prevState => !prevState)}>
                                Reset Password
                            </ButtonProfile>
                        </div>
                    </div>
                    <div className="bio-wrapper">
                        <div id='bio'><p style={{fontWeight: "bold"}} className='profile-data'>{data?.username}</p></div>
                        <div id='bio'><p style={{fontWeight: "300"}} className='profile-data'>{data?.email}</p></div>
                        <div id='bio'><p style={{fontWeight: "300"}} className='profile-data'>{data?.phone}</p></div>
                        <div id='bio'><p style={{fontWeight: "300"}} className='profile-data'>{data?.address}</p></div>
                        <div style={{marginTop: "15px"}} id="bio"><CalendarCheck size={20} /><p>Joined Feb 22, 2024</p></div>
                    </div>
                </div>
            </div>
            <div className='block'>
                <TopProducts/>
            </div>
            <UserInfo data={data}/>
        </div>
  )
}

export default ProfilePage