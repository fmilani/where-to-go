import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FindingsList from './FindingsList.js';
import FindingAdd from './FindingAdd.js';
import './App.css';

export default class App extends React.Component {

  render() {
    const findingAddHeight = '50px';
    const appBarHeight = '64px';

    return (
      <MuiThemeProvider>
        <div style={{ height: '100%' }}>
          <AppBar
            title="Let's GO"
            style={{
              position: 'fixed',
              height: appBarHeight,
            }}
          />
          <div
            style={{
              paddingTop: appBarHeight,
              marginBottom: findingAddHeight,
            }}
          >
            <FindingsList />
            <FindingAdd height={findingAddHeight} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
