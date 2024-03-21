import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { usePage } from '../../hooks/usePage';
import { useGetProducts } from '../../hooks/useFetch'
import Spinner from '../loading/Spinner'
import { CaretCircleRight, CaretCircleLeft } from 'phosphor-react'
import { ShopWrapper,
         ProductsContainer, 
         HandlePageContainer,
         ButtonPage,
         LoadingContainer,
         Title} from '../../styles'

const FilteredProduct = (props) => {

    const {page, nextPage, prevPage} = usePage()
    const sortBy = props.data.sortBy
    const category = props.data.category
    const {data, loading} = useGetProducts(`http://localhost:2000/products?category=${category}&page=${page}&sortBy=${sortBy}`)
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
                {products?.map((value) => {
                    return <ProductCard data={value} key={value.id} />;
                })}
            </ProductsContainer>
            {products && !loading && <HandlePageContainer>
                <ButtonPage disabled={page <= 1} onClick={prevPage}><CaretCircleLeft size={35} color='white'/></ButtonPage>
                <span style={{color: "white"}}>{page} of {totalPages}</span>
                <ButtonPage disabled={page >= totalPages} onClick={nextPage}><CaretCircleRight size={35} color='white'/></ButtonPage>
            </HandlePageContainer>}
        </ShopWrapper>
      )
    }

export default FilteredProduct