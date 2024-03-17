import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';

import '../css/card.css';
import useStyles from '../css/user.js';
import { syncToDB } from '../../redux/action.js';
import Header from '../Header/Header.jsx';
import Card from '../KittenCard/Card.jsx';
import LeaderBoard from '../Board/LeaderBoard.jsx';

const Game = ({ game, syncToDB }) => {
  const classes = useStyles();

  const [cards, setCards] = useState([]);
  const [defusingCard, setDefusingCard] = useState(0);
  const [gameStatus, setGameStatus] = useState({
    played: 0,
    win: 0,
    loose: 0,
    status: 'loading',
  });

  const { played, win, loose, status } = gameStatus;

  const startGame = (game) => {
    let GetCards = [];
    let defusing = 0;

    if (game?.savedGame && game?.savedGame?.cards?.length > 0) {
      GetCards = [...game?.savedGame.cards];
      defusing = game?.savedGame.defusingCard;
    } else {
      const gameCards = ['cat', 'bomb', 'defusing', 'shuffle'];

      for (let i = 0; i < 5; i++) {
        const index = Math.round(Math.random() * 3);
        GetCards.push(gameCards[index]);
      }

      setGameStatus((oldGameStatus) => ({
        ...oldGameStatus,
        status: 'running',
      }));
    }

    setGameStatus((oldGameStatus) => ({
      ...oldGameStatus,
      played: game?.played || oldGameStatus?.played,
      win: game?.win || oldGameStatus?.win,
      loose: game?.loose || oldGameStatus?.loose,
      status: 'running',
    }));

    setCards([...GetCards]);
    setDefusingCard(defusing);
  };

  useEffect(() => {
    if (game?.username) startGame(game);
  }, [game]);

  const handleDrawCard = (id) => {
    const el = document.querySelector(`#${id}`);
    el.classList.add('card--flipped');
    setTimeout(() => {
      runGame();
    }, 800);
  };

  const runGame = () => {
    let leftCards = cards;
    let lastCard = leftCards.pop();

    const stats = {
      defusingCard,
      played,
      win,
      loose,
      status,
    };

    if (lastCard === 'shuffle') {
      stats.status = 'restarting';
      stats.defusingCard = 0;
      setTimeout(() => {
        startGame();
      }, 1000);
    } else if (lastCard === 'defusing') {
      stats.defusingCard++;
    } else if (lastCard === 'bomb') {
      if (defusingCard > 0) {
        stats.defusingCard--;
        lastCard = 'defusing';
      } else {
        stats.played++;
        stats.loose++;
        stats.status = 'loose';
        stats.defusingCard = 0;
      }
    }

    if (leftCards.length === 0 && lastCard !== 'bomb') {
      stats.defusingCard = 0;
      stats.played++;
      stats.win++;
      stats.status = 'win';
    }

    setGameValues(
      leftCards,
      stats.defusingCard,
      stats.played,
      stats.win,
      stats.loose,
      stats.status
    );
  };

  const setGameValues = (gCards, gDefusing, gPlayed, gWin, gLoose, gStatus) => {
    setCards([...gCards]);
    setDefusingCard(gDefusing);
    setGameStatus((oldGameStatus) => ({
      ...oldGameStatus,
      played: gPlayed,
      win: gWin,
      loose: gLoose,
      status: gStatus,
    }));
    syncToDB(
      game?.username,
      {
        played: gPlayed,
        win: gWin,
        loose: gLoose,
      },
      gStatus === 'running' ? gCards : [],
      gDefusing
    );
  };

  return (
    <Box bgcolor="#000" color="#fff" minHeight="100vh">
      <Header />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box
              position="relative"
              width="100%"
              minHeight="70vh"
              boxShadow="0 0px 4px 0 rgba(0,0,0,0.12)"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#1e1e1e"
              borderRadius="15px"
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                {gameStatus.status === 'running' && (
                  <Box position="relative" width={285} height={290}>
                    {cards.map((card, key) => (
                      <Box
                        className={classes.root}
                        zIndex={key}
                        key={key + card}
                        onClick={() => handleDrawCard(card + key)}
                      >
                        <Card id={card + key} card={card} />
                      </Box>
                    ))}
                  </Box>
                )}

                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  py={1}
                  color="#fff"
                  bgcolor="#1e1e1e"
                  borderRadius={15}
                >
                  {gameStatus.status === 'loose' ||
                  gameStatus.status === 'win' ? (
                    <Typography variant='h5' style={{ color: '#ff6f00' }}>
                      You {status === 'win' ? 'won' : 'lost'}
                    </Typography>
                  ) : (
                    <Typography variant='h5' style={{ color: '#ff6f00' }}>
                      {cards.length} cards left
                    </Typography>
                  )}
                </Box>

                {gameStatus.status === 'restarting' && (
                  <Typography variant='h6' style={{ color: '#ff6f00' }}>Shuffling ...</Typography>
                )}

                {(gameStatus.status === 'loose' ||
                  gameStatus.status === 'win') && (
                  <Box>
                    <Button onClick={() => startGame()} variant="contained">
                      Play Again
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <LeaderBoard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

Game.propTypes = {
  syncToDB: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { syncToDB })(Game);
