import React, {Component} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import AnimatedCir from './AnimatedCircle';
import AnimatedClock from './AnimatedClock';
import AnimatedProgressCircle from './AnimatedProgressCircle';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <AnimatedCir size={300} lineWidth={25} /> */}
        <AnimatedProgressCircle
          size={30}
          lineWidth={3}
          percent={0.25}
          roundBackgroundColor="white"
          percentBackgroundColor={'red'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    // transform: [{rotate: '-90deg'}],
  },
});
