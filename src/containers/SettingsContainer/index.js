import React, { Component } from "react";

import Settings from "../../screens/Settings";

export default class SettingsContainer extends Component {
  render() {
    return <Settings navigation={this.props.navigation} />;
  }
}
