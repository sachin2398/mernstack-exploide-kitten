import { combineReducers } from "redux";

import gameReducer from "./gameReducer";
import leaderBoardReducer from "./leaderBoardReducer";

const rootReducer = combineReducers({
  game: gameReducer,
  leaderBoard: leaderBoardReducer,
});

export default rootReducer;
