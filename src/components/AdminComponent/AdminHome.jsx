import React from 'react'
import TabUsers from './AdminFragments/TabUsers'
import TabProducts from './AdminFragments/TabProducts'
import TabSalesReport from './AdminFragments/TabSalesReport'

const AdminHome = () => {
  return (
    <div>
      <TabSalesReport/>
      <TabUsers/>
      <TabProducts/>
    </div>
  )
}

export default AdminHome