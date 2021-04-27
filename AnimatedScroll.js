import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import ItemScrollView from './ItemScrollView';

export default class AnimatedScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
    this.animatedScroll = new Animated.Value(0);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.animatedScroll}}}],
            {
              useNativeDriver: true,
            },
          )}>
          {this.state.data.map((e, index) => (
            <ItemScrollView key={index} y={this.animatedScroll} index={index} />
          ))}
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
