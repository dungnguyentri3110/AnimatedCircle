import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class HalfCircle extends Component {
  static defaultProps = {
    backgroundColor: '#FFFFFF',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={[
          styles.wrapperCircle,
          {
            borderColor: this.props.backgroundColor,
            backgroundColor: this.props.backgroundColor,
          },
        ]}></View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperCircle: {
    width: 100,
    height: 50,
    overflow: 'hidden',
    borderColor: 'blue',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: 'red',
  },
});
