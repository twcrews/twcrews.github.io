import React, { useState, useEffect } from 'react';
import './App.css';
import * as Material from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import TextTransition from 'react-text-transition';
import Data from './Data.json';
import { Attribute } from './components/Attribute';

function App() {
  const [shadowNav, setShadowNav] = useState(false);
  const [currentThing, setCurrentThing] = useState(0);

  useScrollPosition(({ _prevPos, currPos }) => {
    const isScrolled = currPos.y < 0;
    if (isScrolled !== shadowNav) setShadowNav(isScrolled);
  }, [shadowNav]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentThing < Data.Header.SubtitleItems.length - 1) {
        setCurrentThing(currentThing + 1);
      } else {
        setCurrentThing(0);
      }
    }, 2000);
    return (() => clearInterval(interval));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <React.Fragment>
      <Material.AppBar
        position="sticky"
        id="header"
        elevation={shadowNav ? 3 : 0}
        className="AppBar"
      >
        <Material.Toolbar className="NavBar">
          <span className="NavItems">
          <img 
            className="NavLogo"
            alt="Logo" 
            src={Data.Meta.Logo}
        />
            <Material.Typography
              className="NavTitle"
              variant="h6"
            >
              {Data.Meta.Owner}
            </Material.Typography>
          </span>
          <span className="NavItems">
            <span className="AnchorButtons">
              {Data.Meta.Anchors.map(anchor => 
                <Material.Button
                  key={anchor.Name}
                  variant={anchor.Variant}
                  color={anchor.Color}
                  onClick={() => document.getElementById(anchor.Link)
                    .scrollIntoView()}
                >
                  {anchor.Name}
                </Material.Button>
              )}
            </span>
          </span>
        </Material.Toolbar>
      </Material.AppBar>
      <div
        className="AboutSection"
      >
        <Material.Typography 
          variant="h1" 
          paragraph
          className="Header"
        >
          {Data.Header.Title}
        </Material.Typography>
        <Material.Typography 
          variant="h4"
          className="Subtitle"
        >
          {Data.Header.SubtitlePrefix}
              <TextTransition
            text={Data.Header.SubtitleItems[currentThing]}
            inline
          />
        </Material.Typography>
        <div className="HeaderSpacer" />
      </div>
      <div className="AttributesSection">
        <div className="Attributes">
          {Data.Attributes.map(attr => 
            <div className="AttributeTile">
              <Attribute
                icon={
                  <Icon 
                    fontSize="inherit" 
                    color="primary"
                  >
                    {attr.Icon}
                  </Icon>}
                title={attr.Name}
                content={attr.content}
              />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
