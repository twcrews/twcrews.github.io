import React from 'react';
import './App.css';
import * as Material from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Logo } from './logo';

function App() {

  const useStyles = makeStyles()

  return (
    <div className="Layout">
      <Material.AppBar position="static">
        <Material.Toolbar className="NavBar">
          <Logo />
          <Material.Typography 
            variant="h6" 
          >
            Tommy Crews
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
