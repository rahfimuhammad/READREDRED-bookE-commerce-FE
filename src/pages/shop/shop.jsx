import React, { useEffect, useState } from "react";
import "./shop.css"
import Navbar from "../../components/Navbar/Navbar";
import AllProduct from "../../components/ProductList/AllProduct";
import FilteredProduct from "../../components/ProductList/FilteredProduct";
import SearchBar from "../../components/SearchBar/SearchBar";
import { SelectContainer,
         Select} from "../../styles"; 
import Footer from "../../components/Footer/Footer";

const Shop = () => {

    const [category, setCategory] = useState("all books")
    const [sortBy, setSortBy] = useState("");
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    const handleSortChange = (value) => {
        setSortBy(value);
        setToggle(!toggle);
      };
    
    
    return (
        <>
            <Navbar/>
            <div className="shop-container" style={{width: "100%", height: "fit-content", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px", backgroundColor: "#34353f"}}>
                <SearchBar/>
                <div className="category-container">
                    <div className="category-wrapper">
                        <SelectContainer>
                            <Select onChange={(e) => handleSortChange(e.target.value)}>
                                <option value="">Default Sort</option>
                                <option value="nameAsc">A - Z</option>
                                <option value="nameDesc">Z - A</option>
                                <option value="priceDesc">Highest Price</option>
                                <option value="priceAsc">Lowest Price</option>
                            </Select>
                        </SelectContainer>
                        <button className="button" onClick={() => setCategory("all books")} style={{backgroundColor: category === "all books"? "#313873" : "#1d1e23"}}>All books</button>
                        <button className="button" onClick={() => setCategory("social")} style={{backgroundColor: category === "social"? "#313873" : "#1d1e23"}}>Social & Humanities</button>   
                        <button className="button" onClick={() => setCategory("science")} style={{backgroundColor: category === "science"? "#313873" : "#1d1e23"}}>Science</button>
                        <button className="button" onClick={() => setCategory("fiction")} style={{backgroundColor: category === "fiction"? "#313873" : "#1d1e23"}}>Fiction</button>
                    </div>
                </div>
                {category === 'all books' ? <AllProduct data={sortBy}/> : <FilteredProduct data={{sortBy: sortBy, category: category}}/>}
            </div>
            <Footer/>
        </>
    )
}

export default Shop


