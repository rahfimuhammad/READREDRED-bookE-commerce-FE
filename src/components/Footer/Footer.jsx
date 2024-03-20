import React from 'react'
import { Link } from 'react-router-dom'
import AppStore from "../../assets/appStore.svg"
import { InstagramLogo, 
         TwitterLogo, 
         YoutubeLogo } from 'phosphor-react'
import styled from 'styled-components'

const Footer = () => {

    const Box = styled.div`
        width: calc(100% - 30vw);
        height: fit-content;
        padding: 25px 15vw 50px 15vw;
        display: flex;
        justify-content: space-between;
        background-color: #1d1e23;
        margin-top: 219px;

        @media (max-width: 1198px) {
            width: calc(100% - 5vw);
            padding: 25px 2.5vw ;}
        
        @media (max-width: 600px) {
            width: calc(100% - 10vw);
            flex-direction: column;
            gap: 30px;
            align-items: flex-start;
            padding: 25px 5vw ;}`;

    const BoxContent = styled.div`
        display: flex;
        flex-direction: column;
        max-width: 25%;
        gap: 5px;
        
        @media (max-width: 600px) {
            max-width: 100%;}`;

    const LogoSocial = styled.div`
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1.5px solid #313873;
        display: flex;
        align-items: center;
        justify-content: center`;
    
    const Image = styled.img`
        width: 200px;
        height: auto;
        max-width: 20vw;
        cursor: pointer;
        
        @media (max-width: 600px) {
            max-width: 40vw;
        }`

  return (
    <Box>
        <BoxContent>
            <h3 style={{color: "#313873", margin: "0"}}>Book Store</h3>
            <p>2024 Book Store. All Rights Reserved</p>
            <div style={{padding: "20px 0 0 0", display: "flex", gap: "10px"}}>
                <LogoSocial>
                    <YoutubeLogo color="#313873" size={27} />
                </LogoSocial>
                <LogoSocial>
                    <TwitterLogo color="#313873" size={27} />
                </LogoSocial>
                <LogoSocial>
                    <InstagramLogo color="#313873" size={27} />
                </LogoSocial>
            </div>
        </BoxContent>
        <BoxContent>
            <h3 style={{color: "#313873", margin: "0"}}>Company</h3>
            <Link>About Us</Link>
            <Link>Blog</Link>
            <Link>Contact Us</Link>
            <Link>Pricing</Link>
            <Link>Testimodials</Link>
        </BoxContent>
        <BoxContent>
            <h3 style={{color: "#313873", margin: "0"}}>Support</h3>
            <Link>Help Center</Link>
            <Link>Terms of Service</Link>
            <Link>Legal</Link>
            <Link>Privacy Policy</Link>
            <Link>Status</Link>
        </BoxContent>
        <BoxContent>
            <h3 style={{color: "#313873", margin: "0"}}>Install App</h3>
            <Image src={AppStore} alt="appStore" />
        </BoxContent>
    </Box>
  )
}

export default Footer