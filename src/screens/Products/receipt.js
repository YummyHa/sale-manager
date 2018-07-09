import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Header, Left, Body, Right, Title, Text, Icon, Button, View, Input, Form, Item } from 'native-base';

import * as actions from '../../actions/productActions';

const { height, width } = Dimensions.get('window');

class Receipt extends Component {
  onReceiptDone = () => {

  }

  render() {
    const { sectionStyle, childSectionLeftStyle, childSectionRightStyle, inputContainerStyle } = styles;

    return (
      <Container>
        {/* Header */}
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: '#fff' }} name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title style={{ color: '#fff' }}>Nhập hàng</Title>
          </Body>

          <Right>
            <Button transparent onPress={() => this.onReceiptDone()}>
              <Text uppercase={false} style={{ color: '#fff' }}>OK</Text>
            </Button>
          </Right>
        </Header>

        {/* Main Content */}
        <Content padder>
          <View style={{ backgroundColor: '#fff', borderRadius: 5 }}>
            {/* Ma mat hang */}
            <View style={sectionStyle}>
              <Text style={childSectionLeftStyle}>Mã hàng:</Text>
              <Text style={childSectionRightStyle}>{this.props.choosingProduct.id}</Text>
            </View>

            {/* Ten mat hang */}
            <View style={sectionStyle}>
              <Text style={childSectionLeftStyle}>Tên hàng:</Text>
              <Text style={childSectionRightStyle}>{this.props.choosingProduct.name}</Text>
            </View>

            {/* Nha Cung Cap */}
            <View style={sectionStyle}>
              <Text style={childSectionLeftStyle}>Nhà cung cấp:</Text>
              <TouchableOpacity onPress>
                <Text style={{ color: '#dacaca', fontSize: 14 }}>Chọn nhà cung cấp</Text>
              </TouchableOpacity>
            </View>

            <Form>
              {/* Don Gia */}
              <Item style={inputContainerStyle}>
                <Text style={childSectionLeftStyle}>Giá nhập:</Text>
                <Input
                  keyboardType='numeric'
                  placeholder='0'
                  value={this.props.choosingProduct.orgin_price}
                />
              </Item>

              {/* So luong */}
              <Item style={inputContainerStyle}>
                <Text style={childSectionLeftStyle}>Số lượng nhập:</Text>
                <Input
                  keyboardType='numeric'
                  placeholder='0'
                  value={this.props.choosingProduct.quantity}
                />
              </Item>
            </Form>
          </View>
        </Content>

        <View style={{ backgroundColor: '#EC9454', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
          <Text style={{ color: '#fff', fontSize: 20 }}>Tổng cộng: 0 vnđ</Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  sectionStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#dacaca'
  },
  inputContainerStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#dacaca'
  },
  childSectionLeftStyle: {
    width: width/4+15,
    fontSize: 14
  },
  childSectionRightStyle: {
    color: '#dacaca',
    fontSize: 14
  }
});

const mapStateToProps = (state) => {
  const { choosingProduct } = state.product;

  return { choosingProduct }
}

export default connect(mapStateToProps, actions)(Receipt);
