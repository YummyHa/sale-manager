import React, { Component } from 'react';
import { Root } from 'native-base';
import { StackNavigator, TabNavigator } from 'react-navigation';

import TabBarBottom from './components/TabBarBottom';

import Login from './containers/LoginContainer';
import Orders from "./containers/OrdersContainer";
import Products from "./containers/ProductsContainer";
import Sale from "./containers/SaleContainer";
import Settings from './containers/SettingsContainer';
import Summary from "./containers/SummaryContainer";
import Welcome from "./containers/WelcomeContainer";

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
    welcome: { screen: Welcome },
    login: { screen: Login },
    main: {
        screen: MainNavigator
    },
    }, {
        headerMode: 'none'
    });

export default () => (
    <Root>
        <RootNavigator />
    </Root>
);
