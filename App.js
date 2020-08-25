/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {AppState, StyleSheet} from 'react-native';
import {
  Provider as PaperProvider,
  ActivityIndicator,
  Colors,
  DefaultTheme,
} from 'react-native-paper';
import AppNavigator from './AppNavigator';
import AppService from './service/AppService';
import SplashScreen from 'react-native-splash-screen';

type State = {|
  appState: ?string,
  databaseIsReady: boolean,
|};
class App extends React.Component<$FlowFixMeProps, State> {
  constructor(props: $FlowFixMeProps) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      databaseIsReady: false,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    // App is starting up
    this._appIsNowRunningInForeground();
    this._setAppStateActive();
    // Listen for app state changes
    AppState.addEventListener('change', this._handleAppStateChange.bind(this));
  }

  componentWillUnmount() {
    // Remove app state change listener
    AppState.removeEventListener(
      'change',
      this._handleAppStateChange.bind(this),
    );
  }

  _setAppStateActive() {
    this.setState({
      appState: 'active',
    });
  }

  _handleAppStateChange(nextAppState: string) {
    if (
      this.state.appState &&
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // App has moved from the background (or inactive) into the foreground
      this._appIsNowRunningInForeground();
    } else if (
      this.state.appState === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      // App has moved from the foreground into the background (or become inactive)
      this._appHasGoneToTheBackground();
    }
    this.setState({appState: nextAppState});
  }

  _appIsNowRunningInForeground() {
    console.log('App is now running in the foreground!');
    return AppService.open().then(() =>
      this.setState({
        databaseIsReady: true,
      }),
    );
  }

  _appHasGoneToTheBackground() {
    console.log('App has gone to the background.');
    AppService.close();
  }

  render() {
    return (
      <>
        <PaperProvider theme={theme}>
          {this.state.databaseIsReady ? (
            <AppNavigator />
          ) : (
            <ActivityIndicator
              style={styles.activity}
              animating={true}
              color={Colors.blue300}
            />
          )}
        </PaperProvider>
      </>
    );
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#203878',
    accent: '#f8c018',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activity: {flex: 1, alignSelf: 'center'},
});

export default App;
