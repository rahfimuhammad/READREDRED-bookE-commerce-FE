import styled, {keyframes} from "styled-components";
import React from 'react';
import { House, 
         Graph, 
         Users, 
         Bag, 
         ShoppingBagOpen,
         ShoppingBag,
         Heart, 
         ShoppingCart,  } from 'phosphor-react'

export const MainAdmin = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height:100vh;
    background-color: #34353f;
    
    @media (max-width: 600px) {
        flex-direction: column}`;

export const AdminContainer = styled.div` 
    position: relative;
    width: 83%;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    @media (max-width: 1200px) {
        width: calc(100% - 90px);} 
    
    @media (max-width: 600px) {
        width: 100%;
        padding: 10px 0 60px 0;}`;

export const MainContainer = styled.div`
    display: flex;
    background-color: #34353f;
    position: absolute;
    top: 60px;
    padding: 10px 0 0 0;
    left: 0;
    width: 100%;
    min-height: calc(100vh - 50px);
    flex-direction: column;
    align-items: center;`;

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column; 
    gap: 0; 
    height: fit-content; 
    position: relative`;

export const ShopWrapper = styled.div`
    background-color: #34353f;
    width: 100%;
    height: fit-content;
    min-height: calc(100vh - 220px);
    position: relative;
    top: 220px;
    left: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px
    
    @media (max-width: 600px) {
        gap: 10px;};`;

export const ProductsContainer = styled.div`
    width: calc(100% - 15vw - 10px);
    height: fit-content;
    // min-height: calc(100vh - 305px);
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    padding:  0 0 10px 0;
    
    @media (max-width: 1200px) {
        width: calc(100% - 20px);
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 600px) {
        grid-gap: 10px;
        grid-template-columns: repeat(2, 1fr);
    }`

export const Container = styled.div`
    width: 100%;
    display: flex;
    padding-bottom: 30px;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    
    @media (max-width: 600px) {
        gap: 10px
    }`;

export const Sidebar = styled.div`
    border-right: 1px solid #34353f;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 10px 0;
    width: 21%;
    height: calc(100% - 20px);
    background-color: #1d1e23;
    
    @media (max-width: 1200px) {
        width: 90px;}

    @media (max-width: 600px) {
        border-right: 0px solid #313873;
        position: absolute;
        z-index: 6;
        width: 100%;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        padding: 12.5px 0;
        height: fit-content;
        box-shadow: 0px 0px 5px 5px rgba(49, 56, 115, .5);
        background-color: #1d1e23;}`;

export const Tab = styled.div`
    margin-top: 80px;
    display: flex;
    height: fit-content;
    flex-direction: column;
    gap: 10px;
    
    @media (max-width: 600px) {
        display: flex;
        margin-top: 0;
        flex-direction: row;
        justify-content: space-between;}
        
    @media (max-width: 359px) {
        gap: 5px;}`;

export const TabLabel = styled.label`
    border-radius: 7px;
    border: transparent 2px solid;
    display: flex;
    gap: 15px;
    align-items: center;
    padding: 2.5px 20px;
    cursor: pointer;
    transition: border 200ms ease-in;

    &:hover {
        border: 2px solid #313873;}

    @media (max-width: 1200px) {
        padding: 2.5px 10px}
    
    @media (max-width: 400px) {
        padding: 0 10px;}`;

export const TabInfo = styled.h3`
    @media (max-width: 1200px) {
        display: none;
    }`

export const StyledIcon = styled.div`
    width: 32px;
    height: 32px;

    @media (max-width: 1200px) {
        width: 40px;
        height: 40px;}

    @media (max-width: 700px) {
        width: 35px;
        height: 35px;}

    @media (max-width: 359px) {
        width: 25px;
        height: 25px;}`;
        
export const PhosphorIcon = ({ name, color }) => {
    switch (name) {
        case 'house':
            return <StyledIcon as={House} color={color} />;
        case 'graph':
            return <StyledIcon as={Graph} color={color} />;
        case 'users':
            return <StyledIcon as={Users} color={color} />;
        case 'bag':
            return <StyledIcon as={Bag} color={color} />;
        case 'shopping-bag-open':
            return <StyledIcon as={ShoppingBagOpen} color={color} />;
        case 'shopping-bag':
            return <StyledIcon as={ShoppingBag} color={color} />;
        case 'shopping-cart':
            return <StyledIcon as={ShoppingCart} color={color} />;
        case 'heart':
            return <StyledIcon as={Heart} color={color} />;
        default:
            return null;
        }
      };

