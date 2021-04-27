import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default class ItemScrollView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.y = new Animated.Value(0);
  }

  render() {
    const {y, index} = this.props;
    const position = Animated.subtract(index * 220, y);
    const translate = Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * (200 + 20)],
        outputRange: [0, -index * (200 + 20)],
        extrapolateRight: 'clamp',
      }),
    );

    const scale = position.interpolate({
      inputRange: [-220, 0, height - 220, height],
      outputRange: [0.5, 1, 1, 0.5],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={[
          styles.container,
          {transform: [{translateY: translate}, {scale: scale}]},
        ]}>
        <Text> ItemScrollView </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 200,
    borderRadius: 20,
    backgroundColor: 'pink',
    marginVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
