import React, { Component } from "react";
import { Container, Content, Text, Header, Left, Body, Right, Title } from "native-base";

class SummaryScreen extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Thống kê</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Text>some content</Text>
        </Content>        
      </Container>
    );
  }
}

export default SummaryScreen;
