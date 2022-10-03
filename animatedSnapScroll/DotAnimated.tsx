import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Constant } from './Constant';

interface DotAnimatedProps {
  animatedValue: Animated.Value;
  index: number;
  dotColor?: string;
}

const DotAnimated = (props: DotAnimatedProps) => {
  const {index, animatedValue} = props;

  const subtract = Animated.subtract(
    index * Constant.ITEM_WIDTH,
    animatedValue,
  );

  const scale = subtract.interpolate({
    inputRange: [
      -4 * Constant.ITEM_WIDTH - 1,
      -4 * Constant.ITEM_WIDTH,
      -3 * Constant.ITEM_WIDTH,
      -2 * Constant.ITEM_WIDTH,
      -Constant.ITEM_WIDTH,
      0,
      Constant.ITEM_WIDTH,
      2 * Constant.ITEM_WIDTH,
      3 * Constant.ITEM_WIDTH,
      4 * Constant.ITEM_WIDTH,
      4 * Constant.ITEM_WIDTH + 1,
    ],
    outputRange: [0, 0, 0.2, 0.5, 0.75, 1.095, 0.75, 0.5, 0.2, 0, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.containerDot}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{scale}],
            backgroundColor: props.dotColor ? props.dotColor : 'white',
          },
        ]}></Animated.View>
    </View>
  );
};

export default DotAnimated;

const styles = StyleSheet.create({
  containerDot: {
    width: Constant.DOT_SIZE,
    height: Constant.DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: Constant.DOT_SIZE - 3,
    height: Constant.DOT_SIZE - 3,
    backgroundColor: 'white',
    borderRadius: Constant.DOT_SIZE * 2,
    borderWidth: 1,
    borderColor: 'white',
  },
});
