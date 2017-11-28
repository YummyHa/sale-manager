import React, { Component } from 'react';
import { BackHandler, StatusBar, StyleSheet, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Text,
  Header,
  Left,
  Body,
  Right,
  Title,
  Icon,
  Button,
  Item,
  Input,
  StyleProvider,
  List,
  ListItem,
  Thumbnail,
  Fab,
  Spinner
} from "native-base";

import getTheme from '../../native-base-theme/components';

import * as actions from '../../actions/productActions';

class ProductsScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.props.fetchListProduct();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  renderItem = ({ item }) => {
    let attrList = item.attr.map((r, i) => {
      return <Text key={r.attrName} numberOfLines={1} note>{r.attrName}: {r.value}</Text>
    });

    return (
      <ListItem thumbnail style={{ marginBottom: 1, minHeight: 60 }}>
        <Left>
          <Thumbnail square source={require("../../images/product-default.png")} />
        </Left>
        <Body>
          <Text>{item.name}</Text>
          {console.log(item.attr)}
          {item.attr.length === 0 ? <Text numberOfLines={1} note>Chưa có thuộc tính...</Text> : attrList}
          {item.desc !== "" ? <Text numberOfLines={1} note>{item.desc}</Text> : <Text numberOfLines={1} note>Chưa có mô tả...</Text>}
        </Body>
        <Right>
          <Text style={{ color: '#4c2c09' }}>SL: {item.quantity}</Text>
          <Text style={{ color: '#e58824' }}>{item.sell_price} đ</Text>
        </Right>
      </ListItem>
    );
  }

  render() {
    const { customerItemStyle, containerStyle, listStyle } = styles;

    return (
      <Container>
        <StatusBar
          translucent={false}
        />

        <Header searchBar rounded>
          <Item>
            <Icon active name="ios-search" style={{ color: '#222222' }} />
            <Input
              placeholder="Tìm kiếm..."
              placeholderTextColor="#222222"
              style={{
                color: "#222222"
              }}
            />
            <Icon active name='add' style={{ color: '#222222' }} onPress={() => this.props.navigation.navigate('product_create')} />
            <StyleProvider style={getTheme({ iconFamily: "MaterialCommunityIcons" })}>
              <Icon active name="barcode-scan" style={{ color: '#222222' }} onPress={() => {
                this.props.navigation.navigate('product_create');
                this.props.navigation.navigate('scanner');
              }} />
            </StyleProvider>
          </Item>
        </Header>

        {this.props.isLoadingProducts === false ? <Container style={containerStyle}>
          <Item style={customerItemStyle} >
            <StyleProvider style={getTheme({ iconFamily: "MaterialCommunityIcons" })}>
              <Icon active name="sort-variant" style={{ fontSize: 20 }} />
            </StyleProvider>
            <Text style={{ fontSize: 13 }}>Tất cả</Text>
          </Item>

          <Content style={listStyle}>
            <FlatList
              data={this.props.products}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
            />
          </Content>
        </Container> : <Spinner color="#039be5" />}

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
  },
  customerItemStyle: {
    height: 35,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  listStyle: {
    backgroundColor: '#fff'
  }
});

const mapStateToProps = (state) => {
  const { products, isLoadingProducts } = state.list_product;

  return { products, isLoadingProducts };
}

export default connect(mapStateToProps, actions)(ProductsScreen);
