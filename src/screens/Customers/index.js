import React, { Component } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Modal, View } from 'react-native';
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
  Button,
  ListItem,
  Spinner,
  Toast,
  Form,
  Item,
  Input,
  Thumbnail
} from "native-base";

import * as actions from '../../actions';

class CustomersScreen extends Component {
  componentWillMount() {
    this.props.customerFetch();
  }

  updateCustomerNameInOrderingList(val) {
    this.props.updateCustomerNameInOrderingList(val, () => this.props.navigation.goBack());
  }

  onRemoveCustomer(id) {
    let list = this.props.customers.slice();
    let removeIndex = list.map(function (item) { return item.id; })
      .indexOf(id);
    ~removeIndex && list.splice(removeIndex, 1);
    this.props.deleteCustomer(id, list);
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        avatar
        onPress={() => this.updateCustomerNameInOrderingList(item.name)}
      >
        <Left>
          <Thumbnail source={require("../../images/customer-default.png")} />
        </Left>

        <Body>
          <Text>{item.name}</Text>
          {item.address !== '' ? <Text note>địa chỉ: {item.address}</Text> : <Text note>Địa chỉ trống...</Text>}
          {item.phone !== '' ? <Text note>sđt: {item.phone}</Text> : <Text note>Số điện thoại trống...</Text>}
        </Body>

        <Right>
          <Icon
            name='close'
            style={{ color: 'red' }}
            onPress={() => this.onRemoveCustomer(item.id)}
          />
        </Right>
      </ListItem>
    );
  }

  onAddNewCustomer() {
    let name = this.props.customerName;
    let address = this.props.customerAddress;
    let phone = this.props.customerPhone;

    if (name === '') {
      this.props.addCustomerError('Tên khách hàng không được để trống!');
    } else {
      this.props.addNewCustomer({ name, address, phone });
    }
  }

  renderAddCustomerModal() {
    const { inputTextStyle, containerStyle, contentStyle, inputContainerStyle, labelStyle, formStyle } = styles;

    return (
      <Container style={containerStyle}>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                active
                name="close"
                onPress={() => this.props.closeAddCustomerModal()}
                style={{ color: '#fff' }}
              />
            </Button>
          </Left>

          <Body>
            <Title style={{ color: '#fff' }}>Thêm khách hàng</Title>
          </Body>

          <Right />
        </Header>

        <Content>
          <Form style={formStyle}>
            <Item style={inputContainerStyle}>
              <Text style={labelStyle}>Tên KH</Text>
              <Input
                style={inputTextStyle}
                placeholder='Nhập tên'
                placeholderTextColor='#cecece'
                onChangeText={text => this.props.customerUpdateProps({ prop: 'customerName', value: text })}
                value={this.props.customerName}
              />
            </Item>
            <Item style={inputContainerStyle}>
              <Text style={labelStyle}>Địa chỉ</Text>
              <Input
                style={inputTextStyle}
                placeholder='Nhập địa chỉ'
                placeholderTextColor='#cecece'
                onChangeText={text => this.props.customerUpdateProps({ prop: 'customerAddress', value: text })}
                value={this.props.customerAddress}
              />
            </Item>
            <Item style={inputContainerStyle}>
              <Text style={labelStyle}>SĐT</Text>
              <Input
                style={inputTextStyle}
                placeholder='Nhập số điện thoại'
                placeholderTextColor='#cecece'
                keyboardType='phone-pad'
                onChangeText={text => this.props.customerUpdateProps({ prop: 'customerPhone', value: text })}
                value={this.props.customerPhone}
              />
            </Item>
          </Form>

          {this.props.isAddingCustomer ? <Button
            info
            full
            rounded
            style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
          >
            <Spinner color='#fff' />
          </Button> :
            <Button
              info
              full
              rounded
              style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
              onPress={() => this.onAddNewCustomer()}
            >
              <Text style={{ color: '#fff' }}>Thêm</Text>
            </Button>}

          <Text style={{ marginTop: 10, color: 'red', marginLeft: 10 }}>{this.props.error_add_customer}</Text>

        </Content>
      </Container>
    );
  }

  render() {
    const { listStyle } = styles;

    return (
      <Container>
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
            <Title style={{ color: '#fff' }}>Khách hàng</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.openAddCustomerModal()}
            >
              <Text uppercase={false} style={{ color: '#fff' }}>Thêm</Text>
            </Button>
          </Right>
        </Header>

        {/* screen popup to add new Customer */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.customerModalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
        >
          {this.renderAddCustomerModal()}
        </Modal>
        {/* end */}

        <Content style={listStyle}>
          <FlatList
            data={this.props.customers}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listStyle: {
    backgroundColor: '#fff'
  },
  inputTextStyle: {
    color: '#222222',
  },
  containerStyle: {
    flex: 1,
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
});

const mapStateToProps = (state) => {
  const { customer } = state.orders;
  const { customers, customerModalVisible, customerName, customerAddress, customerPhone, error_add_customer, isAddingCustomer } = state.customers;
  return { customers, customerModalVisible, customerName, customerAddress, customerPhone, error_add_customer, isAddingCustomer, customer };
}

export default connect(mapStateToProps, actions)(CustomersScreen);
