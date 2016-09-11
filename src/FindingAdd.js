import React from 'react';
import ReactFireMixin from 'reactfire';
import firebase from 'firebase';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';

const matched = (text, data) => {
  if (!data) return false;

  return data.filter((value) => value[".key"] === text).length > 0;
};

const FindingAdd = React.createClass({
  mixins: [ReactFireMixin],

  componentWillMount() {
    this.monsRef = firebase.database().ref("mons");
    this.bindAsArray(this.monsRef, "mons");
  },

  addFinding(e) {
    e.preventDefault();

    if (!matched(this.refs.finding.state.searchText, this.state.mons)) return;

    navigator.geolocation.getCurrentPosition((position) => {
      firebase.database().ref("findings").push({
        mon: this.refs.finding.state.searchText,
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        time: moment().valueOf(),
        starCount: 0,
        flagCount: 0,
      });
      this.refs.finding.setState({ searchText: '' });
    });
  },

  render() {
    const dataSource = this.state.mons.map((mon) => mon[".key"]);

    return (
      <form onSubmit={this.addFinding}>
        <Paper
          rounded={false}
          style={{
            position: 'fixed',
            bottom: '0px',
            width: '100%',
            height: this.props.height,
            padding: '0px 10px',
            display: 'flex',
          }}
        >
          <AutoComplete
            name="finding"
            ref="finding"
            hintText="Which pokemon did you find?"
            fullWidth
            filter={AutoComplete.caseInsensitiveFilter}
            maxSearchResults={5}
            openOnFocus={true}
            dataSource={dataSource}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            targetOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          />
          <IconButton type="submit" >
            <ContentSend />
          </IconButton>
        </Paper>
      </form>
    );
  }
});

export default FindingAdd;
