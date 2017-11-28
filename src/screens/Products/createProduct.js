import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, TouchableNativeFeedback, Image, Alert } from 'react-native';
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

import getTheme from '../../native-base-theme/components';

import * as actions from '../../actions/productActions';
import { addNewAttr } from "../../actions/index";

let CAMERA_OPTIONS = ["Chụp hình", "Chọn từ bộ nhớ", "Hủy"];
let CANCEL_INDEX = 2;

class createProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: null };
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    status === 'granted' ? this.props.navigation.navigate('scanner') :
      alert('Cần cấp quyền camera để sử dụng chức năng này');
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });

    this._handleImagePicked(pickerResult);
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true
    });

    this._handleImagePicked(pickerResult);
  };

  pickActionComplete() {
    if (this.state.clicked === "Chụp hình") {
      this._takePhoto();
    } else if (this.state.clicked === "Chọn từ bộ nhớ") {
      this._pickImage();
    }
  }

  _handleImagePicked = async pickerResult => {
    this.props.productUpdate({ prop: 'img_local_uri', value: pickerResult.uri });
    this.props.productUpdate({ prop: 'img_base64_string', value: pickerResult.base64 });
  }

  onAddAttr() {
    let check = false;
    for (let item of this.props.attr) {
      if (item.attrName === 'Thuộc tính' || item.value === '') {
        check = true;
        break;
      }
    }
    if (check) {
      Toast.show({
        text: 'Thuộc tính và giá trị không được để trống!',
        position: 'bottom',
        type: 'warning',
        duration: 2000
      });
    } else {
      this.props.addNewAttr();
    }
  }

  onCreateNewProduct() {
    const { code, name, cate, sell_price, orgin_price, quantity, desc, image, attr, img_local_uri, img_base64_string } = this.props;
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
        this.props.uploadImage(img_base64_string);
        this.props.addNewProductToFireStore({ code, name, cate, sell_price, orgin_price, quantity, desc, image, attr }, () => {
          this.props.navigation.goBack();
        });
      } catch (error) {
        console.log(error);
      }

    }
  }

  render() {
    const {
      photoStyle,
      containerStyle,
      inputTextStyle,
      labelStyle,
      inputContainerStyle,
      formStyle,
      divideView,
      attrStyle,
      imageStyle
    } = styles;

    let rows = this.props.attr.map((r, i) => {
      return <Item key={r.attrName} style={inputContainerStyle}>
        <TouchableOpacity
          style={{ width: 150 }}
          onPress={() => this.props.choosingAttribute(i, () => this.props.navigation.navigate('product_attr'))}
        >
          <Text style={{ color: '#222222' }}>{r.attrName}</Text>
        </TouchableOpacity>
        <Icon name='ios-arrow-forward' style={{ color: '#222222' }} />

        <Input
          style={inputTextStyle}
          placeholder='Giá trị'
          onChangeText={value => this.props.updateAttr({ prop: 'value', value: value, index: i })}
          value={r.name}
        />

        <Icon
          name="close"
          style={{ color: 'red' }}
          onPress={() => Alert.alert(
            'Xóa',
            'Bạn thật sự muốn xóa thuộc tính này chứ?',
            [
              { text: 'Hủy', style: 'cancel' },
              { text: 'OK', onPress: () => this.props.removeAttr(i) },
            ],
            { cancelable: true }
          )}
        />
      </Item>
    });

    return (
      <Container>
        <LoadingSpinner visible={this.props.isProductSpinnerLoading} animation='fade' />
        <Header>
          <Left>
            <Button transparent>
              <Icon
                active
                name="close"
                onPress={() => this.props.resetProductCreate(() => this.props.navigation.goBack())}
              />
            </Button>
          </Left>
          <Body>
            <Title>Thêm hàng hóa</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.onCreateNewProduct()}
            >
              <Text>Lưu</Text>
            </Button>
          </Right>
        </Header>

        <Content style={containerStyle}>
          <TouchableOpacity onPress={() => ActionSheet.show({
            options: CAMERA_OPTIONS,
            cancelButtonIndex: CANCEL_INDEX,
            title: "Chọn hình thức"
          }, buttonIndex => {
            this.setState({ clicked: CAMERA_OPTIONS[buttonIndex] }, () => {
              this.pickActionComplete();
            });
          }
          )}>
            <View style={{ height: 250, justifyContent: 'center', alignItems: 'center' }}>
              {this.props.img_local_uri === '' ?
                <Icon name="camera" style={photoStyle} /> :
                <Image source={{ uri: this.props.img_local_uri }} style={imageStyle} />
              }
            </View>
          </TouchableOpacity>

          <Form style={formStyle}>
            {/* Product Code */}
            <Item style={inputContainerStyle}>
              <Text style={labelStyle}>Mã hàng</Text>
              <Input
                style={inputTextStyle}
                placeholder='Mã hàng tự động'
                placeholderTextColor='#cecece'
                onChangeText={value => this.props.productUpdate({ prop: 'code', value })}
                value={this.props.code}
              />
              <TouchableOpacity onPress={this.requestCameraPermission.bind(this)}>
                <StyleProvider style={getTheme({ iconFamily: "MaterialCommunityIcons" })}>
                  <Icon active name="barcode-scan" style={{ color: '#222222' }} />
                </StyleProvider>
              </TouchableOpacity>
            </Item>

            {/* Product name */}
            <Item style={inputContainerStyle}>
              <Text style={labelStyle}>Tên hàng</Text>
              <Input
                style={inputTextStyle}
                placeholder='Tên hàng'
                placeholderTextColor='#cecece'
                onChangeText={value => this.props.productUpdate({ prop: 'name', value })}
                value={this.props.name}
              />
            </Item>

            {/* Category */}
            <Item style={inputContainerStyle}>
              <Text style={labelStyle}>Nhóm hàng</Text>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('cate_screen')}>
                <Input
                  disabled
                  style={inputTextStyle}
                  placeholder='Chọn nhóm hàng'
                  placeholderTextColor='#222'
                  value={this.props.cate}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('cate_screen')}>
                <Icon name='ios-arrow-forward' style={{ color: '#222222' }} />
              </TouchableOpacity>
            </Item>

            {/* Sell price */}
            <Item style={inputContainerStyle}>
              <Text style={labelStyle}>Giá bán</Text>
              <Input
                style={inputTextStyle}
                placeholder='0'
                placeholderTextColor='#222'
                keyboardType='numeric'
                onChangeText={value => this.props.productUpdate({ prop: 'sell_price', value })}
                value={this.props.sell_price}
              />
            </Item>

            {/* Origin Price */}
            <Item style={inputContainerStyle}>
              <Text style={labelStyle}>Giá vốn</Text>
              <Input
                style={inputTextStyle}
                placeholder='0'
                placeholderTextColor='#222'
                keyboardType='numeric'
                onChangeText={value => this.props.productUpdate({ prop: 'orgin_price', value })}
                value={this.props.orgin_price}
              />
            </Item>

            {/* Quantity */}
            <Item style={inputContainerStyle}>
              <Text style={labelStyle}>Tồn kho</Text>
              <Input
                style={inputTextStyle}
                placeholder='0'
                placeholderTextColor='#222'
                keyboardType='numeric'
                onChangeText={value => this.props.productUpdate({ prop: 'quantity', value })}
                value={this.props.quantity}
              />
            </Item>
          </Form>

          <View style={divideView} />

          {/* Add Attributes */}
          <Form style={formStyle}>
            {rows}

            <Item style={{ borderBottomWidth: 0, marginTop: 10, marginBottom: 10 }}>
              <StyleProvider style={getTheme({ iconFamily: "MaterialIcons" })}>
                <Icon style={{ color: '#039be5' }} name="add-circle-outline" />
              </StyleProvider>
              <TouchableOpacity
                onPress={() => this.onAddAttr()}
              >
                <Text style={{ color: '#039be5', marginLeft: 5 }}>Thêm thuộc tính</Text>
              </TouchableOpacity>
            </Item>
          </Form>

          <View style={divideView} />

          <Form style={formStyle}>
            {/* Product Code */}
            <Item style={inputContainerStyle}>
              <Text style={labelStyle}>Ghi chú</Text>
              <Input
                style={inputTextStyle}
                placeholder='Ghi chú'
                placeholderTextColor='#cecece'
                onChangeText={value => this.props.productUpdate({ prop: 'desc', value })}
                value={this.props.desc}
              />
            </Item>
          </Form>

          <View style={divideView} />

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  photoStyle: {
    height: 200,
    color: '#cdcaca',
    fontSize: 200,
    alignSelf: 'center',
  },
  containerStyle: {
    flex: 1,
  },
  inputTextStyle: {
    color: '#222222',
  },
  labelStyle: {
    color: '#222222',
    width: 100
  },
  inputContainerStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    borderBottomColor: '#222',
    borderBottomWidth: 0.3,
  },
  formStyle: {
    backgroundColor: '#fff',
    paddingRight: 10
  },
  divideView: {
    height: 20
  },
  attrStyle: {
    backgroundColor: '#fff',
    paddingRight: 10,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center'
  },
  imageStyle: {
    height: 240,
    width: 240,
    borderRadius: 5,
  }
});

const mapStateToProps = (state) => {
  const { code, name, cate, sell_price, orgin_price, quantity, desc, image, attr, choosing_index, img_local_uri, img_base64_string, isProductSpinnerLoading } = state.product;

  return { code, name, cate, sell_price, orgin_price, quantity, desc, image, attr, choosing_index, img_local_uri, img_base64_string, isProductSpinnerLoading };
}

export default connect(mapStateToProps, actions)(createProduct);
