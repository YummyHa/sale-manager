import React, { Component } from "react";

import Welcome from "../../screens/Welcome";

export default class WelcomeContainer extends Component {
  render() {
    return <Welcome navigation={this.props.navigation} />;
  }
}
