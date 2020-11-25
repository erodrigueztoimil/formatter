import React, { useState, useEffect, Fragment } from "react";
import closeIcon from "../Assets/close-outline.svg";

const SearchBar = (props) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [path, setPath] = useState("");

  // use localStorage as history state default value
  const getLocalHistory = () => {
    let localHistory = JSON.parse(localStorage.getItem("history"));
    if (localHistory) {
      return localHistory;
    } else {
      return [];
    }
  };

  const [history, setHistory] = useState(getLocalHistory);

  useEffect(() => {
    // if input has text, keep the placeholder on top
    if (inputFocus || path) {
      document.getElementById("input-placeholder").style.transition =
        "top .2s, transform .2s";
      document.getElementById("input-placeholder").style.top = "5px";
      document.getElementById("input-placeholder").style.transform =
        "scale(.6)";
      return;
    } else {
      document.getElementById("input-placeholder").style.top = "15px";
      document.getElementById("input-placeholder").style.transform = "scale(1)";
    }
  }, [inputFocus, path]);

  const linkClick = (path) => {
    // copy to clipboard
    navigator.clipboard.writeText(path);
  };

  const linkMap = (arr) => {
    const newArr = [...arr];
    newArr.slice(0);

    return arr.length > 0 ? (
      newArr.map((i, index) => (
        <div className="link-container" key={`recent-${index}`}>
          <div className="link" onClick={() => linkClick(i)}>
            {i}
          </div>
          <div className="remove" onClick={() => removeItem(index)}>
            <img src={closeIcon} alt="Close Icon" className="closeIcon" />
          </div>
        </div>
      ))
    ) : (
      <div style={{ padding: "10px 20px" }}> No Recent Paths</div>
    );
  };

  // save to localStorage
  const persist = (item, data) => {
    localStorage.setItem(item, JSON.stringify(data));
  };

  const handleChange = (e) => {
    setPath(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && path) {
      // format path and save it to history array
      let pathFormatted = path.replaceAll("\\", "/");
      let newHistory = [...history];
      newHistory.unshift(pathFormatted);
      setHistory(newHistory);

      // copy to clipboard
      navigator.clipboard.writeText(pathFormatted);

      // reset path input
      setPath("");
    }
  };

  const removeItem = async (index) => {
    const newHistory = [...history];

    newHistory.splice(index, 1);

    setHistory(newHistory);
  };

  //update localStorage any time history state changes
  useEffect(() => {
    persist("history", history);
  }, [history]);

  return (
    <Fragment>
      <div className="input-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg"
          className="search-img"
          alt="search icon"
        />

        <div className="input-placeholder" id="input-placeholder" style={{}}>
          Enter Path Here.
        </div>

        <input
          className="input-main"
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          value={path}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="search-history-container">
        <div className="search-history">{linkMap(history)}</div>
      </div>
    </Fragment>
  );
};

export default SearchBar;
