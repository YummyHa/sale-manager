import React, { Component } from "react";
import _ from 'lodash';
import { StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import LoadingSpinner from 'react-native-loading-spinner-overlay';
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
  Button,
  StyleProvider,
  View,
  Toast
} from "native-base";

import getTheme from '../../native-base-theme/components';

import * as actions from '../../actions/productActions';
import ProductForm from './productForm';

class updateProduct extends Component {
  componentWillMount() {
    _.each(this.props.choosingProduct, (value, prop) => {
      this.props.productUpdate({ prop, value });
    });
  }

  onUpdateProduct() {
    const { id, name, cate, sell_price, orgin_price, quantity, desc, image, attr } = this.props;
    if (name === '') {
      Toast.show({
        text: 'Tên sản phẩm không được để trống!',
        position: 'bottom',
        type: 'warning',
        duration: 2000
      });
    } else if (cate === '') {
      Toast.show({
        text: 'Bạn phải chọn một loại sản phẩm!',
        position: 'bottom',
        type: 'warning',
        duration: 2000
      });
    } else {
      try {
        // this.props.uploadImage(img_base64_string);
        this.props.updateProductChanges({ id, name, cate, sell_price, orgin_price, quantity, desc, image, attr }, () => {
          this.props.navigation.goBack();
        });
      } catch (error) {
        console.log(error);
      }

    }
  }

  render() {
    const {
      containerStyle
    } = styles;

    return (
      <Container>
        <LoadingSpinner visible={this.props.isProductSpinnerLoading} animation='fade' />
        <Header>
          <Left>
            <Button transparent>
              <Icon
                active
                name="close"
                onPress={() => this.props.navigation.goBack()}
                style={{ color: '#fff' }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#fff' }}>Chỉnh sửa hàng</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.onUpdateProduct()}
            >
              <Text style={{ color: '#fff' }}>Lưu</Text>
            </Button>
          </Right>
        </Header>

        <Content style={containerStyle}>
          <ProductForm {...this.props} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  }
});

const mapStateToProps = (state) => {
  const { id, name, cate, sell_price, orgin_price, quantity, desc, image, attr, choosing_index, isProductSpinnerLoading, choosingProduct } = state.product;

  return { id, name, cate, sell_price, orgin_price, quantity, desc, image, attr, choosing_index, isProductSpinnerLoading, choosingProduct };
}

export default connect(mapStateToProps, actions)(updateProduct);
