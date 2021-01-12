import React from 'react';
import './App.css';
import * as Material from '@material-ui/core';
import * as Icon from '@material-ui/icons';

function App() {
  return (
    <div className="Layout">
      <Material.AppBar position="static">
        <Material.Toolbar>
          <Material.IconButton
            edge="start" 
            color="inherit"
          >
            <Icon.Menu />
          </Material.IconButton>
          <Material.Typography 
            variant="h6" 
          >
            News
          </Material.Typography>
          <Material.Button color="inherit">
            Login
          </Material.Button>
        </Material.Toolbar>
      </Material.AppBar>
      <div />
    </div>
  );
}

export default App;
