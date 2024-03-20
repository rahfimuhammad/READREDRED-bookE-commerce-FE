import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./userInfo.css"
import { useGetProducts } from '../../../hooks/useFetch'
import { DetailImage, Title } from '../../../styles'

const TopProducts = () => {

    const {data} = useGetProducts(`http://localhost:2000/products?page=1&size=3`)
    const products = data?.products
    const navigate = useNavigate()

    const mapProducts = () => {
        
        return products?.map(value => {
            return (
                <div style={{width: "calc(100% - 20px)", 
                             display: "flex", 
                             gap: "10px", 
                             alignItems: "flex-start", 
                             padding: "10px", 
                             cursor: "pointer",
                             backgroundColor: "#1d1e23", 
                             borderRadius: "5px"}}
                      onClick={() => navigate(`/product/${value?.id}`)}
                      >
                    <DetailImage src={value.image}/>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <p style={{fontSize: "14px", fontWeight: "bold"}}>{value.name}</p>
                        <p style={{fontSize: "14px", fontWeight: "400"}}>{value.author}</p>
                    </div>
                </div>
            )
        })
    }

  return (
    <div style={{width: "calc(100% - 80px)",
                 height: "fit-content",
                 padding: "10px",
                 backgroundColor: "#34353f",
                 position: "absolute",
                 boxShadow: "10px 10px 5px 0 rgba(49, 56, 115, .4)",
                 flexDirection: "column",
                 alignItems: "center",
                 gap: "10px",
                 top: "20px",
                 right: "40px",
                 borderRadius: "10px"}}
         className='top-products'
         onClick={() => console.log(data)}>
        <Title><p>Top Products</p><hr/></Title>
        {mapProducts()}
    </div>
  )
}

export default TopProducts