export const NavbarProfile = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 6;
    width: fit-content;
    display: flex;
    justify-content: flex-start;
    padding: 15px 25px;
    background-color: transparent;
    
    @media (max-width: 600px) {
        box-shadow: 0px 0px 5px 5px rgba(49, 56, 115, .5);
        position: relative;
        display: flex;
        padding: 10px;
        justify-content: flex-start;
        background-color: #1d1e23;
        width: calc(100% - 20px);}` 

export const Title = styled.span`
    width: fit-content;
    color: white;`;

export const Modal = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    overflow: auto;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 6;
    background-color: rgba(29, 30, 35, .8)`;

const scale = keyframes`
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  `;

export const ModalClose = styled.div`
  width: 100%;
  height:100%;
  position: fixed;
  left: 0;
  top: 0;`;

export const ModalContent = styled.div`
    position: absolute;
    width: 350px;
    padding: 35px 0;
    max-height: 70%;
    overflow-y: auto;
    border: #313873 1px solid ;
    background-color: #1d1e23;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 300ms ease;
    animation: ${scale} 0.3s ease-in-out;
    
        @media (max-width: 376px) {
            width: 90%;
            border-radius: 10px;
            gap: 10px;
        }`;

export const Form = styled.form`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;`;

export const Input = styled.input`
    border: none;
    outline: none;
    width: 100%;
    background-color: transparent;
    border-bottom: #34353f solid 1px;
    padding: 10px 5px;`;

export const Item = styled.div`
    padding: 20px;
    background-color: #1d1e23;
    border-radius: 10px;
    height: fit-content;
    width: 600px;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    box-shadow: 5px 5px 2.5px 0px rgba(0,0,0,0.4);
    
    @media (max-width: 700px) {
        width: 90%;}

    @media (max-width: 600px) {
        padding: 10px;
        width: 90%;
        gap: 20px;
        box-shadow: 2.5px 2.5px 1.25px 0px rgba(0,0,0,0.4);}`;

export const ItemContainer = styled.div`
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    align-items: flex-start;`;

export const ItemDescription = styled.div`
    width: 100%;
    display: flex;
    text-align: left;
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;`;

export const DetailContainer = styled.div`
    padding: 5px;
    overflow-y: auto;
    height: fit-content;
    width: calc(90% - 10px);
    display: flex;
    align-items: flex-start;
    gap: 15px;`;

export const DetailImage = styled.img`
    width: 50px;
    height: auto;`;

export const DetailList = styled.div`
    width: calc(90% - 10px);
    // overflow-y: auto;
    max-height: 60%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    padding: 2px 0;
    gap: 10px;`;

export const Info = styled.div`
    width: calc(90% - 10px);
    padding: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 5px;`;

export const Status = styled.div`
    width: fit-content;
    padding: 3px 10px 5px 10px;
    border-radius: 3px;
    color: white;`;

export const ButtonAction = styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border: 1px solid #313873 ;
    background-color: #313873;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 200ms ease-in;
    
    &:hover {
        background-color: #1d1e23;}

    &:disabled {
        opacity: .5;}

    @media (max-width: 900px) {

        &:hover {
            background-color: #313873;}

    @media (max-width: 600px) {
        border: none;
    }}`

export const ButtonHandle = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    background-color: #313873;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 200ms ease-in;
    
    &:hover {
        background-color: #1d1e23;}

    @media (max-width: 900px) {

        &:hover {
            background-color: #313873;}}`

export const HandlePageContainer = styled.div`
    display: flex;
    padding: 10px 0 20px 0;
    gap: 10px;
    align-items: center;
    align-self: center;`

export const ButtonPage = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    height: fit-content;
    background-color: transparent;
    cursor: pointer;
    scale: 1;
    transition: scale 200ms ease-in;
    border: none;
    
    &:hover {
        scale: 1.01;}
    }

    &:disabled {
        opacity: .5}`;

export const LoadingContainer = styled.div`
    position: absolute;
    top: 0; 
    left: 0; 
    width: 100%; 
    height: calc(100vh - 220px);
    display: flex; 
    justify-content: center;
    align-items: center`;

export const SelectContainer = styled.div`
    border-radius: 4px;
    width: max-content;
    padding: 0 7px 0 0;
    cursor: pointer;
    background-color: #1d1e23 ;
    border: 2px solid #313873;
    color: white;`;

export const Select = styled.select`
    height: 100%;
    background-color: #1d1e23;
    border: none;
    padding: 7px 10px ;
    cursor: pointer;
    border-radius: 5px;
    color: white;
    
    &:focus {
        outline: none;}`;

export const ButtonProfile = styled.button`
        width: 100%;
        display: flex;
        background-color: transparent;
        justify-content: center;
        align-items: center;
        height: 50px;
        border: 1px solid #313873 ;
        color: white;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 200ms ease-in;
        
        &:hover {
            background-color: #313873;}
    
        @media (max-width: 900px) {
            &:hover {
                background-color: transparent;}};
        
        @media (max-width: 600px) {
            height: 40px;
            font-size: 12px;}
            
        @media (max-width: 391px) {
            height: 35px;
            font-size: 11px}`