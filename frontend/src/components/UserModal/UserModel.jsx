import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField, Button, Box, Typography } from '@material-ui/core';

import { getUser } from '../../redux/action.js';

const UserModal = ({ getUser }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    getUser(username);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#1e1e1e' }}>
      <Typography align="center" variant='h5' style={{ color: '#ff6f00', marginBottom: '16px' }}>
        Join the Adventure!
      </Typography>
      <Typography align="center" variant='subtitle1' style={{ color: '#d8d8d8', marginBottom: '16px' }}>
        Enter your name and embark on a journey through the Kitten universe!
      </Typography>
      <Box my={2} minWidth="280px">
        <TextField
          label="Your Name"
          id="standard-size-small"
          size="small"
          value={username}
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
          required
          InputProps={{
            style: {
              color: '#d8d8d8',
              '&::before': {
                borderBottomColor: '#ff4500', // Redfire color
              },
              '&::after': {
                borderBottomColor: '#ff4500', // Redfire color
              },
            },
          }}
          InputLabelProps={{
            style: {
              color: '#d8d8d8',
            },
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Button type="submit" variant="outlined" style={{ color: '#ff6f00', borderColor: '#ff6f00', '&:hover': { backgroundColor: '#ff4500', color: '#fff' } }}>
          Let's Go!
        </Button>
      </Box>
    </form>
  );
};

UserModal.propTypes = {
  getUser: PropTypes.func.isRequired,
};

export default connect(null, { getUser })(UserModal);
