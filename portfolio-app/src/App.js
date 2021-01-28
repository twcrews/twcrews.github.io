import React, { useState, useEffect } from 'react';
import './App.css';
import * as Material from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import TextTransition from 'react-text-transition';
import Data from './Data.json';

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
      <div
        id="top"
        className="Top"
      />
      <Material.AppBar
        id="nav"
        elevation={shadowNav ? 3 : 0}
        className="AppBar"
        position="sticky"
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
            <div
              className="AttributeTile"
            >
              <span className="BigIcon">
                <Icon fontSize="inherit" color="primary">
                  {attr.Icon}
                </Icon>
                <Material.Typography variant="h5">
                  {attr.Name}
                </Material.Typography>
              </span>
              <div className="Multiline GrayText">
                <Material.Typography color="inherit">
                  {attr.Description}
                </Material.Typography>
                <Material.Typography variant="h6" paragraph />
                {attr.Sections.map(section =>
                  <React.Fragment>
                    <Material.Typography variant="h6">
                      {section.Title}
                    </Material.Typography>
                    {section.Content.map(item =>
                      <Material.Typography>
                        {item}
                      </Material.Typography>
                    )}
                    <Material.Typography variant="h6" paragraph />
                  </React.Fragment>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="PortfolioSection" id="portfolio">
        <Material.Typography variant="h3" paragraph>
          {Data.Portfolio.Title}
        </Material.Typography>
        <span className="GrayText">
          <Material.Typography variant="subtitle1" paragraph>
            {Data.Portfolio.Description}
          </Material.Typography>
        </span>
        <div className="PortfolioTiles">
          {Data.Portfolio.Projects.map(project =>
            <div
              className="PortfolioProject"
              style={{ background: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(" + project.Image + "), #00b9ff", backgroundSize: "cover" }}
            >
              <div className="ProjectTypography">
                <Material.Typography variant="h6">
                  {project.Title}
                </Material.Typography>
                <Material.Typography 
                  variant="subtitle2"
                  style={{opacity: 0.8}}
                >
                  {project.Description}
                </Material.Typography>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
