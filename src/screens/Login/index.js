import React, { Component } from 'react';
import { StyleSheet, StatusBar, ImageBackground, Dimensions, Image } from 'react-native';
import { Container, Text, Button, Content, Icon, View, Input, Form, Item, StyleProvider, Label } from "native-base";

import getTheme from '../../native-base-theme/components';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class LoginScreen extends Component {
  render() {
    return (
      <ImageBackground source={require("../../images/sale-bg.png")} style={styles.backgroundImageStyle}>
        <StatusBar
          translucent={true}
          barStyle="light-content"
          backgroundColor="transparent"
        /> 
        <Container>  
          <Content keyboardShouldPersistTaps='handled'>
            {/* Header icon */}
            <Image source={require("../../images/sale-icon.png")} style={styles.headerIconStyle} />

            {/* input and login button */}
            <Form style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
              <Item rounded style={{ backgroundColor: "rgba(248, 248, 248, 0.3)" }}>
                <StyleProvider style={getTheme({ iconFamily: "MaterialCommunityIcons" })}>
                  <Icon active name="email-outline" style={{ color: '#fff', fontSize: 20 }} />
                </StyleProvider>
                <Input 
                  placeholder="Email" 
                  placeholderTextColor="#fff" 
                  style={{ color: '#fff', fontSize: 14 }}
                  blurOnSubmit={false}        
                />
              </Item>

              <View style={{ height: 10 }} />

              <Item rounded style={{ backgroundColor: "rgba(248, 248, 248, 0.3)" }}>
                <StyleProvider style={getTheme({ iconFamily: "MaterialCommunityIcons" })}>
                  <Icon active name="lock-open-outline" style={{ color: '#fff', fontSize: 20 }} />
                </StyleProvider>
                <Input placeholder="Password" placeholderTextColor="#fff" style={{ color: '#fff', fontSize: 14 }} />
              </Item>
            </Form>

            <View style={{ height: 20 }} />

            <Button
              success
              full
              rounded
              style={{ marginBottom: 20, marginLeft: 10, marginRight: 10 }}
            >
              <Text style={{ color: "#fff" }}>Login</Text>
            </Button>

            <Container style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20 }}>
              <Text style={styles.textStyle}>Forgot password?</Text>
              <Text style={styles.textStyle}>Create new account</Text>
            </Container>
          </Content>

                   
        </Container>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#f8f8f8",
  },
  backgroundImageStyle: {
    flex: 1,
    width: width,
    height: height,
  },
  headerIconStyle: {
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  textStyle: {
    color: '#fff', 
    fontSize: 14
  }
});

export default LoginScreen;
