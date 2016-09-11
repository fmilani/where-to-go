import React from 'react';
import ReactFireMixin from 'reactfire';
import firebase from 'firebase';
import FindingCard from './FindingCard.js';

const FindingsList = React.createClass({
  mixins: [ReactFireMixin],

  componentWillMount() {
    this.findingsRef = firebase.database().ref("findings");
    this.bindAsArray(this.findingsRef, "findings");
  },

  render() {
    return (
      <div>
        {
          this.state.findings.map(
            message => <FindingCard key={message[".key"]} finding={message} />
          )
        }
      </div>
    );
  }
});

export default FindingsList;
