import React, { Component } from "react";

import Summary from "../../screens/Summary";

export default class SummaryContainer extends Component {
  render() {
    return <Summary navigation={this.props.navigation} />;
  }
}
