import React, { Component } from 'react';
import { FlatList, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Text,
  Header,
  Left,
  Body,
  Right,
  Title,
  Icon,
  Button
} from "native-base";

import { updateRegisterInfos } from '../actions/authActions';

class CreateAccount extends Component {
  render() {
    return (
      <ImageBackground source={require("../images/sale-bg.png")} style={styles.backgroundImageStyle}>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
  const {  } = state.auth;

  return {  };
}

export default connect(mapStateToProps, { updateRegisterInfos })(CreateAccount);
