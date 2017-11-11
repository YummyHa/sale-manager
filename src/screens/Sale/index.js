import React, { Component } from "react";
import { Container, Text, Header, Left, Body, Right, Title, Icon, Button } from "native-base";

class SaleScreen extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("welcome")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
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
