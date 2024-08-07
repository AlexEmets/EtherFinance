// components/ContractInteraction.js

import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { incrementCounter, getCounterValue } from '../contracts-execution/Counter';

const ContractInteraction = ({ contractAddress }) => {
  const [counterValue, setCounterValue] = useState(null);

  const handleIncrement = async () => {
    try {
      const tx = await incrementCounter(contractAddress);
      await tx.wait();
      console.log('Transaction successful:', tx);
    } catch (error) {
      console.error('Error interacting with contract:', error);
    }
  };

  const handleGetCounter = async () => {
    try {
      const value = await getCounterValue(contractAddress);
      setCounterValue(value.toString());
    } catch (error) {
      console.error('Error getting counter value:', error);
    }
  };

  return (
    <div>
      <Typography variant="h6">Counter Smart Contract</Typography>
      <TextField
        label="Contract Address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={contractAddress}
        disabled
      />
      <Button variant="contained" color="primary" onClick={handleIncrement}>
        Increment
      </Button>
      <Button variant="contained" color="secondary" onClick={handleGetCounter} style={{ marginLeft: '10px' }}>
        Get Counter Value
      </Button>
      {counterValue !== null && (
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Counter Value: {counterValue}
        </Typography>
      )}
    </div>
  );
};

export default ContractInteraction;
