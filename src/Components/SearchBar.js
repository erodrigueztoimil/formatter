// on component did mount, get history list from localstorage
// on history state change, save to localstorage
// on past path click, copy to clipboard

import React, { useState, useEffect } from "react";

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

  const linkMap = (arr) => {
    return arr.length > 0 ? (
      arr
        .slice(0)
        .reverse()
        .map((i, index) => (
          <div className="link-container" key={`recent-${index}`}>
            {i}
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
      let newHistory = history;
      newHistory.push(pathFormatted);
      setHistory(newHistory);

      // save history to localStorage
      persist("history", history);

      // copy to clipboard
      navigator.clipboard.writeText(pathFormatted);

      // reset path input
      setPath("");
    }
  };

  return (
    <div className="input-container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg"
        className="search-img"
        alt="search icon"
      />

      <div className="input-placeholder" id="input-placeholder" style={{}}>
        Enter Path Here.
      </div>

      <div
        className="search-history-container"
        style={{
          opacity: inputFocus ? 1 : 0,
          pointerEvents: inputFocus ? "auto" : "none",
        }}
      >
        <div className="search-history">{linkMap(history)}</div>
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
  );
};

export default SearchBar;
