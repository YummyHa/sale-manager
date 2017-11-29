import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Text, Icon, Footer, FooterTab, StyleProvider, Badge } from 'native-base';

import getTheme from '../native-base-theme/components';

import * as actions from '../actions';

class TabBarBottom extends Component {
    render() {
        return <Footer>
            <FooterTab>
              <Button vertical active={this.props.navigationState.index === 0} onPress={() => this.props.navigation.navigate("sale")}>
                <StyleProvider style={getTheme({ iconFamily: "Entypo" })}>
                  <Icon name="shopping-bag" style={{ fontSize: 24 }} />
                </StyleProvider>
              </Button>
              <Button vertical active={this.props.navigationState.index === 1} onPress={() => this.props.navigation.navigate("orders")} badge>
                <Badge><Text>{this.props.ordering_total_items}</Text></Badge>
                <StyleProvider style={getTheme({ iconFamily: "FontAwesome" })}>
                  <Icon name="file-text-o" style={{ fontSize: 24 }} />                 
                </StyleProvider>               
              </Button>
              <Button vertical active={this.props.navigationState.index === 2} onPress={() => this.props.navigation.navigate("products")}>
                <Icon name="grid" style={{ fontSize: 24 }} />
              </Button>
              <Button vertical active={this.props.navigationState.index === 3} onPress={() => this.props.navigation.navigate("summary")}>
                <Icon name="md-pie" style={{ fontSize: 24 }} />
              </Button>
              <Button vertical active={this.props.navigationState.index === 4} onPress={() => this.props.navigation.navigate("settings")}>
                <StyleProvider style={getTheme({ iconFamily: "Entypo" })}>
                  <Icon name="shop" style={{ fontSize: 24 }} />
                </StyleProvider>
              </Button>
            </FooterTab>
          </Footer>;
    }
}

const mapStateToProps = (state) => {
  const { ordering_total_items } = state.orders;

  return { ordering_total_items };
}

export default connect(mapStateToProps, actions)(TabBarBottom);
