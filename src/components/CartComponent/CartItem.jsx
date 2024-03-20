import React, { useState } from "react";
import { useDeleteData } from "../../hooks/useDelete";
import { formatCurrency } from "../../function/function"
import { usePatchData } from "../../hooks/usePatch";
import { useUser } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import "./cartComponent.css"
import { Trash } from "phosphor-react";
import { Item, 
         ItemContainer, 
         ItemDescription } from "../../styles";

const CartItem = (props) => {

    const {quantity, product} = props.data
    const refetchData = props.fetchData
    const {token} = useUser()
    const {patchData} = usePatchData()
    const {deleteData} = useDeleteData()
    const navigate = useNavigate()
    const [q, setQ] = useState(quantity)

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        
        await deleteData(`http://localhost:2000/cart/delete/${token}/${id}`);
        refetchData()
    };

    const updateQuantity = (qty, productId) => {
        
        patchData(`http://localhost:2000/cart/${token}/${productId}/${qty}`)
    }

    const increase = (e) => {
        e.stopPropagation();
        setQ((prev) => {
            updateQuantity(prev + 1, product?.id);
            return prev + 1;
        });
    };
    
    const decrease = (e) => {
        e.stopPropagation();
        if (q > 1) {
            setQ((prev) => {
                updateQuantity(prev - 1, product?.id);
                return prev - 1;
            });
        }
    };

    return (
        <>
        <Item onClick={() => navigate(`/product/${product.id}`)}>
            <img style={{width: "100px", height: "auto"}} src={product?.image}/>
            <ItemContainer>
                <ItemDescription>
                    <p><b>{product?.name}</b></p>
                    <p>{formatCurrency(product?.price)}</p>
                    <p>{product?.description}</p>
                </ItemDescription>
                <div className="count-handler">
                    <div className="btn-count">
                        <button className="handle-count" disabled={q === 1} onClick={decrease}> - </button>
                        <input  type="text" value={q} onChange={(e) => updateQuantity(parseInt(e.target.value), product?.id)} />
                        <button className="handle-count" disabled={quantity >= product?.quantity} onClick={increase}> + </button>
                    </div>
                        <button onClick={(e) => handleDelete(e, product?.id)} className="trash-button"><Trash size={20}/></button>
                </div>
            </ItemContainer>
        </Item>
        </>
        
    )
}

export default CartItem