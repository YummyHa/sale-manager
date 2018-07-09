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
import CreateProduct from './screens/Products/createProduct';
import BarCodeScanner from './screens/BarCodeScanner';
import ProductAttributes from './screens/ProductAttributes';
import CategoriesScreen from './screens/CategoriesScreen';
import CustomersScreen from './screens/Customers';
import ListOrders from "./screens/Orders/ListOrders";
import productDetail from './screens/Products/productDetail';
import ProductUpdate from './screens/Products/updateProduct';
import Receipt from './screens/Products/receipt';

const productNavigator = StackNavigator({
  product_index: { screen: Products },
  product_create: { screen: CreateProduct },
  product_attr: { screen: ProductAttributes },
  cate_screen: { screen: CategoriesScreen },
  product_detail: { screen: productDetail },
  product_update: { screen: ProductUpdate },
  product_receipt: { screen: Receipt },
}, {
    headerMode: 'none'
  });

const orderNavigator = StackNavigator({
  order_current: { screen: Orders },
  order_list: { screen: ListOrders }
}, {
  headerMode: 'none'
});

const MainNavigator = TabNavigator({
  sale: { screen: Sale },
  orders: { screen: orderNavigator },
  products: { screen: productNavigator },
  summary: { screen: Summary },
  settings: { screen: Settings },
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    tabBarComponent: props => <TabBarBottom {...props} />,
    lazy: true,
  });

const RootNavigator = StackNavigator({
  login: { screen: Login },
  welcome: { screen: Welcome },
  main: { screen: MainNavigator },
  scanner: { screen: BarCodeScanner },
  customers: { screen: CustomersScreen }
}, {
    headerMode: 'none',
  });

export default () => (
  <Root>
    <RootNavigator />
  </Root>
);
