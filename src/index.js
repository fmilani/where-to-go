import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD6ctdUxa-lU4sSOjHmcaie6yrA38OgtkU",
  authDomain: "where-to-go-20c83.firebaseapp.com",
  databaseURL: "https://where-to-go-20c83.firebaseio.com",
  storageBucket: "where-to-go-20c83.appspot.com",
};
firebase.initializeApp(config);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
