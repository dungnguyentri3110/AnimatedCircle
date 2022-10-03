import * as React from 'react';
import {Animated, ScrollView, StyleSheet, View} from 'react-native';
import {Constant} from './Constant';
import DotAnimated from './DotAnimated';
import ItemSnapScroll from './ItemSnapScroll';

interface AnimatedSnapScrollProps {}

export interface DataModel {
  id: number;
  image: string;
}

const withContainerDot = (Constant.DOT_SIZE * 15) / 3;

const AnimatedSnapScroll = (props: AnimatedSnapScrollProps) => {
  const data: DataModel[] = [
    {
      id: 1,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 2,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 3,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 4,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 5,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 6,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 7,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 8,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 9,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 10,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 11,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 12,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 13,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 14,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 15,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 16,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 17,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 18,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 19,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 20,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 21,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 22,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 23,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 24,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 25,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 26,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
    {
      id: 27,
      image: 'https://image2.tin247.news/pictures/2022/09/16/gxh1663319230.png',
    },
  ];

  const animatedScroll = React.useRef(new Animated.Value(0)).current;
  const offset = React.useRef(0);
  const scrollView = React.useRef<ScrollView>(null);
  const scrollViewDot = React.useRef<ScrollView>(null);
  const indexDotNeedScroll = React.useRef(0);
  const currentOffset = React.useRef(0);
  const currentIndex = React.useRef(0);

  const renderItem = (item: DataModel, index: number) => {
    return (
      <ItemSnapScroll
        item={item}
        key={item.id.toString()}
        animatedValue={animatedScroll}
        index={index}
      />
    );
  };

  const renderDot = (item: DataModel, index: number) => {
    return (
      <DotAnimated
        key={item.id.toString()}
        animatedValue={animatedScroll}
        index={index}
      />
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View>
        <Animated.ScrollView
          showsHorizontalScrollIndicator={false}
          ref={scrollView}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: animatedScroll}}}],
            {
              useNativeDriver: true,
              listener: ({nativeEvent}) => {
                //Caculate to scroll dot item
                if (data.length > 6) {
                  const offsetx = nativeEvent.contentOffset.x;
                  const caculIndex = Math.round(offsetx / Constant.ITEM_WIDTH);
                  if (caculIndex >= 3 && currentIndex.current != caculIndex) {
                    currentIndex.current = caculIndex;
                    if (offsetx < currentOffset.current) {
                      indexDotNeedScroll.current -= 2;
                    } else {
                      indexDotNeedScroll.current += 2;
                    }
                    scrollViewDot.current?.scrollTo({
                      y: 0,
                      x:
                        indexDotNeedScroll.current * Constant.DOT_SIZE -
                        indexDotNeedScroll.current * (Constant.DOT_SIZE / 2),
                      animated: true,
                    });
                  } else if (caculIndex == 0) {
                    indexDotNeedScroll.current = 0;
                    scrollViewDot.current?.scrollTo({
                      y: 0,
                      x:
                        indexDotNeedScroll.current * Constant.DOT_SIZE -
                        indexDotNeedScroll.current * (Constant.DOT_SIZE / 2),
                      animated: true,
                    });
                  }
                  currentOffset.current = offsetx;
                }
              },
            },
          )}
          horizontal
          overScrollMode="never"
          scrollEventThrottle={16}
          onMomentumScrollEnd={(event) => {
            offset.current = event.nativeEvent.contentOffset.x;
          }}
          onMomentumScrollBegin={(event) => {
            //Caculate when begin figer out scrollview keep scroll to next item
            let index = Math.floor(
              event.nativeEvent.contentOffset.x / Constant.ITEM_WIDTH,
            );
            if (offset.current <= event.nativeEvent.contentOffset.x) {
              index = Math.ceil(
                event.nativeEvent.contentOffset.x / Constant.ITEM_WIDTH,
              );
            }
            scrollView.current?.scrollTo({
              y: 0,
              x: index * Constant.ITEM_WIDTH,
              animated: true,
            });
          }}
          contentContainerStyle={styles.containerScrollView}
          snapToInterval={Constant.ITEM_WIDTH}
          snapToStart={false}
          snapToEnd={false}
          snapToAlignment={'center'}
          decelerationRate={'fast'}
          snapToOffsets={data.map((_, index: number) => {
            return index * Constant.ITEM_WIDTH;
          })}>
          {data.map(renderItem)}
        </Animated.ScrollView>

        {/**Render dot animation */}
        <View style={styles.containerDot}>
          <Animated.View style={styles.wrapperDot}>
            <View>
              <Animated.ScrollView
                ref={scrollViewDot}
                horizontal
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}>
                {data.map(renderDot)}
              </Animated.ScrollView>
            </View>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default AnimatedSnapScroll;

const styles = StyleSheet.create({
  containerScrollView: {
    height: 250,
    alignItems: 'center',
    paddingHorizontal: (Constant.SCREEN_WIDTH - Constant.ITEM_WIDTH) / 2,
  },
  wrapperDot: {
    height: 25,
    alignItems: 'center',
    width: withContainerDot,
  },
  container: {
    flex: 1,
  },
  containerDot: {
    position: 'absolute',
    bottom: 30,
    height: 25,
    alignSelf: 'center',
    width: withContainerDot,
    flexDirection: 'row',
    overflow: 'hidden',
  },
});
