import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Svg, Path, Circle} from 'react-native-svg';

const {width} = Dimensions.get('screen');
const AnimatedSVG = Animated.createAnimatedComponent(Svg);

const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];

const tabWidth = width / 4;

class Tab extends Component {
  animated = new Animated.Value(this.props.index === 0 ? 1 : 0);

  shouldComponentUpdate(nextProps) {
    if (nextProps.currentIndex !== this.props.currentIndex) {
      if (nextProps.currentIndex !== this.props.index) {
        Animated.spring(this.animated, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      } else {
        Animated.spring(this.animated, {
          toValue: 1,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      }
    }
    return true;
  }

  onPressMoveTab = () => {
    this.props.onPressMoveTab(this.props.index);
    Animated.spring(this.animated, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  render() {
    const {index} = this.props;
    const translateY = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -26],
    });
    return (
      <TouchableOpacity
        style={styles.buttonTab}
        key={index}
        onPress={this.onPressMoveTab}>
        <Animated.View
          style={[styles.viewTab, {transform: [{translateY}]}]}></Animated.View>
      </TouchableOpacity>
    );
  }
}

export default class AnimatedSvg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
    this.animatedMove = new Animated.Value(-width);
    this.index = 0;
  }

  onPressMoveTab = (index) => {
    this.setState({currentIndex: index});
    Animated.spring(this.animatedMove, {
      toValue: -width + index * 94,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  renderTab = (item, index) => {
    return (
      <Tab
        onPressMoveTab={this.onPressMoveTab}
        index={index}
        key={index}
        currentIndex={this.state.currentIndex}
      />
    );
  };

  render() {
    // const translateX = this.animatedMove.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [-width, -width + 94],
    // });
    return (
      <View style={styles.container}>
        <View style={styles.viewContent}>
          <Text onPress={this.onPressMoveTab}>Pressssssssssss</Text>
        </View>
        <AnimatedSVG
          width={`${width * 2}`}
          height="80"
          style={[
            styles.containerSvg,
            {transform: [{translateX: this.animatedMove}]},
          ]}>
          <Path
            d={`M0,55 L${width},55 Q${width + 47},115 ${width + 94},55 L${
              width * 2
            }, 55`}
            strokeLinejoin="round"
            stroke="white"
            strokeWidth={50}
          />
          <Circle cx={`${width + 47}`} cy={30} r={20} fill={'white'} />
        </AnimatedSVG>
        <View style={styles.wrapperBottomTabBar}>
          {data.map(this.renderTab)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSvg: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: 0,
  },
  viewContent: {
    flex: 1,
    backgroundColor: '#F2EFF3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperBottomTabBar: {
    width: width,
    height: 75,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
  buttonTab: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  viewTab: {
    width: 30,
    height: 30,
    backgroundColor: 'green',
    borderRadius: 100,
  },
});
