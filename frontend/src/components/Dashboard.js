// components/Dashboard.js

import React from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';
import ContractInteraction from './ContractInteraction';

const Dashboard = ({ address, balance, contractAddress, setContractAddress, interactWithBackend }) => {
  return (
    <Paper className="paper" elevation={3}>
      <Typography variant="h3" component="h1">
        Welcome to EtherFinance
      </Typography>
      <Typography variant="body1">
        Connected account: {address}
      </Typography>
      <Typography variant="body1">
        Balance: {balance} ETH
      </Typography>
      <TextField
        label="Contract Address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={interactWithBackend} className="button">
        Get Contract Data
      </Button>
      <ContractInteraction contractAddress={contractAddress} />
    </Paper>
  );
};

export default Dashboard;
