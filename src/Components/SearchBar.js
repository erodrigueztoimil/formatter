// on component did mount, get history list from localstorage
// on history state change, save to localstorage
// on past path click, copy to clipboard

import React, { useState, useEffect } from "react";

const SearchBar = (props) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [path, setPath] = useState("");
  const [history, setHistory] = useState([]);

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

  // useEffect(() => {
  //   if (!localStorage.getItem("history")) {
  //     localStorage.setItem("history", JSON.stringify(history));
  //   }
  // });

  const linkMap = (arr) => {
    return arr.length > 0 ? (
      arr.map((i, index) => (
        <div className="link-container" key={`recent-${index}`}>
          {i}
        </div>
      ))
    ) : (
      <div style={{ padding: "10px 20px" }}> No Recent Paths</div>
    );
  };

  const onInputChange = (e) => {
    setPath(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter" && path) {
      // save formatted path
      let pathFormatted = path.replaceAll("\\", "/");

      // save path to history state
      setHistory((historyArray) => [pathFormatted, ...historyArray]);

      // save to localstorage
      let savedData = localStorage.getItem("history");

      let data = savedData ? JSON.parse(savedData).push(pathFormatted) : [];
      localStorage.setItem("history", JSON.stringify(data));

      // copy to clipboard
      navigator.clipboard.writeText(pathFormatted);

      // set input value to blank
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
        onChange={onInputChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default SearchBar;
