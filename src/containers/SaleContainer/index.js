import React, { Component } from "react";

import Sale from "../../screens/Sale";

export default class SaleContainer extends Component {
  render() {
    return <Sale navigation={this.props.navigation} />;
  }
}
