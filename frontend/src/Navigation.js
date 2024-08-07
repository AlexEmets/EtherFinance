import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Dashboard as DashboardIcon, SwapHoriz as SwapHorizIcon, BarChart as BarChartIcon, AccountBalanceWallet as AccountBalanceWalletIcon } from '@mui/icons-material';

const Navigation = ({ handleMenu, handleCloseMenu, handleDrawer, menuAnchorEl, drawerOpen }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawer}>
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
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawer}>
        <div role="presentation" onClick={handleDrawer} onKeyDown={handleDrawer}>
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
    </>
  );
};

export default Navigation;
