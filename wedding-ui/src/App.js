import React, { Component } from 'react';

//components
import ContentSection from './Components/ContentSection';

//Theme Imports
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';

//Theme setup
const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

class App extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <ContentSection />
        </MuiThemeProvider>
      </div>
    );
  }
}
export default App;
