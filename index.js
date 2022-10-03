/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AnimatedCircle from './AnimatedCircle';
import AnimatedScroll from './AnimatedScroll';
import ScrollSnap from './ScrollSnap';
import StackScrollView from './StackScrollView';
import Slider from './Slider';
import Chapter from './Chapter';
import AnimatedBottomNavigationBar from './AnimatedBottomNavigationBar';
import AnimatedSnapScroll from './animatedSnapScroll/AnimatedSnapScroll';

AppRegistry.registerComponent(appName, () => AnimatedSnapScroll);
