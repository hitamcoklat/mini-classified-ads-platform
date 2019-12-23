import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './screens/Home';
import ViewPagerPage from './screens/ViewPagerPage';
import DetailJasa from './screens/page/DetailJasa';
import AboutPage from './screens/page/About';

export default class App extends Component {
  render() {
    return <AppContainer />
  }
}

const AppNavigator = createStackNavigator(
  {
    // Home: Home,
    Home: Home,
    AboutPage: AboutPage,
    DetailJasa: DetailJasa,
    ViewPager: ViewPagerPage,
  },
  {
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);
