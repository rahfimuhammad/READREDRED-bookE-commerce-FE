import React, {useState} from 'react'
import axios from 'axios';
import { formatCurrency, 
         formatDate } from "../../../function/function"
import { DetailList, 
         Item, 
         ItemContainer, 
         ItemDescription, 
         Modal, 
         ModalClose, 
         ModalContent, 
         Title, 
         Info, 
         Status, 
         ButtonAction} from "../../../styles.js"
import Detail from '../../Detail/Detail.jsx';

const AdminOrderItem = (props) => {

  const {id, price, status, createdAt, orderlist, user } = props.data
  const [modal, setModal] = useState(false)
  const order = orderlist.map((value) => {
      return value
  })

  const mapOrder = () => {
      return order.map((value, index) => {
          return (
            <Detail data={value} key={index}/>
            )
          }
        )
      }
  
  const handleApproveCheckout = async () => {

    try {
      await axios.patch(
        `http://localhost:2000/order/approve/${id}`,
        {
          status: 'processed',
        }
      )
      
      try {
        let responses = await Promise.all(
          order.map(async (product) => {
            try {
              const response = await axios.patch(`http://localhost:2000/products/checkout/${product?.product.id}`, {
                quantity: parseInt(product?.quantity) || 0,
              });
              return response.data;
            } catch (error) {
              console.error(error);
              return { error: error.message };
            }
          })
        );
    
        console.log(responses);
      } catch (error) {
        console.error(error);
      }

    } catch (error) {
        console.error('Error during checkout:', error);
      }
  };

  const handleFinishOrder = async () => {
    try {
      await axios.patch(
        `http://localhost:2000/order/approve/${id}`,
        {
          status: 'finished',
        }
      )
  } catch (error) {
    console.log(error.message)
  }
}

  const handleOrder = () => {
      if (status === "processed") {
        handleFinishOrder()
      } else if (status ==="requested") {
        handleApproveCheckout()
      }
      setModal(!modal)
  }

  return (
    <>
     <Item onClick={() => setModal(true)}>
        <ItemContainer>
          <ItemDescription>
            <p><b>{id}</b></p>
            <p>{orderlist?.length} {orderlist.length > 1? "products" : "product"}</p>
            <p>{formatCurrency(price)}</p>
            <p>{formatDate(createdAt)}</p>
          </ItemDescription>
          <Status style={{backgroundColor: status === "requested"? "#bc820d" : "#136813"}}>
            <p>{status}</p>
          </Status>
        </ItemContainer>
     </Item>
    {modal && 
        <Modal>
            <ModalClose onClick={() => setModal(false)}></ModalClose>
            <ModalContent>
                <Title><p>Detail</p><hr/></Title>
                <DetailList>
                    {mapOrder()}
                </DetailList>
                <Info>
                    <span><p><b>Subtotal:</b> {formatCurrency(price)}</p></span>
                    <span><p><b>User:</b> {user?.username}</p></span>
                    <span><p><b>Phone:</b> {user?.phone}</p></span>
                    <span><p><b>Address: </b>{user?.address}</p></span>
                    {status !== "finished" && <div style={{padding: "20px 0 0 0", display: "flex", gap: "10px", width: "100%"}}>
                      <ButtonAction disabled={status === "finished"} style={{backgroundColor: "#136813"}} className='button-handle-order' onClick={() => handleOrder()}>{status === "requested"? "Process Order" : "Finish Order" }</ButtonAction>
                      <ButtonAction disabled={status === "finished"} style={{backgroundColor: "#ad4b34"}} className='button-handle-order' onClick={() => handleOrder()}>Decline Order</ButtonAction>
                    </div>}
                </Info>
            </ModalContent>
         </Modal>}
    </>
  )
}

export default AdminOrderItem