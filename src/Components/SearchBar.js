import React, {useState, useEffect} from 'react'

const SearchBar = props => {

    const [inputFocus, setInputFocus] = useState(false)

    const inputClick = () => {
      setInputFocus(true)
    }
  
    useEffect(() => {
      if (inputFocus) {
        document.getElementById('input-placeholder').style.transition = "top .2s, transform .2s"
        document.getElementById('input-placeholder').style.top = '5px'
        document.getElementById('input-placeholder').style.transform = "scale(.6)"
  
        return
      } else {
        document.getElementById('input-placeholder').style.top = '15px'
        document.getElementById('input-placeholder').style.transform = "scale(1)"
      }
  
    }, [inputFocus])
    
    return (
        <div
            className="input-container"
        >
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg"
            className="search-img"
            />

            <div 
            className="input-placeholder"
            id="input-placeholder"
            style={{
                
            }}
            >
            Enter Path Here.
            </div>

            <div 
            className="search-history"
            style={{
                opacity: inputFocus ? 1 : 0,
                pointerEvents: inputFocus ? 'auto' : 'none',
            }}
            >
            {"add array of recent search results"}
            </div>

            <input
            className="input-main"
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            />
        </div>       
    )
}

export default SearchBar