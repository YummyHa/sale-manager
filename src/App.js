import React, { Component } from 'react';
import { Root } from 'native-base';
import { StackNavigator, TabNavigator } from 'react-navigation';

import TabBarBottom from './components/TabBarBottom';

import Login from './screens/Login';
import Orders from "./screens/Orders";
import Products from "./screens/Products";
import Sale from "./screens/Sale";
import Settings from './screens/Settings';
import Summary from "./screens/Summary";
import Welcome from "./screens/Welcome";

const MainNavigator = TabNavigator({
  sale: { screen: Sale },
  orders: { screen: Orders },
  products: { screen: Products },
  summary: { screen: Summary },
  settings: { screen: Settings },
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarComponent: props => <TabBarBottom {...props} />
}
);

const RootNavigator = StackNavigator({
  login: { screen: Login },
  welcome: { screen: Welcome },    
  main: {
      screen: MainNavigator
  }
}, {
    headerMode: 'none',     
});

export default () => (
    <Root>
        <RootNavigator />
    </Root>
);
