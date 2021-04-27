import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import ItemStackScrollview from './ItemStackScrollview';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

export default class StackScrollView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://i.pinimg.com/originals/c3/33/f2/c333f2f1cc5f4b0cae037546bc3baa0d.jpg',
        },
        {
          name: 'https://i.redd.it/1xlrjb24x4f41.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
        {
          name:
            'https://upload.wikimedia.org/wikipedia/vi/thumb/8/88/Vegeta_Dragon_Ball.jpg/220px-Vegeta_Dragon_Ball.jpg',
        },
      ],
    };
    this.animatedScroll = new Animated.Value(0);
    this.offset = 0;
  }

  renderItem = (item, index) => {
    return (
      <ItemStackScrollview
        key={index}
        item={item}
        x={this.animatedScroll}
        index={index}
      />
    );
  };

  render() {
    const widthHalfCard = width - CARD_WIDTH;
    return (
      <Animated.ScrollView
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: this.animatedScroll}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        snapToInterval={Platform.OS === 'ios' ? CARD_WIDTH : null}
        snapToAlignment={'center'}
        // overScrollMode="never"
        ref={(refs) => (this.ScrollView = refs)}
        onMomentumScrollEnd={(event) =>
          (this.offset = event.nativeEvent.contentOffset.x)
        }
        onScrollEndDrag={(event) => {
          let index = Math.round(
            event.nativeEvent.contentOffset.x / CARD_WIDTH,
          );
          // if (this.offset <= event.nativeEvent.contentOffset.x) {
          //   index = Math.ceil(event.nativeEvent.contentOffset.x / CARD_WIDTH);
          // }
          this.ScrollView.scrollTo({
            y: 0,
            x: index * CARD_WIDTH,
            animated: true,
          });
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: widthHalfCard / 2,
        }}>
        {this.state.data.map((item, index) => (
          <ItemStackScrollview
            key={index}
            item={item}
            x={this.animatedScroll}
            index={index}
          />
        ))}
      </Animated.ScrollView>
    );
  }
}
