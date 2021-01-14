import React, { useState, useEffect } from 'react';
import './App.css';
import * as Material from '@material-ui/core';
import { Logo } from './logo';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

function App() {
  const [shadowNav, setShadowNav] = useState(false);
  const [currentThing, setCurrentThing] = useState(0);

  useScrollPosition(({ _prevPos, currPos }) => {
    const isScrolled = currPos.y < 0;
    if (isScrolled !== shadowNav) setShadowNav(isScrolled);
  }, [shadowNav]);

  const things = [
    "full stack software.",
    "desktop applications.",
    "websites.",
    "databases.",
    "software solutions.",
    "graphics.",
    "video productions.",
    "collaborative projects.",
    "strong teamwork.",
    "professional products.",
    "lasting relationships.",
    "delicious coffee."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("called: " + currentThing);
      if (currentThing < things.length - 1) {
        setCurrentThing(currentThing + 1);
      } else {
        setCurrentThing(0);
      }
    }, 2000);
    return (() => clearInterval(interval));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="Layout">
      <Material.AppBar position="sticky" id="header" elevation={shadowNav ? 3 : 0}>
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
          <Material.Typography variant="h1" paragraph>Hello, world!</Material.Typography>
          <Material.Fade>
            <Material.Typography variant="h4">
              I engineer {things[currentThing]}
            </Material.Typography>
          </Material.Fade>
        </div>
      </div>
    </div>
  );
}

export default App;
