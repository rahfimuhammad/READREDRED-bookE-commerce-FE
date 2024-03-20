import React, {useEffect} from "react";
import { useUser } from "../../context/UserProvider.js";
import ErrorPage from "../error.jsx"
import Navbar from '../../components/navbar/Navbar.jsx'
import CartList from "../../components/CartComponent/CartList.jsx"
import { MainContainer, 
         Title } from "../../styles.js";

const Cart = () => {

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
            <MainContainer style={{minHeight: "calc(100vh - 70px)"}}>
                <Title><p>Your Cart Items</p><hr/></Title>
                <CartList />
            </MainContainer>
        </>

    )
}

export default Cart