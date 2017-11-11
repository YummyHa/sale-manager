import React, { Component } from "react";

import Products from "../../screens/Products";

export default class ProductsContainer extends Component {
  render() {
    return <Products navigation={this.props.navigation} />;
  }
}
