import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import ItemScrollSnap from './ItemScrollSnap';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 10;

export default class ScrollSnap extends Component {
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
      <ItemScrollSnap
        key={index}
        item={item}
        x={this.animatedScroll}
        index={index}
      />
    );
  };

  render() {
    const widthHalfCard = width - (CARD_WIDTH + 4);
    return (
      <Animated.ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: this.animatedScroll}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        snapToInterval={Platform.OS == 'ios' ? CARD_WIDTH + 4 : null}
        snapToAlignment={'center'}
        overScrollMode="never"
        ref={(refs) => (this.ScrollView = refs)}
        onMomentumScrollEnd={(event) =>
          (this.offset = event.nativeEvent.contentOffset.x)
        }
        onMomentumScrollBegin={(event) => {
          let index = Math.floor(
            event.nativeEvent.contentOffset.x / (CARD_WIDTH + 4),
          );
          if (this.offset <= event.nativeEvent.contentOffset.x) {
            index = Math.ceil(
              event.nativeEvent.contentOffset.x / (CARD_WIDTH + 4),
            );
          }
          this.ScrollView.scrollTo({
            y: 0,
            x: index * (CARD_WIDTH + 4),
            animated: true,
          });
        }}
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: widthHalfCard / 2,
        }}>
        {this.state.data.map((item, index) => (
          <ItemScrollSnap
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
