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

class ProductAttributes extends Component {
  componentWillMount() {
    this.props.attributeFetch();
  }

  onUpdateAttr(val) {
    let check = false;
    let value = '';

    for (let item of this.props.attr) {
      if (item.attrName === val) {
        check = true;
        value = val;
        break;
      }
    }
    if (check) {
      Toast.show({
        text: `Thuộc tính ${val} đã tồn tại, vui lòng chọn thuộc tính khác hoặc thêm mới!`,
        position: 'bottom',
        type: 'warning',
        duration: 2000
      });
    } else {
      this.props.updateAttrName(
        { prop: 'attrName', value: val, index: this.props.choosing_index },
        () => this.props.navigation.goBack()
      );
    }     
  }

  onRemoveAttr(id) {
    let list = this.props.attr_list.slice();
    let removeIndex = list.map(function (item) { return item.id; })
      .indexOf(id);
    ~removeIndex && list.splice(removeIndex, 1);
    this.props.deleteAttr(id, list);
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        icon 
        onPress={() => this.onUpdateAttr(item.name)}
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
            onPress={() => this.onRemoveAttr(item.id)}
          />
        </Right>
      </ListItem> 
    );
  }

  onAddNewAttribute() {
    let check = false;
    let val = this.props.attr_name;

    if (val === '' || val === 'Thuộc tính') {
      this.props.addAttrError('Thuộc tính không được để trống hoặc bằng giá trị mặc định');
    } else {
        for (let item of this.props.attr_list) {
          if (item.name === val) {
            check = true;
            break;
          }
        }
        if (check) {
          this.props.addAttrError('Thuộc tính đã tồn tại!');
        } else {
          this.props.addNewAttribute(val);
        }   
    }
  }

  renderAddAttrModal() {
    const { inputTextStyle, containerStyle, contentStyle } = styles;

    return (
      <Container style={containerStyle}>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                active
                name="close"
                onPress={() => this.props.closeAddAttrModal()}
              />
            </Button>
          </Left>

          <Body>
            <Title>Thêm Thuộc tính</Title>
          </Body>

          <Right />
        </Header>

        <Content padder style={contentStyle}>
          <Text>Nhập tên thuộc tính</Text>

          <Form>
            <Item style={{ marginTop: 20 }}>
              <Input
                style={inputTextStyle}
                placeholder='Tên thuộc tính'
                placeholderTextColor='#cecece'
                onChangeText={text => this.props.attrNameChange(text)}
                value={this.props.attr_name}
              />
            </Item>
          </Form>
          
          {this.props.isAdding ? <Button
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
            onPress={() => this.onAddNewAttribute()}
          >
            <Text style={{ color: '#fff' }}>Thêm</Text>
          </Button>}

          <Text style={{ marginTop: 10, color: 'red', marginLeft: 10 }}>{this.props.error_add_attr}</Text>

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
            <Title>Thuộc tính</Title>
          </Body>

          <Right>
            <Button 
              transparent
              onPress={() => this.props.openAddAttrModal()}
            >
              <Text uppercase={false}>Thêm</Text>
            </Button>
          </Right>
        </Header>

        {/* Dialog popup to add new attributes */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") }}
          presentationStyle='formSheet'
        >
          { this.renderAddAttrModal() }
        </Modal>
        {/* end dialog */}

        <Content style={listStyle}>
          <FlatList
            data={this.props.attr_list}
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
  const { attr, choosing_index } = state.product;
  const { attr_list, modalVisible, attr_name, error_add_attr, isAdding } = state.attr;

  return { attr, attr_list, choosing_index, modalVisible, attr_name, error_add_attr, isAdding };
}

export default connect(mapStateToProps, actions)(ProductAttributes);
