import React, { useState } from 'react'
import { useUser } from '../../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import ErrorPage from "../error.jsx"
import Logo from "../../assets/logo.png"
import AdminContent from '../../components/AdminComponent/AdminContent.jsx'
import { MainAdmin, 
         Title, 
         AdminContainer, 
         Sidebar, 
         NavbarProfile,
         Tab,
         TabLabel,
         TabInfo, 
         PhosphorIcon} from '../../styles.js'

const AdminPage = () => {

  const {user, token} = useUser()
  const [tab, setTab] = useState(0)
  const navigate = useNavigate()

  if(user?.role === "user" || !token) {
    return <ErrorPage/>
  }

  const TabMenu = () => {
    const items = [
      {label: "Home", icon: "house"},
      {label: "Users", icon: "users"},
      {label: "Products", icon: "bag"},
      {label: "Orders", icon: "shopping-bag-open"},
      {label: "Transactions", icon: "graph"}
    ]
    return (
      <Tab>
        {items.map((item, index) => {
          
          return (
            <TabLabel style={{backgroundColor: tab === index? '#313873' : ''}}>
              <input
                type='radio'
                name='tab'
                checked={tab === index}
                onChange={() => setTab(index)}
                style={{ display: 'none' }}
              />
              <PhosphorIcon name={item.icon} color='white' />
              <TabInfo className='item-label'>{item.label}</TabInfo>
            </TabLabel>
          )
        })}
      </Tab>
    )
  }

  const title = [
    "Dashboard",
    "User Controller",
    "Product Controller",
    "Order",
    "Transaction"
  ]

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
          <Title><p>{tabTitle}</p><hr/></Title>
          <AdminContent tabNum={tab}/>
        </AdminContainer>
    </MainAdmin>
  )
}

export default AdminPage