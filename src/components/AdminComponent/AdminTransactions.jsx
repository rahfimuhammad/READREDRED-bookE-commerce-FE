import React from 'react'
import { useGetProducts } from '../../hooks/useFetch'
import AdminOrderItem from './AdminFragments/AdminOrderItem'
import Spinner from '../loading/Spinner'
import { Wrapper, 
         Container } from '../../styles'

const AdminTransactions = () => {

  const {data, loading} = useGetProducts('http://localhost:2000/order/transactions/finished')
  const order = data?.transactions

  return (
    
    <Wrapper>
      <Container>
        {order?.map(item => {
            return <AdminOrderItem data={item} key={item.id}/>
        })} 
        {loading? 
        <Spinner size={32}/> 
        : ""} 
      </Container>
    </Wrapper>
  )
}
export default AdminTransactions