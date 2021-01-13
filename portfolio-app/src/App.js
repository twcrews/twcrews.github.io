import React, {useState, useEffect} from 'react';
import './App.css';
import * as Material from '@material-ui/core';
import { Logo } from './logo';

function App() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    setScrolled(window.pageYOffset)
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll());
    return function cleanup() {
      window.removeEventListener('scroll', handleScroll());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Layout">
      <Material.AppBar position="sticky" elevation={scrolled ? 3 : 0}>
        <Material.Toolbar className="NavBar">
          <span className="NavItems">
            <Logo />
            <Material.Typography
              variant="h6"
            >
              Tommy Crews
            </Material.Typography>
          </span>
          <span className="NavItems">
            <Material.Button color="inherit">
              About
            </Material.Button>
            <Material.Button color="inherit">
              Portfolio
            </Material.Button>
            <Material.Button
              color="secondary"
              variant="contained"
            >
              Contact
            </Material.Button>
          </span>
        </Material.Toolbar>
      </Material.AppBar>
      <div>
        <div
          className="AboutSection"
        >
          <Material.Typography variant="h1">Hello, world!</Material.Typography>
        </div>
      </div>
    </div>
  );
}

export default App;
