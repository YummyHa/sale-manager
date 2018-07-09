import React, { Component } from "react";
import { FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Text, Header, Left, Body, Right, Title, Button, Icon, Spinner, View } from "native-base";

import * as actions from '../../actions';

class ListOrders extends Component {
  componentDidMount() {
    this.props.fetchListOrders();
  }

  renderItem = ({ item }) => {
    let { height, width } = Dimensions.get('window');
    return (
      <View style={styles.listItems}>
        <View style={{ flex: 2 }}>
          <Text numberOfLines={1} style={{ fontSize: 14 }}>Mã HĐ: {item.id}</Text>
          <Text note numberOfLines={1}>Ngày lâp: {item.date}</Text>
          <Text note numberOfLines={1}>Khách hàng: {item.customer}</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Text numberOfLines={1} style={{ fontSize: 13 }}>Tổng giá trị</Text>
          <Text numberOfLines={1} style={{ fontSize: 13, color: '#EC9454' }}>{item.total} vnđ</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: '#fff' }} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#fff' }}>Hóa đơn</Title>
          </Body>
          <Right />
        </Header>

        {this.props.orders.length === 0 ? <Container style={{ justifyContent: 'center', alignItems: 'center' }}><Spinner color='#039be5' /></Container>
        : <Content padder>
            <FlatList 
              data={this.props.orders}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
            />
        </Content>}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listItems: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => {
  const { orders } = state.list_orders;

  return { orders };
}

export default connect(mapStateToProps, actions)(ListOrders);
