import React, {Component} from 'react';
import {
  View,
  Text,
  PanResponder,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sliderAnimated = new Animated.ValueXY({x: 0, y: 0});
    this.pageX = 0;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dx >= 2 || gestureState.dx <= 2;
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx >= 2 || gestureState.dx <= 2;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dx >= 2 || gestureState.dx <= 2;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx >= 2 || gestureState.dx <= 2;
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.locationX = evt.nativeEvent.locationX;
      },
      onPanResponderMove: (evt, gestureState) => {
        let range =
          gestureState.x0 - this.pageX + gestureState.dx - this.locationX;
        let ratio = Math.round((range / (width - 120)) * 100);
        if (ratio >= 100) ratio = 100;
        if (ratio <= 0) ratio = 0;
        console.log(`RATIO`, ratio, range);
        this.sliderAnimated.setValue({x: (ratio / 100) * (width - 120), y: 0});
      },
      onPanResponderRelease: (evt, gestureState) => {},
    });
    this.count = 0;
  }

  componentDidMount() {
    clearInterval(this.timeRun);
    this.timeRun = setInterval(() => {
      this.count += 1;
      if (this.count <= 100) {
        console.log(`NHAY VDAO DAY`);
        this.onChangeValue(this.count / 100);
      } else {
        this.count = 100;
        clearInterval(this.timeRun);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeRun);
  }

  onLayout = () => {
    this.Container.measure((x, y, w, h, px, py) => {
      this.pageX = px;
    });
  };

  onChangeValue = (percent) => {
    Animated.timing(this.sliderAnimated.x, {
      toValue: percent * (width - 120),
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    // this.sliderAnimated.setValue({x: percent * (width - 120), y: 0});
  };

  onPressSeekSlider = (event) => {
    const {pageX, locationX} = event.nativeEvent;
    this.Container.measure((x, y, w, h, px, py) => {
      let positionX = pageX - px - 10;
      let ratio = Math.round((positionX / (width - 120)) * 100);
      if (ratio >= 100) ratio = 100;
      if (ratio <= 0) ratio = 0;
      this.sliderAnimated.setValue({x: (ratio / 100) * (width - 120), y: 0});
      this.percent = ratio;
    });
  };

  onTouchEnd = () => {
    console.log(`TOUCHEND`, this.percent);
  };

  render() {
    const trackTransform = this.sliderAnimated.x.interpolate({
      inputRange: [0, width - 120],
      outputRange: [-width + 120, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.container}>
        <View
          onTouchStart={this.onPressSeekSlider}
          onTouchEnd={this.onTouchEnd}
          style={styles.content}
          ref={(refs) => (this.Container = refs)}
          onLayout={this.onLayout}>
          <View style={styles.wrapTrack}>
            <View style={styles.hintTrack}></View>
            <View
              style={{
                width: 10,
                height: 10,
                position: 'absolute',
                backgroundColor: 'red',
                right: 100,
              }}
            />
            <Animated.View
              style={[
                styles.track,
                {transform: [{translateX: trackTransform}]},
              ]}></Animated.View>
          </View>
          <Animated.View
            style={[
              styles.thum,
              {transform: [{translateX: this.sliderAnimated.x}]},
            ]}
            {...this.panResponder.panHandlers}></Animated.View>
        </View>
        <Text> Slider </Text>
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
    width: width - 100,
    height: 50,
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  hintTrack: {
    width: '100%',
    height: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  track: {
    width: '100%',
    height: 10,
    backgroundColor: 'green',
    borderRadius: 10,
    position: 'absolute',
  },
  wrapTrack: {
    width: '100%',
    height: 10,
    overflow: 'hidden',
    borderRadius: 10,
    justifyContent: 'center',
  },
  thum: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(0,255, 0, 0.4)',
    position: 'absolute',
  },
});
