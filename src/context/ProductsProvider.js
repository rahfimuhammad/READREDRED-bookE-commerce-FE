import React, { useContext } from "react";
import axios from "axios";
import { useUser } from "./UserProvider.js";

const ProductsContext = React.createContext()

export const useProducts = () => {
    return useContext(ProductsContext)
}

export const ProductsProvider = ({ children }) => {

    const {token} = useUser()

    const clearCart = async () => {
        try {
            let response = await axios.delete(`http://localhost:2000/cart/usercart/${token}`)
        } catch (error) {
            console.log(error.message)
        }
      };

    const value = {
        clearCart: clearCart,
    }

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}
