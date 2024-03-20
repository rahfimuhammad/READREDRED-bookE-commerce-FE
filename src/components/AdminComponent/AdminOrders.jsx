import React from 'react'
import { useGetProducts } from '../../hooks/useFetch.js'
import AdminOrderItem from './AdminFragments/AdminOrderItem.jsx'
import Spinner from '../loading/Spinner.jsx'
import { Wrapper,
         Container } from '../../styles.js'

const AdminOrders = () => {

  const {data, loading} = useGetProducts(`http://localhost:2000/order`)
  const order = data?.orders

  return (
    
    <Wrapper>
      <Container>
        {order?.map(item => {
            return <AdminOrderItem data={item} key={item.id}/>
        })} 
        {loading? <Spinner size={32}/> : ""} 
      </Container>
    </Wrapper>
  )
}

export default AdminOrders