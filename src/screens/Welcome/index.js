import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Text, Button, Content } from 'native-base';
import Swiper from 'react-native-swiper';
import { StyleSheet } from 'react-native';

class WelcomeScreen extends Component {
  render() {
    return (
      <Container>
        <StatusBar
          translucent={false}
          barStyle="dark-content"
          backgroundColor="#ffb300"
        />

        <Swiper showsButtons={false}>
          <Container style={styles.slide1}>
            <Text style={styles.text}>nhanh chóng</Text>
          </Container>
          <Container style={styles.slide2}>
            <Text style={styles.text}>Tiện Lợi</Text>
          </Container>
          <Container style={styles.slide3}>
            <Text style={styles.text}>Dễ dàng</Text>
            <Button full rounded success onPress={() => this.props.navigation.navigate("login")}>
              <Text>Thử ngay</Text>
            </Button>
          </Container>
        </Swiper>
      </Container>    
    );
  }
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffb300'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe54c'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c68400'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default WelcomeScreen;
