import React, { Component } from "react";
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Text, Button, Header, Left, Body, Right, Title } from "native-base";
import firebase from 'firebase';

import { userLogout } from '../Login/actions';

class SettingsScreen extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loggedIn) {
      this.props.navigation.navigate('login');
    }
  }

  signOut() {
     this.props.userLogout();
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
            <Title>Cài đặt</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Button 
            onPress={this.signOut.bind(this)}
            danger 
          >
            <Text>Log out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.auth;
  return { loggedIn };
};

export default connect(mapStateToProps, {
  userLogout
})(SettingsScreen);
