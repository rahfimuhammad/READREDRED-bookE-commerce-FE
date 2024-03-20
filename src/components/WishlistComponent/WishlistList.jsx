import React from 'react'
import { useGetProducts } from '../../hooks/useFetch';
import { useUser } from '../../context/UserProvider'
import WishlistItem from './WishlistItem';
import Spinner from '../loading/Spinner';
import { Wrapper, 
         Container } from '../../styles';

const WishlistList = () => {

  const {token} = useUser()
  const {data, loading, refetch } = useGetProducts(`http://localhost:2000/wishlist/${token}`) 

  const refetchData = () => {
    refetch()
  }
  
  return (
    <Wrapper>
      <Container>
          {data?.map(item => {
              return <WishlistItem data={item} fetch={refetchData} key={item.id} />;
          })}
          {loading? 
          <Spinner size={32}/> 
          : ""} 
        </Container>
    </Wrapper>

  )
}

export default WishlistList