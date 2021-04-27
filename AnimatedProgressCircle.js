import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  StyleProp,
} from 'react-native';
import {Svg, Circle, Text, G} from 'react-native-svg';
const {width, height} = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(Text);

type Props = {
  size: Number,
  percent: Number,
  lineWidth: Number,
  roundBackgroundColor: StyleProp,
  percentBackgroundColor: StyleProp,
};

export default class AnimatedProgressCircle extends Component<Props> {
  static defaultProps = {
    size: 200,
    lineWidth: 20,
    roundBackgroundColor: 'red',
    percentBackgroundColor: 'blue',
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.r = props.size / 2 - props.lineWidth;
    this.AnimatedCircle = new Animated.Value(this.r * 2 * Math.PI);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.percent !== this.props.percent) {
      this.onAnimated(nextProps.percent);
    }
    return nextProps !== this.props;
  }

  componentDidMount() {
    this.onAnimated(0.75);
  }

  onAnimated = (percent) => {
    Animated.timing(this.AnimatedCircle, {
      toValue: this.r * 2 * Math.PI - this.r * percent * 2 * Math.PI,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {
      size,
      lineWidth,
      roundBackgroundColor,
      percentBackgroundColor,
    } = this.props;
    const strokeDasharray = this.r * 2 * Math.PI;
    return (
      <Svg width={`${size}`} height={`${size}`}>
        <Circle
          cx={`${size / 2}`}
          cy={`${size / 2}`}
          r={this.r}
          stroke={roundBackgroundColor}
          strokeWidth={lineWidth / 2}
        />
        <AnimatedCircle
          cx={`${size / 2}`}
          cy={`${size / 2}`}
          r={this.r}
          stroke={percentBackgroundColor}
          strokeWidth={lineWidth}
          strokeDashoffset={this.AnimatedCircle}
          strokeDasharray={`${strokeDasharray}`}
          rotation="-90"
          origin={`${`${size / 2}`}, ${`${size / 2}`}`}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </Svg>
    );
  }
}
