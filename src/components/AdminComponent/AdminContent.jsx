import React from 'react'
import AdminHome from './AdminHome'
import AdminUsers from './AdminUsers'
import AdminProducts from './AdminProducts'
import AdminOrders from './AdminOrders'
import AdminTransactions from './AdminTransactions'

const AdminContent = ({tabNum}) => {

    const tabs = [
        AdminHome,
        AdminUsers,
        AdminProducts,
        AdminOrders,
        AdminTransactions
    ]

    const TabBody = tabs[tabNum]

  return (
    <div style={{position: "relative", width: "100%"}}>
        <TabBody/>
    </div>
  )
}

export default AdminContent