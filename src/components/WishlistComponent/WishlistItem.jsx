import React from 'react';
import { useDeleteData } from "../../hooks/useDelete"
import { useUser } from '../../context/UserProvider';
import { formatCurrency } from "../../function/function"
import { useNavigate } from 'react-router-dom';
import { Heart } from 'phosphor-react';
import { Item, 
         ItemContainer, 
         ItemDescription,
         ButtonHandle } from '../../styles';

const WishlistItem = (props) => {
  
  const {product} = props.data;
  const refetchData = props.fetch
  const {token} = useUser()
  const {deleteData} = useDeleteData()
  const navigate = useNavigate()

  const handleRemove = async (event) => {
    event.stopPropagation();
    
    await deleteData(`http://localhost:2000/wishlist/delete/${token}/${product?.id}`)
    refetchData()
  }

  return (
    <Item onClick={() => navigate(`/product/${product.id}`)}>
      <img style={{width: "100px", height: "auto"}} src={product?.image} alt={product?.name} />
      <ItemContainer>
        <ItemDescription>
          <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <p>
              <b>{product?.name}</b>
            </p>
            <ButtonHandle onClick={handleRemove} style={{ border: "none", width: '40px', backgroundColor: 'transparent' }}>
              <Heart size={25} color='red'/>
            </ButtonHandle>
          </div>
          <p>{formatCurrency(product?.price)}</p>
          <p>{product?.description}</p>
        </ItemDescription>
      </ItemContainer>
    </Item>
  );
};

export default WishlistItem;