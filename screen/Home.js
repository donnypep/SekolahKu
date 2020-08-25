/**
 *
 * @format
 * @flow
 */
import color from 'color';
import React, {Component} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {
  Appbar,
  Divider,
  List,
  Text,
  DefaultTheme,
  Snackbar,
  TextInput,
  Avatar,
} from 'react-native-paper';
import AppService from '../service/AppService';
import Student from '../domain/Student';
import {Images} from '../asset';
import type {Students} from '../domain/Student';
import type {
  NavigationScreenProp,
  NavigationRoute,
  NavigationEventSubscription,
} from 'react-navigation';

type State = {|
  data: Students,
  showToast: boolean,
  info: string,
  search: string,
|};
type Props = $ReadOnly<{|
  navigation: NavigationScreenProp<NavigationRoute>,
|}>;
export default class Home extends Component<Props, State> {
  _sub: NavigationEventSubscription;

  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      showToast: false,
      info: '',
      search: '',
    };
  }

  componentDidMount() {
    this._loadStudents();
    this._sub = this.props.navigation.addListener(
      'willFocus',
      this._loadStudents.bind(this),
    );
  }

  componentWillUnmount() {
    this._sub.remove();
  }

  async _loadStudents() {
    try {
      let students = await AppService.StudentService.findAllStudents(
        this.state.search,
      );
      let showToast = false;
      let info = '';
      if (students.length === 0) {
        showToast = true;
        info = 'Data belum ada';
      }
      this.setState({data: students, showToast, info});
    } catch (error) {
      console.log('error ', error);
      this.setState({showToast: true, info: 'Something broke!'});
    }
  }

  _handleSearch() {
    this._loadStudents();
  }

  _handleCreate() {
    this.props.navigation.navigate('FormStudent', {title: 'Tambah Siswa'});
  }

  _handleClickItem(item: Student, index: number) {
    this.props.navigation.navigate('DetailStudent', {id: item.id});
  }

  render() {
    const {data, showToast, info, search} = this.state;
    return (
      <>
        <Snackbar
          visible={showToast}
          duration={Snackbar.DURATION_SHORT}
          onDismiss={() => this.setState({showToast: false, info: ''})}>
          {info}
        </Snackbar>
        <FlatList
          ListHeaderComponent={
            <>
              <Appbar>
                <Appbar.Content title="Sekolahku" />
                <Appbar.Action
                  icon="plus"
                  onPress={this._handleCreate.bind(this)}
                />
              </Appbar>
              <TextInput
                autoCapitalize="none"
                label="Cari..."
                value={search}
                onChangeText={(text) => this.setState({search: text})}
                onSubmitEditing={() => this._handleSearch()}
              />
            </>
          }
          data={data}
          renderItem={({item, index}) => (
            <List.Item
              title={item.fullName}
              description={item.gender}
              left={(props) => (
                <Avatar.Image
                  {...props}
                  size={50}
                  source={Images[item.gender]}
                />
              )}
              right={(props) => {
                return (
                  <View style={[styles.itemColumn, props.style]}>
                    <Text style={styles.rightText}>
                      {item.grade.toUpperCase()}
                    </Text>
                    <Text style={[styles.subtitle, styles.rightText]}>
                      {item.mobilePhone}
                    </Text>
                  </View>
                );
              }}
              onPress={() => this._handleClickItem(item, index)}
            />
          )}
          keyExtractor={(item, index) => item.id.toString()}
          ItemSeparatorComponent={() => <Divider />}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  itemColumn: {
    // flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  subtitle: {
    fontSize: 12,
  },
  rightText: {
    color: color(DefaultTheme.colors.text).alpha(0.54).rgb().string(),
  },
});
