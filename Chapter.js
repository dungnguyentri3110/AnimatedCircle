import React, {Component} from 'react';
import {View, Easing, StyleSheet, Animated, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default class Chapter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animated = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.animated, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const translateX = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [-width, 0],
    });
    return (
      <View style={styles.container}>
        <View
          style={{
            width: width * 0.9,
            height: 20,
            overflow: 'hidden',
            backgroundColor: 'red',
          }}>
          <Animated.View
            style={[styles.content, {transform: [{translateX}]}]}
          />
          <View
            style={[
              styles.content,
              {position: 'absolute', backgroundColor: 'rgba(255,255,255,0)'},
            ]}></View>
          <View
            style={{
              width: 5,
              height: 20,
              backgroundColor: 'white',
              position: 'absolute',
              left: 100,
            }}
          />
          <View
            style={{
              width: 5,
              height: 20,
              backgroundColor: 'white',
              position: 'absolute',
              left: 180,
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: width * 0.9,
    height: 20,
    backgroundColor: 'blue',
  },
});
