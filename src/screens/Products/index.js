import React, { Component } from 'react';
import { BackHandler, StatusBar, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  View,
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
} from "native-base";

import getTheme from '../../native-base-theme/components';

// Dummy datas
const datas = [
  'Simon Mignolet',
  'Nathaniel Clyne',
  'Dejan Lovren',
  'Mama Sakho',
  'Alberto Moreno',
  'Emre Can',
  'Joe Allen',
  'Phil Coutinho',
];

class ProductsScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  renderItem = ({ item }) => {
    return (
      <ListItem thumbnail style={{ marginBottom: 1 }}>
        <Left>
          <Thumbnail square size={55} source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/51qmhXWZBxL.jpg' }} />
        </Left>
        <Body>
          <Text>{item}</Text>
          <Text numberOfLines={1} note>mau sac: do</Text>
          <Text numberOfLines={1} note>size: 30</Text>
          <Text numberOfLines={1} note>blah</Text>
        </Body>
        <Right>
          <Text style={{ color: '#4c2c09' }}>SL: 50</Text>
          <Text style={{ color: '#e58824' }}>50,000đ</Text>
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
            <StyleProvider style={getTheme({ iconFamily: "MaterialCommunityIcons" })}>
              <Icon active name="barcode-scan" style={{ color: '#222222' }} />
            </StyleProvider>
          </Item>
        </Header>

        <Container style={containerStyle}>
          <Item style={customerItemStyle} >
            <StyleProvider style={getTheme({ iconFamily: "MaterialCommunityIcons" })}>
              <Icon active name="sort-variant" style={{ fontSize: 20 }} />
            </StyleProvider>
            <Text style={{ fontSize: 13 }}>Tất cả</Text>
          </Item>

          <Fab
            active
            position='bottomRight'
            style={{ backgroundColor: '#26c6da' }}            
          >
            <Icon name="add" />
          </Fab>

          <Content style={listStyle}>
            <FlatList 
              data={datas}
              renderItem={this.renderItem}
              keyExtractor={item => item}
            />
          </Content>

        </Container>
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

export default ProductsScreen;
