import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import { Map, Marker, TileLayer } from 'react-leaflet';
import IconButton from 'material-ui/IconButton';
import MapsNearMe from 'material-ui/svg-icons/maps/near-me';
import Star from 'material-ui/svg-icons/toggle/star';
import Flag from 'material-ui/svg-icons/content/flag';
import {amber500, red700} from 'material-ui/styles/colors';
import Badge from 'material-ui/Badge';
import firebase from 'firebase';

export default class FindingCard extends React.Component {

  constructor(props) {
    super(props);

    // bindings
    this.directions = this.directions.bind(this);
    this.toggleStar = this.toggleStar.bind(this);
    this.toggleFlag = this.toggleFlag.bind(this);
  }

  directions() {
    const { location } = this.props.finding;

    navigator.geolocation.getCurrentPosition((position) => {
      const sourceAddress = `${position.coords.latitude},${position.coords.longitude}`;
      const destAddress = `${location.latitude},${location.longitude}`;
      window.open(`https://maps.google.com/maps?saddr=${sourceAddress}&daddr=${destAddress}`)
    });
  }

  toggleStar() {
    const findingRef = firebase.database().ref(`findings/${this.props.finding[".key"]}`);
    const uid = '1234567890';
    findingRef.transaction(function(finding) {
      if (finding) {
        if (finding.stars && finding.stars[uid]) {
          finding.starCount--;
          finding.stars[uid] = null;
        } else {
          finding.starCount++;
          if (!finding.stars) {
            finding.stars = {};
          }
          finding.stars[uid] = true;
        }
      }
      return finding;
    });
  }

  toggleFlag() {
    const findingRef = firebase.database().ref(`findings/${this.props.finding[".key"]}`);
    const uid = '1234567890';
    findingRef.transaction(function(finding) {
      if (finding) {
        if (finding.flags && finding.flags[uid]) {
          finding.flagCount--;
          finding.flags[uid] = null;
        } else {
          finding.flagCount++;
          if (!finding.flags) {
            finding.flags = {};
          }
          finding.flags[uid] = true;
        }
      }
      return finding;
    });
  }

  render() {
    const { mon, location, starCount, flagCount } = this.props.finding;
    const position = [location.latitude, location.longitude];
    const map = (
      <Map style={{ height: '200px' }} center={position} zoom={16}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} />
      </Map>
    );
    return (
      <Card style={{ margin: '10px' }}>
        <CardHeader
          title={mon}
          subtitle="5 min ago"
          avatar="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable>
          Found by <i>Danilo Milani</i>
        </CardText>
        <CardMedia expandable={true}>
          {map}
        </CardMedia>
        <CardActions expandable>
          <div style={{ display: 'inline-block' }}>
          <IconButton tooltip="Let's go" onTouchTap={this.directions}>
            <MapsNearMe />
          </IconButton>
          </div>
          <div style={{ float: 'right' }}>
            <Badge
              style={{ padding: '0px 12px 0px 0px' }}
              badgeContent={flagCount}
              badgeStyle={{top: 13, right: 0}}
            >
              <IconButton tooltip="Report this finding" onTouchTap={this.toggleFlag}>
                <Flag color={red700} />
              </IconButton>
            </Badge>
            <Badge
              style={{ padding: '0px 12px 0px 0px' }}
              badgeContent={starCount}
              badgeStyle={{top: 13, right: 0}}
            >
              <IconButton tooltip="Star this finding" onTouchTap={this.toggleStar}>
                <Star color={amber500} />
              </IconButton>
            </Badge>
          </div>
        </CardActions>
      </Card>
    );
  }
}

FindingCard.propTypes = {
  finding: React.PropTypes.object,
};
