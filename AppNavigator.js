/**
 * @format
 * @flow
 */
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './screen/Home';
import DetailStudent from './screen/DetailStudent';
import formLogin from './screen/FormLogin';
import type {NavigationState} from 'react-navigation';
import FormStudent from './screen/FormStudent';

const AuthNavigator = createStackNavigator(
  {
    Login: formLogin,
  },
  {
    headerMode: 'none',
  },
);

const StudentNavigator = createStackNavigator(
  {
    Home: {screen: Home},
    DetailStudent: {
      screen: DetailStudent,
    },
    FormStudent: {screen: FormStudent},
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

const AppNavigator = createSwitchNavigator(
  {
    App: StudentNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer<NavigationState, {}>(AppNavigator);
