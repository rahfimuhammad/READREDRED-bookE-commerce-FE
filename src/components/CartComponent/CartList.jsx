import React, { useState } from 'react'
import axios from 'axios';
import { useUser } from "../../context/UserProvider.js";
import { useGetProducts } from '../../hooks/useFetch.js';
import { useDeleteData } from '../../hooks/useDelete.js';
import { formatCurrency } from '../../function/function.js';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem.jsx'
import Detail from '../Detail/Detail.jsx';
import Spinner from '../loading/Spinner.jsx';
import { Wrapper, 
         Container,
         Modal,
         ModalClose,
         ModalContent,
         Info, 
         Title, 
         ButtonAction,
         DetailList } from '../../styles.js';
import './cartComponent.css'

const CartList = () => {

  const {user, token} = useUser()
  const {deleteData} = useDeleteData()
  const [modal, setModal] = useState(false)
  const {data, loading, refetch} = useGetProducts(`http://localhost:2000/cart/${token}`)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const getTotalAmount = data.reduce((total, item) => {
    const itemAmount = item.quantity * (item.product?.price || 0);
    return total + itemAmount;
  }, 0); 

  const refetchData = () => {
    refetch()
  }

  const clearCart = async () => {

    await deleteData(`http://localhost:2000/cart/usercart/${token}`)
    refetch()
  }

  const mapOrder = () => {
    
    return data.map((value, index) => {
        return (
            <Detail data={value} key={index}/>
          )
        })
  }

  const handleOrder = () => {
    
    refetchData()
    setModal(!modal)
  }

  const createOrder = async () => {
      
    try {
      setIsLoading(true)
      let response = await axios.post(
        'http://localhost:2000/order',
        {
          userId: token,
          status: 'requested',
          price: getTotalAmount,
        }
      );
        const orderId = response.data?.data?.id;
  
        const orderListPromises = data.map(async (value) => {
          
          try {
            let orderListResponse = await axios.post(
              'http://localhost:2000/orderlist',
              {
                userId: token,
                orderId: orderId,
                productId: value.product?.id,
                quantity: value.quantity,
              }
            );
          } catch (error) {
            
            console.error('Error creating order list:', error);
          }
        });
  
        await Promise.all(orderListPromises);
  
      } catch (error) {
        
        console.error('Error during checkout:', error);
      }

      await clearCart();
      setIsLoading(false)
      setModal(!modal)
    };

  return (
    <Wrapper>
      <Container>
        {data?.map(item => {
            return <CartItem data={item} key={item.id} fetchData={refetchData}/>
        })} 
        {loading? 
          <Spinner size={32}/>
        : ""} 
      </Container>
        <div className="check-out" style={{width: "100%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", padding: "10px 0 30px 0"}}>
          {data.length !== 0? <p><b>Subtotal: </b>{formatCurrency(getTotalAmount)}</p> : ""}
          <div className="check-out-btn">
            <button onClick={() => navigate('/')}>Back to Shop</button>
            {data.length !== 0? <button onClick={() => handleOrder()}>Checkout</button>: ""}
          </div>
        </div>
        {modal && 
        <Modal>
            <ModalClose onClick={() => setModal(false)}></ModalClose>
            <ModalContent>
                <Title><p>Checkout</p><hr/></Title>
                <DetailList>
                    {mapOrder()}
                </DetailList>
                <Info>
                    <span><p><b>Subtotal:</b> {formatCurrency(getTotalAmount)}</p></span>
                    <span><p><b>User:</b> {user?.username}</p></span>
                    <span><p><b>Phone:</b> {user?.phone}</p></span>
                    <span><p><b>Address: </b>{user?.address}</p></span>
                    <div style={{padding: "20px 0 0 0", display: "flex", gap: "10px", width: "100%"}}>
                      <ButtonAction style={{backgroundColor: "#136813"}} onClick={() => createOrder()}>
                        {isLoading? 
                        <Spinner size={20}/>
                        : <p>Create Order</p>}
                      </ButtonAction>
                    </div>
                </Info>
            </ModalContent>
         </Modal>}
    </Wrapper>
   
  )
}

export default CartList