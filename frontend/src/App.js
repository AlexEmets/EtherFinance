import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Container } from '@mui/material';
import Navigation from './Navigation';
import Dashboard from './components/Dashboard'; 
import { connectWallet } from './contracts-execution/Counter';
import ThemeProvider from './components/ThemeProvider';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contractAddress, setContractAddress] = useState('');

  const initProvider = async () => {
    const signer = await connectWallet();
    if (signer) {
      setSigner(signer);
      const address = await signer.getAddress();
      setAddress(address);
      const provider = signer.provider;
      setProvider(provider);
      const balance = await provider.getBalance(address);
      setBalance(ethers.formatEther(balance));
    }
  };

  useEffect(() => {
    initProvider();
  }, []);

  const handleMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const interactWithBackend = async () => {
    const url = new URL('/api/get-contract-data', window.location.origin);
    url.searchParams.append('address', contractAddress);

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Backend response:', data);
    } catch (error) {
      console.error('Error interacting with backend:', error);
    }
  };

  return (
    <ThemeProvider>
      <Navigation
        handleMenu={handleMenu}
        handleCloseMenu={handleCloseMenu}
        handleDrawer={handleDrawer}
        menuAnchorEl={menuAnchorEl}
        drawerOpen={drawerOpen}
      />
      <Container className="App">
        <Dashboard
          address={address}
          balance={balance}
          contractAddress={contractAddress}
          setContractAddress={setContractAddress}
          interactWithBackend={interactWithBackend}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
