import React from 'react'
import { useGetProducts } from '../../hooks/useFetch.js'
import { useUser } from '../../context/UserProvider.js'
import Spinner from '../loading/Spinner.jsx'
import { Wrapper, 
         Container } from '../../styles.js'
import OrderItem from './OrderItem.jsx'

const OrderList = () => {

  const {token} = useUser()
  const {data, loading} = useGetProducts(`http://localhost:2000/order/${token}`)

  return (
    
    <Wrapper>
      <Container>
        {data?.map(item => {
            return <OrderItem data={item} key={item.id}/>
        })} 
        {loading? 
        <Spinner size={32} />
        : ""} 
      </Container>
    </Wrapper>
  )
}

export default OrderList