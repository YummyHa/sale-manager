import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import { Header, Button, Icon, Left, Body, Right, Title, Container, Content, Text } from 'native-base';

import { productUpdate } from '../actions/productActions';

class Scanner extends Component {
  state = {
    hasCameraPermission: null,
    torchMode: 'off'
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = ({ type, data }) => {
    this.props.productUpdate({ prop: 'code', value: data });
    this.props.navigation.goBack();
  };

  onChangeTorchMode() {
    this.state.torchMode === 'off' ? this.setState({ torchMode: 'on' }) : this.setState({ torchMode: 'off' })
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                active
                name="close"
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>

          <Body>
            <Title>Đang dò...</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={this.onChangeTorchMode.bind(this)}
            >
              <Text uppercase={false}>Bật/tắt đèn</Text>
            </Button>
          </Right>
        </Header>

        <View style={styles.container}>
          {this.state.hasCameraPermission === null ?
            <Text>Requesting for camera permission</Text> :
            this.state.hasCameraPermission === false ?
              <Text>Camera permission is not granted</Text> :
              <BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={StyleSheet.absoluteFill}
                torchMode={this.state.torchMode}
              />
          }
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = (state) => {
  const { code } = state.product;

  return { code };
}

export default connect(mapStateToProps, { productUpdate })(Scanner);
