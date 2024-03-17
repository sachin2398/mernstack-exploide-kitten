import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getLeaderBoard } from '../../redux/action.js';
import { Box, Typography } from '@material-ui/core';

const LeaderBoard = ({ leaderBoard, getLeaderBoard }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (leaderBoard.loading) {
      getLeaderBoard();
    } else {
      setUsers([...leaderBoard.users]);
    }
  }, [leaderBoard, getLeaderBoard]);

  const getRandomColor = () => {
    const colors = ['#ff6f00', '#ffd54f', '#ff4081', '#64ffda', '#9575cd']; // Different colors for usernames and scores
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Box
      boxShadow="0 0px 4px 0 rgba(0,0,0,0.12)"
      minHeight="60%"
      pt={2}
      bgcolor="#1e1e1e" // Dark background color
      borderRadius='15px'
      border="1px solid #234915"
      padding="16px"
      textAlign="center" // Center align text
    >
      <Typography variant="h4" style={{ color: '#ff6f00', fontFamily: 'Roboto', fontWeight: 'bold', marginBottom: '16px' }}>LeaderBoard</Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="8px">
        <Typography variant='subtitle1' style={{ color: '#ffd54f', fontFamily: 'Roboto', textTransform: 'capitalize', flex: '1' }}>Username</Typography>
        <Typography variant='subtitle1' style={{ color: '#ffd54f', fontFamily: 'Roboto', flex: '1' }}>Score</Typography>
      </Box>

      {users.map((user) => (
        <Box key={user._id} display="flex" justifyContent="space-between" alignItems="center" marginBottom="8px">
          <Typography variant='body1' style={{ color: getRandomColor(), fontFamily: 'Roboto', textTransform: 'capitalize', flex: '1' }}>{user.username}</Typography>
          <Typography variant='body1' style={{ color: getRandomColor(), fontFamily: 'Roboto', flex: '1' }}>{user.win}</Typography>
        </Box>
      ))}
    </Box>
  );
};

LeaderBoard.propTypes = {
  getLeaderBoard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  leaderBoard: state.leaderBoard,
});

export default connect(mapStateToProps, { getLeaderBoard })(LeaderBoard);
