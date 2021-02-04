import React, { useState, useEffect } from 'react';
import './App.css';
import * as Material from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import TextTransition from 'react-text-transition';
import Data from './Data.json';

function App() {

  /* 
  ====================
    ENUMS
  ====================
  */

  const MessageState = Object.freeze({
    "Initial": 0,
    "Sending": 1,
    "Sent": 2,
    "Error": 3
  });

  /* 
  ====================
    STATE
  ====================
  */

  const [shadowNav, setShadowNav] = useState(false);
  const [currentThing, setCurrentThing] = useState(0);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState(false);
  const [message, setMessage] = useState(MessageState.Initial);

  /* 
  ====================
    FUNCTIONS
  ====================
  */

  const fieldValid = (field) => {
    var val = formData[field.ID];
    var pattern = new RegExp(field.Pattern);
    if (val) {
      return val.trim().length > 0 && pattern.test(val.trim());
    }
  };
  const formValid = () => {
    var BreakException = {};
    try {
      Data.Contact.Fields.forEach(field => {
        if (!fieldValid(field)) {
          throw BreakException;
        }
      });
    } catch (e) {
      if (e !== BreakException) throw e;
      return false;
    }
    return true;
  };
  const submitForm = () => {
    setMessage(MessageState.Sending);
    var formUrl = Data.Meta.FormUrl;
    var formEntries = Data.Contact.Fields.map(field => field.Entry);
    var formValues = Data.Contact.Fields.map(field => formData[field.ID]);
    var submitData = new FormData();
    formEntries.forEach((entry, i) => submitData.append(entry, formValues[i]));
    fetch(formUrl, {
      method: "POST",
      mode: "no-cors",
      referrer: "strict-origin-when-cross-origin",
      body: submitData
    })
      .then(response => {
        if (response.ok || response.status === 0) {
          setMessage(MessageState.Sent);
        } else {
          setMessage(MessageState.Error);
        }
      })
      .catch(() => {
        setMessage(MessageState.Error);
      });
  }

  /* 
  ====================
    EVENT HANDLERS
  ====================
  */

  const handleLink = (url) => { window.open(url, "_blank"); };
  const handleFieldChange = (event) => {
    var tmpForm = { ...formData };
    tmpForm[event.target.id ?? event.target.name] = event.target.value;
    setFormData(tmpForm);
  };
  const handleSendClick = () => {
    if (!formValid()) {
      setFormError(true);
    } else {
      submitForm();
    }
  };

  /* 
  ====================
    HOOKS
  ====================
  */

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
  });

  /*
  ====================
    UI SEGMENTS
  ====================
  */

  const contactForm = (
    <React.Fragment>
      <div className="ContactForm">
        {Data.Contact.Fields.map(field =>
          <div
            key={field.ID}
            style={{
              gridColumnStart: field.GridColumnStart,
              gridColumnEnd: "span " + field.GridColumnSpan
            }}
            className="ContactField"
          >
            {
              field.Component === "TextField" ?
                <Material.TextField
                  id={field.ID}
                  type={field.Type}
                  label={field.Label}
                  required={field.Required}
                  onChange={handleFieldChange}
                  value={formData[field.ID] ?? ""}
                  multiline={field.Multiline}
                  rows={field.Rows}
                  error={formError && !fieldValid(field)}
                  helperText={formError && !fieldValid(field) ?
                    field.HelperText : null}
                  fullWidth
                  variant="outlined"
                /> :
                field.Component === "Select" ?
                  <Material.FormControl
                    id={field.ID}
                    variant="filled"
                    fullWidth
                    required={field.Required}
                    error={formError && !fieldValid(field)}
                  >
                    <Material.InputLabel
                      id={field.ID + "-label"}
                    >
                      {field.Label}
                    </Material.InputLabel>
                    <Material.Select
                      id={field.ID}
                      name={field.ID}
                      labelId={field.ID + "-label"}
                      value={formData[field.ID] ?? ""}
                      onChange={handleFieldChange}
                    >
                      {field.Items.map(item =>
                        <Material.MenuItem
                          key={item}
                          value={item}
                        >
                          {item}
                        </Material.MenuItem>
                      )}
                    </Material.Select>
                    <Material.FormHelperText>
                      {formError && !fieldValid(field) ?
                        field.HelperText : null}
                    </Material.FormHelperText>
                  </Material.FormControl> : null
            }
          </div>
        )}
      </div>
      <div className="ActionButton">
        <Material.Button
          fullWidth
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleSendClick}
        >
          {Data.Contact.Button}
        </Material.Button>
      </div>
    </React.Fragment>
  );

  const infoCard = (
    <div
      className="InfoCard"
      style={{
        backgroundColor:
          message === MessageState.Error ?
            "#fff2cf" : "#ddffdd"
      }}
    >
      {message === MessageState.Error ?
        <Icon style={{
          fontSize: "60px",
          color: "red",
          marginBottom: "10px"
        }}>
          highlight_off
        </Icon> :
        <Icon style={{
          fontSize: "60px",
          color: "green",
          marginBottom: "10px"
        }}>
          check_circle
        </Icon>
      }
      <span className="GrayText">
        <Material.Typography>
          {message === MessageState.Error ?
            Data.Dialog.SubmitFail.Message :
            Data.Dialog.SubmitSuccess.Message}
        </Material.Typography>
      </span>
    </div>
  );

  /* 
  ====================
    RENDER
  ====================
  */

  return (
    <div id="page">
      <div id="body-wrap">

        {/* Navigation bar */}
        <div id="top" />
        <Material.AppBar
          id="nav"
          elevation={shadowNav ? 3 : 0}
          position="sticky"
        >
          <Material.Toolbar id="nav-bar">
            <span className="NavItems">
              <img
                id="nav-logo"
                alt="Logo"
                src={Data.Meta.Logo}
              />
              <Material.Typography
                id="nav-title"
                variant="h6"
              >
                {Data.Meta.Owner}
              </Material.Typography>
            </span>
            <span className="NavItems">
              {Data.Meta.Anchors.map(anchor =>
                <Material.Button
                  key={anchor.Name}
                  id={anchor.ID}
                  className="AnchorButton"
                  variant={anchor.Variant}
                  color={anchor.Color}
                  onClick={() => document
                    .getElementById(anchor.Link)
                    .scrollIntoView()}
                >
                  {anchor.Name}
                </Material.Button>
              )}
            </span>
          </Material.Toolbar>
        </Material.AppBar>

        {/* Header/hero */}
        <div id="about-section">
          <div
            id="hero"
            style={{ backgroundImage: "url(" + Data.Header.Hero + ")" }}
          />
          <Material.Typography
            id="title"
            variant="h1"
            paragraph
          >
            {Data.Header.Title}
          </Material.Typography>
          <Material.Typography
            id="subtitle"
            variant="h4"
          >
            {Data.Header.SubtitlePrefix}
            <TextTransition
              text={Data.Header.SubtitleItems[currentThing]}
              inline
            />
          </Material.Typography>
          <div className="HeaderSpacer" />
        </div>

        {/* Attributes */}
        <div id="attributes-section" className="Content">
          <div className="Attributes">
            {Data.Attributes.map(attr =>
              <div
                key={attr.Name}
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
                    <React.Fragment key={section.Title}>
                      <Material.Typography variant="h6">
                        {section.Title}
                      </Material.Typography>
                      {section.Content.map(item =>
                        <Material.Typography key={item}>
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
        <div className="SectionSpacer" />

        {/* Project portfolio */}
        <div className="Content" id="portfolio-section">
          <Material.Typography
            variant="h3"
            paragraph
            className="SectionHeader"
          >
            {Data.Portfolio.Title}
          </Material.Typography>
          <span className="GrayText">
            <Material.Typography variant="subtitle1" paragraph>
              {Data.Portfolio.Description}
            </Material.Typography>
          </span>
          <div className="PortfolioTiles">
            {Data.Portfolio.Projects.map(project =>
              project.Enabled ?
                <div
                  key={project.Title}
                  className="PortfolioProject"
                  style={{
                    backgroundImage: "url(" + project.Image + ")",
                    backgroundColor: "#00b9ff",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <div
                    className="Darken FullHeight"
                    onClick={() => project.Enabled ?
                      handleLink(project.Link) :
                      null}
                  >
                    <div className="ProjectTypography">
                      <Material.Typography variant="h6">
                        {project.Title}
                      </Material.Typography>
                      <Material.Typography
                        variant="caption"
                        style={{ textTransform: "uppercase" }}
                      >
                        {project.Year}
                      </Material.Typography>
                      <Material.Typography
                        variant="subtitle2"
                        style={{ opacity: 0.8 }}
                      >
                        {project.Description}
                      </Material.Typography>
                    </div>
                  </div>
                </div> : null
            )}
          </div>
        </div>
        <div className="SectionSpacer" />

        {/* Contact form */}
        <div className="Content" id="contact-section">
          <Material.Typography
            variant="h3"
            paragraph
            className="SectionHeader"
          >
            {Data.Contact.Title}
          </Material.Typography>
          <span className="GrayText">
            <Material.Typography variant="subtitle1">
              {Data.Contact.Description}
            </Material.Typography>
          </span>
          {message === MessageState.Initial ?
            contactForm :
            message === MessageState.Sending ?
              <Material.CircularProgress
                size={60}
                style={{ marginTop: "30px" }} 
              /> :
              infoCard}

        </div>
      </div>

      <footer id="footer">
        <div className="Content GrayText">
          <Material.Typography>
            {Data.Footer.Copyright.replace("{year}", new Date().getFullYear())}
          </Material.Typography>
          <Material.Typography variant="caption" paragraph>
            {Data.Footer.Subtext}
          </Material.Typography>
          <Material.Button
            variant="contained"
            color="primary"
            size="small"
            disableElevation
            onClick={() => handleLink(Data.Footer.PromotionLink)}
          >
            {Data.Footer.PromotionText}
          </Material.Button>
        </div>
      </footer>
    </div>
  );
}

export default App;
