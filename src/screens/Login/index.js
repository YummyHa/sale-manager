import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Button, Content, Icon, View } from "native-base";

class LoginScreen extends Component {
  render() {
    return (
      <Container style={styles.containerStyle}>
        <Container style={{ height: 200 }}>
          <View style={{ alignItems: "center" }}>
            <Icon name="flash" style={{ fontSize: 104 }} />
          </View>
        </Container>


      </Container>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  }
});

export default LoginScreen;
