import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, User } from "phosphor-react";
import "./navbar.css"
import { useUser } from "../../context/UserProvider";
import Logo  from "../../assets/logo.png"

const Navbar = () => {

    const {token, user} = useUser()
    const navigate = useNavigate()
    const role = user?.role

  const handleNavigate = () => {
    if(role === "user") {
        navigate('/profile')
    } else {
        navigate('/admin')
    }
  }

    return (
        <div className="navbar">
            <div className="home-nav">
                <Link style={{textDecoration: "none"}} to="/" className="link"><img style={{height: "40px" }} src={Logo} alt="logo" /></Link>
            </div>
            <div className="navigator">
                {token &&<div>
                    <Link to="/wishlist" className="link"><Heart size={32} color="white" /></Link>
                </div> }
                {token && <Link to="/cart" className="link">
                        <ShoppingCart size={32} color="white" />
                </Link>}
                { token !== undefined?  <User style={{cursor: "pointer"}} onClick={() => handleNavigate()} size={32} color="white"/>
                :
                <Link to="/login" style={{textDecoration: "none"}}><h3>Login</h3></Link>}
            </div>
        </div>
    )
}

export default Navbar