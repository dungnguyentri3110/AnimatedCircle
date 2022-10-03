import * as React from 'react';
import {Animated, Image, StyleSheet} from 'react-native';
import {DataModel} from './AnimatedSnapScroll';
import {Constant} from './Constant';

interface ItemSnapScrollProps {
  item: DataModel;
  animatedValue: Animated.Value;
  index: number;
}

export interface ItemSnapScrollRef {
  onAnimated: (value: Animated.Value) => void;
}

const ItemSnapScroll = (props: ItemSnapScrollProps) => {
  const {item, index, animatedValue} = props;

  const subtract = Animated.subtract(
    index * Constant.ITEM_WIDTH,
    animatedValue,
  );

  const scale = subtract.interpolate({
    inputRange: [-Constant.ITEM_WIDTH, 0, Constant.ITEM_WIDTH],
    outputRange: [0.8, 1, 0.8],
    // extrapolate: 'clamp'
  });

  const translateX = subtract.interpolate({
    inputRange: [-Constant.ITEM_WIDTH, 0, Constant.ITEM_WIDTH],
    outputRange: [Constant.ITEM_WIDTH / 2, 0, -Constant.ITEM_WIDTH / 2],
    extrapolate: 'clamp',
  });

  const opacity = subtract.interpolate({
    inputRange: [-Constant.ITEM_WIDTH, 0, Constant.ITEM_WIDTH],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  const zIndexdd = subtract.interpolate({
    inputRange: [-Constant.ITEM_WIDTH, 0, Constant.ITEM_WIDTH],
    outputRange: [-10, 1, -10],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        {opacity},
        styles.container,
        {transform: [{scale: scale}, {translateX}], zIndex: zIndexdd},
      ]}>
      <Image source={{uri: props.item.image}} style={styles.image} />
    </Animated.View>
  );
};

export default ItemSnapScroll;

const styles = StyleSheet.create({
  container: {
    width: Constant.ITEM_WIDTH,
    height: 200,
    backgroundColor: 'yellow',
    borderRadius: 20,
  },
  image: {
    width: Constant.ITEM_WIDTH,
    height: 200,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
});
