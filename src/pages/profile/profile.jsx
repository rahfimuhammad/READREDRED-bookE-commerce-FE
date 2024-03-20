import React, { useState } from 'react'
import { useUser } from "../../context/UserProvider";
import { useNavigate } from 'react-router-dom';
import ErrorPage from "../error.jsx"
import ProfileComponent from '../../components/UserComponent/ProfileComponent.jsx';
import CartList from "../../components/CartComponent/CartList.jsx"
import WishlistList from "../../components/WishlistComponent/WishlistList.jsx"
import OrderList from '../../components/OrderComponent/OrderList.jsx'
import AdminTransactions from '../../components/AdminComponent/AdminTransactions.jsx';
import Logo from "../../assets/logo.png"
import { MainAdmin, 
         AdminContainer, 
         Sidebar, 
         Title, 
         NavbarProfile,
         Tab,
         TabLabel,
         TabInfo, 
         PhosphorIcon} from '../../styles.js'

const ProfileUser = () => {

    const {token} = useUser()
    const navigate = useNavigate()
    const [tab, setTab] = useState(0)

    if (!token) {
        return <ErrorPage />;
    }

    const TabMenu = () => {
        const items = [
          {label: "Profile", icon: "house"},
          {label: "Cart", icon: "shopping-cart"},
          {label: "Wishlist", icon: "heart"},
          {label: "Orders", icon: "shopping-bag"},
          {label: "Transactions", icon: "graph"}
        ]
        return (
          <Tab>
            {items.map((item, index) => {
              
              return (
                <TabLabel key={index} style={{backgroundColor: tab === index? '#313873' : ''}}>
                  <input
                    type='radio'
                    name='tab'
                    checked={tab === index}
                    onChange={() => setTab(index)}
                    style={{ display: 'none' }}
                  />
                  <PhosphorIcon name={item.icon} color='white' />
                  <TabInfo className='item-label'>{item.label}</TabInfo>
                </TabLabel>)
            })}
          </Tab>
        )
      }

      const tabs = [
        ProfileComponent,
        CartList,
        WishlistList,
        OrderList,
        AdminTransactions
    ] 
      const title = [
        "Profile",
        "Cart",
        "Wishlist",
        "Order",
        "Transaction"
      ]

    const TabBody = tabs[tab]
    const tabTitle = title[tab]

  return (
    <MainAdmin>
        <NavbarProfile>
                <img onClick={() => navigate("/")} style={{height: "40px", cursor: "pointer"}} src={Logo} alt="logo" />
        </NavbarProfile>
        <Sidebar>
            {TabMenu()}
        </Sidebar>
        <AdminContainer>
          <Title><p>Your {tabTitle}</p><hr/></Title>
          <TabBody />
        </AdminContainer>
    </MainAdmin>
  )
}

export default ProfileUser