import React from 'react'
import { useUser } from '../../context/UserProvider'
import { useParams } from 'react-router-dom'
import { usePostData } from "../../hooks/usePost"
import { useDeleteData } from "../../hooks/useDelete"
import { useGetProducts, 
         useGetBoolean } from '../../hooks/useFetch'
import { formatCurrency } from "../../function/function"
import "./product.css"
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/navbar/Navbar'
import Skeleton from 'react-loading-skeleton'
import { Heart } from 'phosphor-react'
import { ToastContainer } from 'react-toastify';
import Spinner from '../../components/loading/Spinner'
import { ButtonAction } from '../../styles'

const Product = () => {


  const {id} = useParams()
  const index = id
  const {token} = useUser()
  const {data} = useGetProducts(`http://localhost:2000/products/${index}`)
  const {boolean: isItemInWishlist, refetch: isWishlist } = useGetBoolean(`http://localhost:2000/wishlist/check/${index}/${token}`)
  const {boolean: isItemInCart, refetch: isCart} = useGetBoolean(`http://localhost:2000/cart/check/${index}/${token}`)
  const {postData: postDataToCart, loading: cartLoading} = usePostData()
  const {postData: postDataToWishlist, loading: wishlistLoading} = usePostData()
  const {deleteData: deleteCart} = useDeleteData()
  const {deleteData: deleteWishlist} = useDeleteData()

  const addToCart = async () => {
    const cartData = {
      quantity: 1,
      productId: id,
      userId: token,
  }
    await postDataToCart('http://localhost:2000/cart', cartData)
    isCart()
  }

  const addToWishlist = async () => {
    const wishlistData = {
      productId: id,
      userId: token,
  }
    await postDataToWishlist('http://localhost:2000/wishlist', wishlistData)
    isWishlist()
  }

  const removeFromCart = async () => {

    await deleteCart(`http://localhost:2000/cart/delete/${token}/${id}`)
    isCart()
  }

  const removeFromWishlist = async () => {

    await deleteWishlist(`http://localhost:2000/wishlist/delete/${token}/${id}`)
    isWishlist()
  }

  const handleAddToCart = () => {
    if(!isItemInCart?.isCart) {
      addToCart();
    } else if (isItemInCart?.isCart) {
      removeFromCart(data.id)
    }
  };

  const handleAddToWishlist = () => {

    if(!isItemInWishlist?.isWishlist) {
      addToWishlist();
    } else {
      removeFromWishlist(data.id);
    }
  }

  return (
      <>
        <Navbar/>
        <div className='product'>
          <div className='product-page-container' key={data.id}>
            <div className='product-page-image'>
              <img src={data.image || <Skeleton baseColor="#8c8c8c" highlightColor="#3d3d3d" width={200} style={{ borderRadius: '8px' }} />} alt={data.name} />
            </div>
            <div className='product-page-description'>
              <div className="description-wrapper">
                <h3 className="book-title">{data.name || <Skeleton baseColor="#8c8c8c" highlightColor="#3d3d3d" />}</h3>
                <p className="book-author">{data.author || <Skeleton baseColor="#8c8c8c" highlightColor="#3d3d3d" />}</p>
                <p className="book-description">{data.description || <Skeleton baseColor="#8c8c8c" highlightColor="#3d3d3d" />}</p>
                <p className="book-author" style={{marginTop: "10px"}}>{`Stock: ${data.quantity}` || <Skeleton baseColor="#8c8c8c" highlightColor="#3d3d3d" />}</p>
              </div>
              <h4 className="book-price">{formatCurrency(data.price) || <Skeleton baseColor="#8c8c8c" highlightColor="#3d3d3d" />}</h4>
              <div className="handle-cart">
                <ButtonAction disabled={isItemInCart && data.quantity < 1} id='add' style={{backgroundColor: isItemInCart?.isCart? "#1d1e23" : ""}} onClick={handleAddToCart}>
                  {cartLoading? 
                  <Spinner size={20}/> 
                  : <div>{isItemInCart?.isCart? <span>Remove from Cart</span> : <span>Add to Cart</span>}</div>}
                </ButtonAction>
                <ButtonAction id='wish' style={{backgroundColor: isItemInWishlist?.isWishlist? "#1d1e23" : ""}} onClick={handleAddToWishlist}>
                  {wishlistLoading? 
                  <Spinner size={20}/> 
                  : <Heart size={20} color={isItemInWishlist?.isWishlist? 'red' : 'white'}/>}
                </ButtonAction>
               </div>
            </div>
            <ToastContainer/>
          </div>
        </div>
      </>

  )
}

export default Product