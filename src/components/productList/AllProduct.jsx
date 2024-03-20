import React from 'react'
import { usePage } from '../../hooks/usePage';
import ProductCard from "../productCard/ProductCard"
import Spinner from "../../components/loading/Spinner"
import { useGetProducts } from '../../hooks/useFetch'
import { CaretCircleRight, CaretCircleLeft } from 'phosphor-react'
import { ShopWrapper,
         ProductsContainer, 
         HandlePageContainer,
         LoadingContainer,
         ButtonPage,
         Title} from '../../styles'

const AllProduct = ({data: sortBy}) => {

    const {page, nextPage, prevPage} = usePage()
    const {data, loading} = useGetProducts(`http://localhost:2000/products?category=&page=${page}&sortBy=${sortBy}`)
    const products = data.products
    const totalPages = data.totalPages

  return (
    <ShopWrapper>
      {loading && <LoadingContainer>
        <Spinner size={32}/>
      </LoadingContainer>}
      {products === undefined && !loading && <Title style={{paddingTop: "10px"}}>
        <p>No Product</p>
      </Title>}
      <ProductsContainer>
        {products?.map((value) => (
          <ProductCard data={value} key={value.id} />
        ))}
      </ProductsContainer>
      {<HandlePageContainer>
        <ButtonPage disabled={page === 1} onClick={prevPage}><CaretCircleLeft size={35} color="white" /></ButtonPage>
        <span style={{color: "white", display: "flex"}}>{page} of {totalPages}</span>
        <ButtonPage disabled={page === totalPages} onClick={nextPage}><CaretCircleRight size={35} color="white" /></ButtonPage>
      </HandlePageContainer>}
    </ShopWrapper>
  )
}

export default AllProduct