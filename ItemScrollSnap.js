import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = height * 0.6;

export default class ItemScrollSnap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {x, index, item} = this.props;
    const position = Animated.subtract(index * (CARD_WIDTH + 4), x);
    const scale = position.interpolate({
      inputRange: [-CARD_WIDTH - 4, 0, CARD_WIDTH + 4],
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });
    const opacity = scale.interpolate({
      inputRange: [0.9, 1],
      outputRange: [0.3, 1],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={[styles.container, {transform: [{scale}], opacity}]}>
        <Image
          source={{uri: item.name}}
          style={{width: '100%', height: '100%', borderRadius: 15}}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'transparent',
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5
  },
});
