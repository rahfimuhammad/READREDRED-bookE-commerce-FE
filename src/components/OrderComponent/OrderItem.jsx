import React, { useState } from "react";
import Detail from "../Detail/Detail.jsx";
import { formatCurrency, 
         formatDate } from "../../function/function"
import { DetailList, 
         Info, 
         Item, 
         ItemContainer, 
         ItemDescription, 
         Modal, 
         ModalClose, 
         ModalContent, 
         Title, 
         Status } from "../../styles.js";

const OrderItem = (props) => {

    const {id, orderlist, price, status, createdAt, user } = props.data
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
                <Status style={{backgroundColor: status === "finished"? "#136813" : "#bc820d"}}>
                    <p>{status}</p>
                </Status>
            </ItemContainer>
        </Item>
        {modal && 
        <Modal>
            <ModalClose onClick={() => setModal(false)}></ModalClose>
            <ModalContent>
                <Title><p>Order</p><hr/></Title>
                <DetailList>
                    {mapOrder()}
                </DetailList>
                <Info>
                    <span><p><b>Subtotal:</b> {formatCurrency(price)}</p></span>
                    <span><p><b>Address:</b> {user?.address}</p></span>
                    <Status className="status" style={{backgroundColor: status === "finished"? "#136813" : "#bc820d"}}>{status}</Status>
                </Info>
            </ModalContent>
         </Modal>}
        </>
        
    )
}

export default OrderItem