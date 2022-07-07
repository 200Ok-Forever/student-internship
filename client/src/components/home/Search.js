import { Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const text_class = {
  input: {
    color: "white",
    height: "50px",
    letterSpacing: "2px",
    "&:-webkit-autofill": {
      WebkitTextFillColor: "white",
    },
  },
  width: "300px",
  m: "30px",
};

const btn = {
  "&:disabled": {
    color: "rgba(137, 132, 132)",
    borderColor: "rgba(137, 132, 132)",
  },
  height: "60px",
  color: "#2979ff",
  borderColor: "#2979ff",
};

const Search = (props) => {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const history = useHistory();

  const getSearchList = () => {
    // api from api file
    console.log(keywords);
    console.log(location);
    const newKeywords = keywords.trim().replace(/\s/g, "-");
    const newLocation = location.trim().replace(/\s/g, "-");
    history.push(`/search?keywords=${newKeywords}&location=${newLocation}`);
  };

  return (
    <FormControl className={props.className}>
      <TextField
        id="keywords"
        label="Keywords"
        variant="filled"
        sx={text_class}
        value={keywords}
        color={props.color}
        onChange={(e) => setKeywords(e.target.value)}
        focused
      />
      <TextField
        id="location"
        label="Location"
        variant="filled"
        sx={text_class}
        value={location}
        color={props.color}
        onChange={(e) => setLocation(e.target.value)}
        focused
      />
      <Button
        variant="outlined"
        sx={btn}
        onClick={getSearchList}
        disabled={keywords === ""}
      >
        Search
      </Button>
    </FormControl>
  );
};

export default Search;
