import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./searchBar.css"
import { MagnifyingGlass } from 'phosphor-react'

const SearchBar = () => {

    const navigate = useNavigate()

    const [input, setInput] = useState("")

    
      const handleChange = (value) => {
          setInput(value)
      }

  return (
    <div className='searchbar-container'>
        <form>
            <input type='text' placeholder='search book' value={input} onChange={(e) => handleChange(e.target.value)}/>
            <button className='enter-button' style={{backgroundColor: "#34353f",
                            padding: '0',
                            height: "100%", 
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"}}
                            onClick={() => navigate(`/searchResult/${input}`)}
                    ><MagnifyingGlass size={25} />
            </button>
        </form>
    </div>
  )
}

export default SearchBar