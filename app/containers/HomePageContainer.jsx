import React from 'react'
import { Link } from 'react-router'

var xrandrparse = require('xrandr-parse');
var exec = require('child_process').exec;
 
export default class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {screens:[]}

    var that = this;
    exec('xrandr', function (err, stdout) {
        var screens = xrandrparse(stdout);
        var connected_screens = [];
        for (var name in screens){
          var screen = screens[name]; 
          if (screen.connected){
            screen.name = name;
            connected_screens.push(screen);
          }
        }
        that.setState({screens: connected_screens});
      });
  }

  render() {
    return (
      <div>
      <h2>XBrightness</h2>
      <p>{this.state.screens.map(function(screen){
            return <Screen screen={screen} />;
          })}</p>
      </div>
    )
  }

}

function updateBrightness(elem){
  var command = "xrandr --output " + this.props.id + " --brightness "  + (elem.currentTarget.value / 100);
    exec(command, function (err, stdout) {
        // console.log("done: " + command);
      });
  }


var Screen = React.createClass({
 
      propTypes: {
        screen: React.PropTypes.object.isRequired
      },

      render: function() {
        return (
          <div>
          <fieldset>
          <h3>{this.props.screen.name} ({this.props.screen.width}x{this.props.screen.height})</h3>
         Min <input onChange={updateBrightness} id={this.props.screen.name} type="range" defaultValue={100} /> Max
          </fieldset>
          <br/>
          </div>
        );
    }

})
