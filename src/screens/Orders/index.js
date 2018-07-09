import React, { Component } from "react";
import _ from 'lodash';
import { TouchableOpacity, StyleSheet, FlatList, Dimensions, Modal } from 'react-native';
import { connect } from 'react-redux'
import { Container, Content, Text, Header, Left, Body, Right, Title, Button, Icon, View, ListItem, Input, Item, Spinner } from "native-base";

import * as actions from '../../actions';

class OrdersScreen extends Component {
  onMinusQuantity(index, quantity) {
    this.props.updateOrderQuantityByButton('minus', index);
    if (quantity === 1) {
      let list = this.props.ordering_list.slice();
      ~index && list.splice(index, 1);
      this.props.removeItemInOrderingList(list);
    }
  }

  onUpdateOrderQuantity(index, value) {
    let val = parseInt(value);
    if (_.isNaN(val)) val = 0;
    this.props.updateOrderQuantity(val, index);
  }

  onPaidChanged(value) {
    let val = parseFloat(value);
    val = Math.round(val);
    if (_.isNaN(val)) val = 0;
    if (val < 0) {
      alert('Không thể nhập giá trị bé hơn 0');
      this.props.customerPaidChanged(0);
    } else {
      this.props.customerPaidChanged(val);
    }
  }

  onDiscountChanged(value) {
    let val = parseFloat(value);
    if (_.isNaN(val)) val = 0;
    if (val > 100 || val < 0) {
      alert('Không thể giảm giá quá 100% hoặc bé hơn 0 %');
      this.props.discountChange(0);
      this.props.updateOrginTotal(this.props.real_total);
    } else if (val === 0) {
      this.props.updateOrginTotal(this.props.real_total);
    } else {
      this.props.discountChange(val);
    }
  }

  onAddNewOrder() {
    const { customer, total, ordering_list, } = this.props;
    if (this.props.change < 0) {
      alert('Khách hàng chưa trả tiền hoặc chưa trả đủ tiền!!');
    } else {
      this.props.addNewOrder({
        customer,
        ordering_list,
        total
      }, () => this.props.navigation.navigate('order_list'));
    }
  }

  renderPayModal() {
    return (
      <Container style={{ backgroundColor: '#f8f8f8' }}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.closePayModal()}>
              <Icon
                name="close"
                style={{ color: '#fff' }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#fff' }}>Thanh toán</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <View style={styles.container}>
            <Text>Tổng giá trị đơn hàng: </Text>
            <Text style={{ color: '#EC9454', fontStyle: 'italic' }}>{this.props.total} vnđ</Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.textStyle}>Giảm giá (%)</Text>
            <Input
              placeholder='0'
              onChangeText={value => this.onDiscountChanged(value)}
              keyboardType='numeric'
              value={this.props.discount.toString()}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.textStyle}>Khách hàng trả:</Text>
            <Input
              placeholder='0'
              onChangeText={value => this.onPaidChanged(value)}
              value={this.props.paidmoney.toString()}
              keyboardType='numeric'
            />
            <Text style={{ color: '#EC9454', fontStyle: 'italic' }}>vnđ</Text>
          </View>

          <View style={{ height: 10 }}></View>

          <View style={styles.container}>
            <Text>Tiền thừa trả lại: </Text>
            <Text style={{ color: '#EC9454', fontStyle: 'italic' }}>{this.props.change.toString()} vnđ</Text>
          </View>
        </Content>

        {this.props.isAddingOrders ? <Button success full><Spinner color='#fff' /></Button>
          : <Button
            success
            full
            onPress={() => this.onAddNewOrder()}
          >
            <Text style={{ color: '#fff' }}>Hoàn thành</Text>
          </Button>}
      </Container>
    );
  }

  renderItem = ({ item }) => {
    let { height, width } = Dimensions.get('window');
    // check if there was that item in list first
    let index = _.findIndex(this.props.ordering_list, (o) => { return o.id == item.id });
    const { listItem } = styles;
    return (
      <View
        style={listItem}
      >
        <View style={{ width: width / 3, justifyContent: 'center', alignItems: 'flex-start' }}>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          <Text note>{item.sell_price} vnđ</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width / 2 - 50 }}>
          <Button rounded onPress={() => this.onMinusQuantity(index, item.quantity)}>
            <Text style={{ fontWeight: 'bold', color: '#EC9454' }}>-</Text>
          </Button>
          <Input
            style={{ marginRight: 5, marginLeft: 5, flex: 1 }}
            placeholder="0"
            keyboardType='numeric'
            onChangeText={value => this.onUpdateOrderQuantity(index, value)}
            onEndEditing={() => {
              if (item.quantity === 0) {
                let list = this.props.ordering_list.slice();
                ~index && list.splice(index, 1);
                this.props.removeItemInOrderingList(list);
              }
            }}
            value={item.quantity.toString()}
          />
          <Button rounded onPress={() => this.props.updateOrderQuantityByButton('plus', index)}>
            <Text style={{ fontWeight: 'bold', color: '#039be5' }}>+</Text>
          </Button>
        </View>
      </View>
    );
  }

  render() {
    const { customer } = styles;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title style={{ color: '#fff' }}>Đơn hàng hiện tại</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('order_list')}>
              <Text uppercase={false} style={{ fontSize: 13, color: '#fff' }}>Danh sách HĐ</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        {/* screen popup to pay */}
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.props.payModalVisible}
          onRequestClose={() => this.props.closePayModal()}
        >
          {this.renderPayModal()}
        </Modal>
        {/* end */}

        {this.props.ordering_list.length === 0 ? <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text note>Chưa có mặt hàng nào trong đơn hàng!</Text>
        </Container> : <Container>
            <TouchableOpacity style={customer} onPress={() => this.props.navigation.navigate('customers')}>
              <Icon name="person" style={{ color: '#bdbdbd' }} />
              <Text style={{ fontSize: 14, marginTop: 3 }}>{this.props.customer}</Text>
              <Icon name="ios-arrow-forward" style={{ color: '#bdbdbd' }} />
            </TouchableOpacity>
            <Text style={{ color: '#222', fontSize: 13, marginLeft: 10, marginTop: 10, marginBottom: 10 }}>Danh sách mặt hàng</Text>
            <Content>
              <FlatList
                data={this.props.ordering_list}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
              />
            </Content>

            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15, backgroundColor: '#EC9454' }}>
              <Text style={{ color: '#fff' }}>Tổng cộng: {this.props.total} vnđ</Text>
            </View>

            <Button full onPress={() => this.props.openPayModal()}><Text>Thanh toán</Text></Button>
          </Container>}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  customer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  listItem: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#bdbdbd'
  },
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    width: 160
  }
});

const mapStateToProps = (state) => {
  const { ordering_list, customer, total, payModalVisible, discount, change, paidmoney, real_total, isAddingOrders } = state.orders;

  return { ordering_list, customer, total, payModalVisible, discount, change, paidmoney, real_total, isAddingOrders };
}

export default connect(mapStateToProps, actions)(OrdersScreen);
