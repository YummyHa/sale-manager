import React, { Component } from 'react';
import _ from 'lodash';
import { AppLoading } from 'expo';
import { Keyboard, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { StyleSheet, StatusBar, ImageBackground, Dimensions, Image } from 'react-native';
import { Container, Text, Button, Content, Icon, View, Input, Form, Item, StyleProvider, Spinner } from "native-base";

import getTheme from '../../native-base-theme/components';
import { emailChanged, passwordChanged, emailLogin, checkLogin } from '../../actions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.checkLogin();
    // AsyncStorage.removeItem('logged_in');
  }

  async componentWillReceiveProps(nextProp) {
    let user_loggedIn = await AsyncStorage.getItem('logged_in');
    if (nextProp.loggedIn && _.isNull(user_loggedIn)) {
      this.props.navigation.navigate('welcome');
    } else if (nextProp.loggedIn && user_loggedIn) {
      this.props.navigation.navigate('main');
    }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onEmailLogin() {
    const { email, password } = this.props;
    Keyboard.dismiss();
    this.props.emailLogin({email, password});
  }

  renderButton() {
    if (this.props.loading) {
      return (
        <Button
          success
          full
          rounded
          style={{ marginBottom: 20, marginLeft: 10, marginRight: 10 }}
        >
          <Spinner color="#fff" />
        </Button>       
      );     
    }

    return <Button
      onPress={this.onEmailLogin.bind(this)}
      success
      full
      rounded
      style={{ marginBottom: 20, marginLeft: 10, marginRight: 10 }}
    >
      <Text style={{ color: "#fff" }}>Đăng nhập</Text>
    </Button>
  }

  renderContent() {
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
            <Form style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }} returnKeyType='next'>

              {/* Email Input */}
              <Item rounded style={{ backgroundColor: "rgba(248, 248, 248, 0.3)" }}>
                <StyleProvider style={getTheme({ iconFamily: "MaterialCommunityIcons" })}>
                  <Icon active name="email-outline" style={{ color: '#fff', fontSize: 20 }} />
                </StyleProvider>
                <Input
                  placeholder="Email"
                  placeholderTextColor="#fff"
                  keyboardType='email-address'
                  style={{ color: '#fff', fontSize: 14 }}
                  onChangeText={this.onEmailChange.bind(this)}
                  value={this.props.email}
                />
              </Item>

              <View style={{ height: 10 }} />

              {/* Password Input */}
              <Item rounded style={{ backgroundColor: "rgba(248, 248, 248, 0.3)" }}>
                <StyleProvider style={getTheme({ iconFamily: "MaterialCommunityIcons" })}>
                  <Icon active name="lock-open-outline" style={{ color: '#fff', fontSize: 20 }} />
                </StyleProvider>
                <Input
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  secureTextEntry
                  style={{ color: '#fff', fontSize: 14 }}
                  onChangeText={this.onPasswordChange.bind(this)}
                  value={this.props.password}
                />
              </Item>
            </Form>

            <Text style={styles.errorMessage}>{this.props.error}</Text>
            <View style={{ height: 20 }} />

            {this.renderButton()}

            <Container style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20 }}>
              <Text style={styles.textStyle}>Quên mật khẩu?</Text>
              <Text style={styles.textStyle}>Tạo tài khoản</Text>
            </Container>

          </Content>
        </Container>
      </ImageBackground>
    );   
  }

  render() {
    if (this.props.isChecking) {
      return (
        <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <AppLoading /> 
        </Container>
      );
    }

    return this.renderContent();
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
  },
  errorMessage: {
    color: '#c62828',
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5
  },
  checkingSpinner: {
    alignSelf: 'center'
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, loggedIn, isChecking } = auth;
  return { email, password, error, loading, loggedIn, isChecking }; 
};

export default connect(mapStateToProps, { 
  emailChanged, passwordChanged, emailLogin, checkLogin 
})(LoginScreen);
