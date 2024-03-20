import React from "react";
import "./productCard.css"
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../function/function"
import { ItemContainer } from "../../styles";

const ProductCard = (props) => {

    const {name, id, price, image, author, quantity} = props.data

    const navigate = useNavigate()

    return (
            <div className="product-card" onClick={() => navigate(`/product/${id}`)}>
                <div className="image-container">
                    <img src={image}/>
                </div>
                <ItemContainer style={{width: "90%"}}>
                    <span className="stock">{quantity <= 0 ? <p>Out of Stock</p> : <p>Ready Stock</p>}</span>
                    <div className="detail">
                        <h1 style={{margin: "0"}}>{name}</h1>
                        <p>{author}</p>
                        <p style={{margin: "0"}}>{formatCurrency(price)}</p>
                    </div>
                </ItemContainer>
            </div>
    )
}

export default ProductCard