import React from 'react'
import "./userInfo.css"
import { PhosphorIcon } from '../../../styles'

const UserInfo = (props) => {

    const data = props.data
    const carts = data?.carts?.length
    const wishlists = data?.wishlists?.length
    const orders = data?.order?.length

  return (
    <div className='main-info'>
        <div className='info-container'>
            <div className="info">
                <div className="info-wrapper">
                    <PhosphorIcon name="shopping-cart" color='white'/>
                    <div className="info-desc">
                        <h3>Cart</h3>
                        <p>{carts} products</p>
                    </div>
                </div>
            </div>
            <div className="info">
                <div className="info-wrapper">
                    <PhosphorIcon name="heart" color='white'/>
                    <div className="info-desc">
                        <h3>Wishlist</h3>
                        <p>{wishlists} products</p>
                    </div>
                </div>
            </div>
            <div className="info">
                <div className="info-wrapper">
                    <PhosphorIcon name="shopping-bag" color='white'/>
                    <div className="info-desc">
                        <h3>Order</h3>
                        <p>{orders} Orders</p>
                    </div>
                </div>
            </div>
            <div className="info">
                <div className="info-wrapper">
                    <PhosphorIcon name="graph" color='white'/>
                    <div className="info-desc">
                        <h3>Transaction</h3>
                        <p>2 Transactions</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default UserInfo