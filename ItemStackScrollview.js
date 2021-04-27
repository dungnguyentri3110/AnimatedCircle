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

const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = height * 0.6;

export default class ItemStackScrollview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {item, x, index} = this.props;
    const position = Animated.subtract(index * CARD_WIDTH, x);
    const translate = position.interpolate({
      inputRange: [-CARD_WIDTH, 0, CARD_WIDTH, CARD_WIDTH * 2, CARD_WIDTH * 3],
      outputRange: [
        -CARD_WIDTH,
        0,
        -CARD_WIDTH + 0.1 * CARD_WIDTH,
        -2 * CARD_WIDTH + 0.2 * CARD_WIDTH,
        -3 * CARD_WIDTH + 0.3 * CARD_WIDTH,
      ],
      extrapolate: 'clamp',
    });
    const opacity = position.interpolate({
      inputRange: [-CARD_WIDTH, 0, CARD_WIDTH, CARD_WIDTH * 2, CARD_WIDTH * 3],
      outputRange: [1, 1, 0.8, 0.6, 0],
    });
    const scale = position.interpolate({
      inputRange: [-CARD_WIDTH, 0, CARD_WIDTH],
      outputRange: [1.1, 1, 0.9],
    });
    return (
      <Animated.View
        style={[
          styles.container,
          {transform: [{translateX: translate}, {scale}], zIndex: -index},
          {opacity},
        ]}>
        <Image
          source={{uri: item.name}}
          style={{width: CARD_WIDTH, aspectRatio: 1 / 1.5, borderRadius: 10}}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    aspectRatio: 1 / 1.5,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
});
