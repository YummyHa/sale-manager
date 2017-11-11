import React, { Component } from "react";

import Orders from "../../screens/Orders";

export default class OrdersContainer extends Component {
  render() {
    return <Orders navigation={this.props.navigation} />;
  }
}
