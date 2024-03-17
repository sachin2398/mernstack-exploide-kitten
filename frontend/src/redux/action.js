import { SET_USERNAME, SET_LEADERBOARD } from "./actionTypes";

export const getUser = (username) => async (dispatch) => {
  try {
    const res = await fetch(
      `https://backend-exploding-kitten.onrender.com/api/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      }
    );
    const data = await res.json();

    dispatch({
      type: SET_USERNAME,
      payload: {
        username,
        savedGame: { ...data.user.savedGame },
        win: data.user.win,
        loose: data.user.loose,
        played: data.user.gamesPlayed,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const syncToDB =
  (username, game, cards, defusingCard) => async (dispatch) => {
    try {
      await fetch(
        `https://backend-exploding-kitten.onrender.com/api/user/${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            game,
            cards,
            defusingCard,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

export const getLeaderBoard = () => async (dispatch) => {
  try {
    const res = await fetch(
      `https://backend-exploding-kitten.onrender.com/api/users`
    );
    const data = await res.json();

    dispatch({
      type: SET_LEADERBOARD,
      payload: {
        users: data.users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
