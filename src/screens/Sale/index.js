import React, { Component } from "react";
import { BackHandler, StatusBar } from 'react-native';
import { Container, Text, Header, Left, Body, Right, Title, Icon, Button } from "native-base";

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
    return (
      <Container>
        <StatusBar
          translucent={false}
        /> 

        <Header>
          <Left />
          <Body>
            <Title>SaleScreen</Title>
          </Body>
          <Right />
        </Header>

        <Text>This is SaleScreen</Text>
      </Container>
    );
  }
}

export default SaleScreen;
