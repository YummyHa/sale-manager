import React, { Component } from "react";
import _ from 'lodash';
import { StyleSheet, TouchableOpacity, TouchableNativeFeedback, Alert, Image, FlatList, Dimensions } from 'react-native';
import { Permissions, ImagePicker } from 'expo';
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
  Form,
  Input,
  Item,
  StyleProvider,
  View,
  ActionSheet,
  Toast
} from "native-base";

import * as actions from '../../actions/productActions';

import getTheme from '../../native-base-theme/components';

class productDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item }) => {
    const { sectionStyle } = styles;
    return (
      <View
        style={sectionStyle}
      >
        <Text>{item.attrName}</Text>
        <Text>{item.value}</Text>
      </View>
    );
  }

  onDeleteProduct() {
    Alert.alert(
      'Xóa',
      'Bạn thật sự muốn xóa mặt hàng này chứ?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'OK', onPress: () => this.deleteProductConfirm() },
      ],
      { cancelable: true }
    )
  }

  async deleteProductConfirm() {
    let list = this.props.products.slice();
    let id = this.props.choosingProduct.id;
    let removeIndex = list.map(function (item) { return item.id; })
      .indexOf(id);
    ~removeIndex && list.splice(removeIndex, 1);
    await this.props.deleteCurrentProduct(id, list, () => this.props.navigation.goBack());
  }

  render() {
    const {
      imageStyle,
      imageContainerStyle,
      photoStyle,
      sectionStyle,
      divideView,
      textStyle
    } = styles;

    return (
      <Container>
        <LoadingSpinner visible={this.props.isDeletingProduct} animation='fade' />
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: '#fff' }} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#fff' }}>{this.props.choosingProduct.name}</Title>
          </Body>
          <Right>
            {/* edit button */}
            <StyleProvider style={getTheme({ iconFamily: "MaterialIcons" })}>
              <Icon 
                name="edit" 
                style={{ color: '#fff', fontSize: 24 }} 
                onPress={() => {
                  this.props.goToUpdateProduct();
                  this.props.navigation.navigate('product_update');
                }}
              />
            </StyleProvider>

            {/* delete button */}
            <StyleProvider style={getTheme({ iconFamily: "MaterialIcons" })}>
              <Icon 
                name="delete" 
                style={{ color: '#fff', fontSize: 24, marginLeft: 20 }} 
                onPress={() => this.onDeleteProduct()}
              />
            </StyleProvider>
          </Right>
        </Header>

        <Content padder>
          <View style={imageContainerStyle}>
            {this.props.choosingProduct.image === '' ?
              <Icon name="camera" style={photoStyle} /> :
              <Image source={{ uri: this.props.choosingProduct.image }} style={imageStyle} />
            }
          </View>
          
          {/* product id */}
          <View
            style={sectionStyle}
          >
            <Text>Mã hàng:</Text>
            <Text style={textStyle}>{this.props.choosingProduct.id}</Text>
          </View>

          {/* name */}
          <View
            style={sectionStyle}
          >
            <Text>Tên hàng:</Text>
            <Text style={textStyle}>{this.props.choosingProduct.name}</Text>
          </View>

          {/* cate */}
          <View
            style={sectionStyle}
          >
            <Text>Nhóm hàng:</Text>
            <Text style={textStyle}>{this.props.choosingProduct.cate}</Text>
          </View>

          {/* sell price */}
          <View
            style={sectionStyle}
          >
            <Text>Giá bán:</Text>
            <Text style={textStyle}>{this.props.choosingProduct.sell_price}</Text>
          </View>

          {/* origin price */}
          <View
            style={sectionStyle}
          >
            <Text>Giá vốn:</Text>
            <Text style={textStyle}>{this.props.choosingProduct.orgin_price}</Text>
          </View>

          {/* quantity */}
          <View
            style={sectionStyle}
          >
            <Text>Tồn kho:</Text>
            <Text style={textStyle}>{this.props.choosingProduct.quantity}</Text>
          </View>

          <View style={divideView} />

          {/* attributes */}
          {_.isEmpty(this.props.choosingProduct.attr) ? <View
            style={sectionStyle}
          >
            <Text>Chưa có thuộc tính</Text>
          </View> : <FlatList 
            data={this.props.choosingProduct.attr}
            renderItem={this.renderItem}
            keyExtractor={item => item.attrName}
          />}  

          <View style={divideView} />

          {/* product desc */}
          <View
            style={sectionStyle}
          >
            <Text>Ghi chú thêm:</Text>
            <Text style={textStyle}>{this.props.choosingProduct.desc}</Text>
          </View>

          <View style={divideView} />

          <View
            style={{
              padding: 10,
              backgroundColor: '#fff',
            }}           
          >
            <Button full info onPress={() => this.props.navigation.navigate('product_receipt')}>
              <Text uppercase={false} style={{ color: '#fff' }}>Nhập hàng</Text>
            </Button>
          </View>

          <View style={divideView} />         
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imageContainerStyle: {
    height: 250, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  sectionStyle: {
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#cdcaca',
    borderBottomWidth: 0.3,
  },
  photoStyle: {
    height: 200,
    color: '#cdcaca',
    fontSize: 200,
    alignSelf: 'center',
  },
  imageStyle: {
    height: 240,
    width: 240,
    borderRadius: 5,
  },
  divideView: {
    height: 20
  },
  textStyle: {
    color: '#cdcaca'
  }
});

const mapStateToProps = (state) => {
  const { choosingProduct } = state.product;
  const { products, isDeletingProduct } = state.list_product;

  return { choosingProduct, products, isDeletingProduct };
}

export default connect(mapStateToProps, actions)(productDetail);
