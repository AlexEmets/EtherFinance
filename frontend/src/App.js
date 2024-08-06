import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Paper, Button, Typography, TextField, AppBar, Toolbar, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BarChartIcon from '@mui/icons-material/BarChart';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contractAddress, setContractAddress] = useState('');

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        try {
          const signer = await provider.getSigner();
          setSigner(signer);

          const address = await signer.getAddress();
          setAddress(address);

          const balance = await provider.getBalance(address);
          setBalance(ethers.formatEther(balance));
        } catch (err) {
          console.error(err);
        }
      }
    };

    initProvider();
  }, []);

  const handleMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const toggleDrawer = () => {
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

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            EtherFinance
          </Typography>
          <IconButton color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} onClose={handleCloseMenu}>
            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
            <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <div role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
          <List>
            <ListItem button>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><SwapHorizIcon /></ListItemIcon>
              <ListItemText primary="Swap" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><BarChartIcon /></ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
              <ListItemText primary="Wallet" />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
      <Container className="App">
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
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
