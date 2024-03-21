import React, {useEffect} from 'react'
import { useUser } from '../../context/UserProvider'
import ErrorPage from "../error.jsx"
import Navbar from '../../components/Navbar/Navbar.jsx'
import WishlistList from "../../components/WishlistComponent/WishlistList.jsx"
import { MainContainer, 
         Title } from '../../styles.js'



const Wishlist = () => {

  const { token } = useUser()

  useEffect(() => {
      window.scrollTo(0, 0)
  },[])

  if (!token) {
    return <ErrorPage />;
}

  return (
    <>
      <Navbar/>
      <MainContainer>
        <Title><p>Your wishlist</p><hr /></Title>
        <WishlistList/>
      </MainContainer>
    </>
  )
}

export default Wishlist