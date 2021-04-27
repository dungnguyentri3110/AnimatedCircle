import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import HalfCircle from './HalfCircle';

export default class AnimatedClock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.AnimatedHalfUp = new Animated.Value(0);
    this.AnimatedHalfDown = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.AnimatedHalfUp, {
        toValue: 2,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }

  halfCirle = () => {
    return (
      <View style={styles.wrapperCircle}>
        <View style={styles.content}></View>
      </View>
    );
  };

  render() {
    const roateUp = this.AnimatedHalfUp.interpolate({
      inputRange: [0, 1, 1.1],
      outputRange: ['0deg', '180deg', '180deg'],
    });

    const roateDown = this.AnimatedHalfUp.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ['0deg', '0deg', '180deg'],
    });
    return (
      <View style={styles.container}>
        <View style={{transform: [{rotate: '90deg'}]}}>
          <View style={{overflow: 'hidden'}}>
            <HalfCircle backgroundColor={'blue'} />
            <Animated.View
              style={[
                styles.halfCircle,
                {
                  transform: [
                    {translateY: 25},
                    {rotate: roateUp},
                    {translateY: -25},
                  ],
                },
              ]}>
              <HalfCircle />
            </Animated.View>
          </View>

          <View style={styles.halfBelow}>
            <HalfCircle backgroundColor={'blue'} />
            <Animated.View
              style={[
                styles.halfCircle,
                {
                  transform: [
                    {translateY: 25},
                    {rotate: roateDown},
                    {translateY: -25},
                  ],
                },
              ]}>
              <HalfCircle />
            </Animated.View>
          </View>
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
  wrapperCircle: {
    width: 200,
    height: 200,
    borderRadius: 200,
    overflow: 'hidden',
    backgroundColor: 'yellow',
  },
  content: {
    width: 200,
    height: 100,
    backgroundColor: 'blue',
  },
  halfBelow: {
    transform: [{rotate: '180deg'}],
    overflow: 'hidden'
  },
  wrapperContent: {
    backgroundColor: 'yellow',
    width: 200,
    height: 200,
    borderRadius: 200,
    overflow: 'hidden',
  },
  halfCircle: {
    position: 'absolute',
  },
});
