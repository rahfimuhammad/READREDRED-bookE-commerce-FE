import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { UserProvider } from './context/UserProvider.js';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import "./style.scss"
import Loading from './components/loading/Loading.jsx';
const Shop = lazy(() => import ('./pages/shop/shop.jsx')) 
const Admin = lazy(() => import ('./pages/adminPage/adminPage.jsx')) 
const Cart = lazy(() => import ('./pages/cart/cart.jsx'))
const Wishlist = lazy(() => import ("./pages/wishlist/wishlist.jsx")) 
const LoginSignUp = lazy(() => import ('./pages/login/loginSignUp.jsx')) 
const Product = lazy(() => import ('./pages/product/product.jsx')) 
const Profile = lazy(() => import ('./pages/profile/profile.jsx')) 
const SearchResult = lazy(() => import ("./pages/searchResult/searchResult.jsx")) 
const ErrorPage = lazy(() => import ('./pages/error.jsx')) 

const queryClient = new QueryClient()

function App() {

  return (
    <div className="App">
      <Suspense fallback={<Loading/>}>
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path='/' element={<Shop/>}></Route>
                    <Route path='/admin' element={<Admin/>}></Route>
                    <Route path='/product/:id' element={<Product/>}/>
                    <Route path='/profile' element={<Profile/>} errorElement={<ErrorPage/>}/>
                    <Route path='/cart' element={<Cart />}></Route>
                    <Route path='/wishlist' element={<Wishlist/>} errorElement={<ErrorPage/>}></Route>
                    <Route path='/login' element={<LoginSignUp/>}></Route>
                    <Route path='/searchResult/:input' element={<SearchResult/>}></Route>
                  </Routes>
                </BrowserRouter>
            </UserProvider>
        </QueryClientProvider>
      </Suspense>
    </div>
  );
}

export default App;
