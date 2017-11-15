import React, { Component } from "react";
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
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
  Thumbnail 
} from "native-base";

import getTheme from '../../native-base-theme/components';

class SaleScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
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
              placeholder="Tìm kiếm hàng để bán..." 
              placeholderTextColor="#222222" 
              style={{
                color: "#222222"
              }}
            />
            <StyleProvider style={getTheme({ iconFamily: "MaterialCommunityIcons" })}>
              <Icon active name="barcode-scan" style={{ color: '#222222'}} />
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

          <Content style={listStyle}>
            <List>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square size={80} source={{ uri: 'Image URL' }} />
                </Left>
                <Body>
                  <Text>Ao So mi</Text>
                  <Text note>blah blah blah blah . .</Text>
                </Body>
                <Right>
                  <Text>Thêm HĐ</Text>
                </Right>               
              </ListItem>
            </List>
          </Content>

        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 5
  },
  customerItemStyle: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    borderBottomWidth: 0,
  },
  listStyle: {
    backgroundColor: '#fff'
  }
});

export default SaleScreen;
