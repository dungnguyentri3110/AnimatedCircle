import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import {Svg, Circle, Text, G} from 'react-native-svg';
const {width, height} = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(Text);
export default class AnimatedCir extends Component {
  static defaultProps = {
    size: 200,
    lineWidth: 20,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.AnimatedCircle = new Animated.Value(40 * 2 * Math.PI);
  }

  componentDidMount() {
    // console.log(`PROPS SIZE`, this.props.size);
    Animated.timing(this.AnimatedCircle, {
      toValue: 40 * 2 * Math.PI - 30 * 2 * Math.PI,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const {size, lineWidth} = this.props;
    const strokeDasharray = 40 * 2 * Math.PI;
    const r = size / 2 - lineWidth;
    return (
      <View style={{flex: 1}}>
        <Svg>
          <Circle
            cx={150}
            cy={150}
            r={50 - 11}
            stroke="red"
            strokeWidth={2}
          />
          <AnimatedCircle
            cx={150}
            cy={150}
            r={60 - 20}
            stroke="blue"
            strokeWidth={4}
            strokeDashoffset={this.AnimatedCircle}
            strokeDasharray={`${strokeDasharray}`}
            rotation="-90"
            origin={`${150}, ${150}`}
            strokeLinejoin="round"
            strokeLinecap='round'
          />
          {/* <AnimatedText
              fill="blue"
              textAnchor="middle"
              rotation="0"
              origin={`${width / 2}, ${height / 2}`}
              x={width / 2}
              y={height / 2}>
              TEXT
            </AnimatedText> */}
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // transform: [{rotate: '-90deg'}],
  },
});
