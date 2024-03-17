import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";

import "./App.css";


import Game from "./components/GameDisplay/Game";
import Home from "./components/Home/Home";

function App({game }) {
   const [userName, setUserName] = useState("");

   useEffect(() => {
     setUserName(game?.username);
   }, [game]);

  return <Box>{userName ? <Game /> : <Home/>}</Box>;
};

const mapStateToProps = (state) => ({
  game: state.game,
});
export default connect(mapStateToProps)(App);
