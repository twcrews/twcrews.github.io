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
    STATE
  ====================
  */

  const [shadowNav, setShadowNav] = useState(false);
  const [currentThing, setCurrentThing] = useState(0);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(null);
  const [dialogMessage, setDialogMessage] = useState(null);

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
      .then(() => {
        var dialog = Data.Dialog.SubmitSuccess;
        setDialogTitle(dialog.Title);
        setDialogMessage(dialog.Message);
        setDialog(true);
      })
      .catch(e => {
        var dialog = Data.Dialog.SubmitFail;
        setDialogTitle(dialog.Title);
        setDialogMessage(dialog.Message);
        setDialog(true);
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
      setFormErrors(true);
    } else {
      submitForm();
    }
  };
  const handleDialogClose = () => { setDialog(false); };

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
    RENDER
  ====================
  */

  return (
    <div className="Page">

      {/* Reusable dialog */}
      <Material.Dialog
        open={dialog}
        onClose={handleDialogClose}
      >
        <Material.DialogTitle>
          {dialogTitle}
        </Material.DialogTitle>
        <Material.DialogContent>
          <Material.DialogContentText>
            {dialogMessage}
          </Material.DialogContentText>
        </Material.DialogContent>
        <Material.DialogActions>
          <Material.Button onClick={handleDialogClose}>
            Dismiss
          </Material.Button>
        </Material.DialogActions>
      </Material.Dialog>
      <div className="BodyWrap">

        {/* Navigation bar */}
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
              {Data.Meta.Anchors.map(anchor =>
                <Material.Button
                  key={anchor.Name}
                  id={anchor.Name}
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
        <div
          className="AboutSection"
        >
          <div
            className="Hero"
            style={{ backgroundImage: "url(" + Data.Header.Hero + ")" }}
          />
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

        {/* Attributes */}
        <div className="AttributesSection Content">
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

        {/* Project portfolio */}
        <div className="Content" id="portfolio">
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
              </div>
            )}
          </div>
        </div>

        {/* Contact form */}
        <div className="Content" id="contact">
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
          <div className="ContactFields">
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
                      error={formErrors && !fieldValid(field)}
                      helperText={formErrors && !fieldValid(field) ?
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
                        error={formErrors && !fieldValid(field)}
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
                          {formErrors && !fieldValid(field) ?
                            field.HelperText : null}
                        </Material.FormHelperText>
                      </Material.FormControl> : null
                }
              </div>
            )}
          </div>
          <div className="SendButton">
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
        </div>
      </div>
      
      <footer className="Footer">
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
