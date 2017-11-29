import React, { Component } from "react";
import _ from 'lodash';
import { TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { Container, Content, Text, Header, Left, Body, Right, Title, Button, Icon, View, ListItem, Input, Item } from "native-base";

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

  renderItem = ({ item }) => {
    let { height, width } = Dimensions.get('window');
    // check if there was that item in list first
    let index = _.findIndex(this.props.ordering_list, (o) => { return o.id == item.id });
    const { listItem } = styles;
    return (
      <View
        style={listItem}
      >
        <View style={{ width: width/3, justifyContent: 'center', alignItems: 'flex-start' }}>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          <Text note>{item.sell_price} vnđ</Text>
        </View>       
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width/2 - 50 }}>
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
            <Title style={{ color: '#fff' }}>Đơn hàng</Title>
          </Body>
          <Right />
        </Header>

        {this.props.ordering_list.length === 0 ? <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text note>Chưa có mặt hàng nào trong đơn hàng!</Text>
        </Container> : <Container>
            <TouchableOpacity style={customer}>
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
            <Button full><Text>Thanh toán</Text></Button>
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
  }
});

const mapStateToProps = (state) => {
  const { ordering_list, customer, total } = state.orders;

  return { ordering_list, customer, total };
}

export default connect(mapStateToProps, actions)(OrdersScreen);
