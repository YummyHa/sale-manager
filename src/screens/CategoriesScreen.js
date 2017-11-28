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
  Input
} from "native-base";

import * as actions from '../actions';

class CategoriesScreen extends Component {
  componentWillMount() {
    this.props.cateFetch();
  }

  onUpdateCate(val) {   
    this.props.productCateUpdate({ prop: 'cate', value: val }, () => this.props.navigation.goBack());
  }

  onRemoveCate(id) {
    let list = this.props.cate_list.slice();
    let removeIndex = list.map(function (item) { return item.id; })
      .indexOf(id);
    ~removeIndex && list.splice(removeIndex, 1);
    this.props.deleteCate(id, list);
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        icon
        onPress={() => this.onUpdateCate(item.name)}
      >
        <Left>
          <Icon name='arrow-forward' style={{ fontSize: 20, color: '#222' }} />
        </Left>

        <Body>
          <Text style={{ marginLeft: 10 }}>{item.name}</Text>
        </Body>

        <Right>
          <Icon
            name='close'
            style={{ color: 'red' }}
            onPress={() => this.onRemoveCate(item.id)}
          />
        </Right>
      </ListItem>
    );
  }

  onAddNewCate() {
    let check = false;
    let val = this.props.cate_name;

    if (val === '') {
      this.props.addCateError('Danh mục không được để trống!');
    } else {
      for (let item of this.props.cate_list) {
        if (item.name === val) {
          check = true;
          break;
        }
      }
      if (check) {
        this.props.addCateError('Danh mục đã tồn tại!');
      } else {
        this.props.addNewCate(val);
      }
    }
  }

  renderAddCateModal() {
    const { inputTextStyle, containerStyle, contentStyle } = styles;

    return (
      <Container style={containerStyle}>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                active
                name="close"
                onPress={() => this.props.closeAddCateModal()}
              />
            </Button>
          </Left>

          <Body>
            <Title>Thêm Danh mục</Title>
          </Body>

          <Right />
        </Header>

        <Content padder style={contentStyle}>
          <Text>Nhập tên danh mục</Text>

          <Form>
            <Item style={{ marginTop: 20 }}>
              <Input
                style={inputTextStyle}
                placeholder='Tên danh mục'
                placeholderTextColor='#cecece'
                onChangeText={text => this.props.cateNameChange(text)}
                value={this.props.cate_name}
              />
            </Item>
          </Form>

          {this.props.isAddingCate ? <Button
            info
            full
            rounded
            style={{ marginTop: 20 }}
          >
            <Spinner color='#fff' />
          </Button> :
            <Button
              info
              full
              rounded
              style={{ marginTop: 20 }}
              onPress={() => this.onAddNewCate()}
            >
              <Text style={{ color: '#fff' }}>Thêm</Text>
            </Button>}

          <Text style={{ marginTop: 10, color: 'red', marginLeft: 10 }}>{this.props.error_add_cate}</Text>

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
              />
            </Button>
          </Left>

          <Body>
            <Title>Nhóm hàng</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.openAddCateModal()}
            >
              <Text uppercase={false}>Thêm</Text>
            </Button>
          </Right>
        </Header>

        {/* screen popup to add new cate */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.cateModalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
        >
          {this.renderAddCateModal()}
        </Modal>
        {/* end */}

        <Content style={listStyle}>
          <FlatList
            data={this.props.cate_list}
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
  contentStyle: {
    backgroundColor: '#fff',
  }
});

const mapStateToProps = (state) => {
  const { cate } = state.product;
  const { cate_list, cateModalVisible, cate_name, error_add_cate, isAddingCate } = state.cate;
  return { cate_list, cateModalVisible, cate_name, error_add_cate, isAddingCate, cate };
}

export default connect(mapStateToProps, actions)(CategoriesScreen);
