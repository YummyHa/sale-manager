import React, { Component } from "react";
import { Container, Content, Text, Header, Left, Body, Right, Title } from "native-base";

class OrdersScreen extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Hóa đơn</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>some content</Text>
        </Content>
      </Container>
    );
  }
}

export default OrdersScreen;
