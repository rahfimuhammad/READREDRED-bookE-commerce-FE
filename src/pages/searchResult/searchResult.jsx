import React from 'react'
import ProductCard from '../../components/productCard/ProductCard'
import Navbar from '../../components/navbar/Navbar'
import Spinner from '../../components/loading/Spinner'
import { useGetProducts } from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { CaretCircleLeft, CaretCircleRight } from 'phosphor-react'
import { ButtonPage, 
         HandlePageContainer, 
         ProductsContainer, 
         ShopWrapper,
         LoadingContainer, 
         Title } from '../../styles'

const SearchResult = () => {

    const search = useParams()
    const {data, loading} = useGetProducts(`http://localhost:2000/products/search/${search.input}`)

  return (
    <>
        <Navbar/>
        <ShopWrapper style={{top: "60px", minHeight: "calc(100vh - 60px)"}}>
            {loading && <LoadingContainer>
                <Spinner size={32}/>
            </LoadingContainer>}
            {data.length === 0 && !loading? <Title style={{paddingTop: "10px"}}>
                <p>No Result</p>
            </Title> : 
            <Title style={{paddingTop: "10px"}}>
                <p>results:</p><hr/>
            </Title>}
            <ProductsContainer>
                {data?.map(element => {
                    return (
                        <ProductCard data={element} key={element.id}/>
                    )
                })}
            </ProductsContainer>
            {data.length != 0 && !loading && <HandlePageContainer>
                <ButtonPage><CaretCircleLeft size={35} color='white'/></ButtonPage>
                <span style={{color: "white"}}>1 of 1</span>
                <ButtonPage><CaretCircleRight size={35} color='white'/></ButtonPage>
            </HandlePageContainer>}
        </ShopWrapper>
    </>
  )
}

export default SearchResult