/**
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {List, Appbar, Divider} from 'react-native-paper';
import AppService from '../service/AppService';
import Student from '../domain/Student';
import {Images} from '../asset';
import capitalize from '../util/capitalize';
import type {
  NavigationScreenProp,
  NavigationRoute,
  NavigationEventSubscription,
} from 'react-navigation';

type Props = $ReadOnly<{|
  navigation: NavigationScreenProp<NavigationRoute>,
|}>;
type State = {|
  data: Student,
  avatar: {
    [key: string]: any,
  },
|};
class DetailStudent extends Component<Props, State> {
  _sub: NavigationEventSubscription;
  constructor(props: Props) {
    super(props);
    this.state = {
      data: new Student(),
      avatar: {
        pria: Images.pria,
        wanita: Images.wanita,
      },
    };
  }

  componentDidMount() {
    this._loadData();
    this._sub = this.props.navigation.addListener(
      'didFocus',
      this._loadData.bind(this),
    );
  }

  componentWillUnmount() {
    this._sub.remove();
  }

  async _loadData() {
    try {
      let id = this.props.navigation.getParam<string>('id', 0);
      let data = await AppService.StudentService.findStudentById(+id);
      this.setState({data: data !== null ? data : new Student()});
    } catch (error) {}
  }

  _edit() {
    this.props.navigation.navigate('FormStudent', {
      isEdit: true,
      ...this.state.data.toJSON(),
    });
  }

  async _delete() {
    let id = this.props.navigation.getParam<string>('id', 0);
    try {
      await AppService.StudentService.deleteStudentById(+id);
      this.props.navigation.goBack();
    } catch (error) {}
  }

  render() {
    const {data, avatar} = this.state;
    return (
      <>
        <Appbar>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content
            title={this.props.navigation.getParam<string>(
              'title',
              'Detail Siswa',
            )}
          />
          <Appbar.Action icon="pencil" onPress={this._edit.bind(this)} />
          <Appbar.Action icon="delete" onPress={this._delete.bind(this)} />
        </Appbar>
        <Image source={avatar[data.gender]} style={styles.avatar} />
        <List.Item
          title={data.fullName}
          left={(props) => <List.Icon {...props} icon="account-box" />}
        />
        <Divider />
        <List.Item
          title={data.mobilePhone}
          left={(props) => <List.Icon {...props} icon="phone" />}
        />
        <Divider />
        <List.Item
          title={capitalize(data.gender)}
          left={(props) => <List.Icon {...props} icon="label" />}
        />
        <Divider />
        <List.Item
          title={data.grade ? data.grade.toUpperCase() : data.grade}
          left={(props) => <List.Icon {...props} icon="stairs" />}
        />
        <Divider />
        <List.Item
          title={data.address}
          left={(props) => <List.Icon {...props} icon="map-marker" />}
        />
        <Divider />
        <List.Item
          title={data.hobbies.map((val) => capitalize(val)).join(', ')}
          left={(props) => <List.Icon {...props} icon="heart" />}
        />
        <Divider />
      </>
    );
  }
}

export default DetailStudent;

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginVertical: 20,
  },
});
