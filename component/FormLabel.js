/**
 * @format
 * @flow
 */

import * as React from 'react';
import {Text, DefaultTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';

type StyleValue = {[key: string]: Object} | number | false | null;
type StyleProp = StyleValue | Array<StyleValue>;

const FormLabel = ({
  children,
  style,
}: {
  children: React.Node,
  style?: StyleProp,
}) => <Text style={[styles.itemText, styles.label, style]}>{children}</Text>;

export default FormLabel;

const styles = StyleSheet.create({
  itemText: {
    marginLeft: 8,
    marginTop: 15,
  },
  label: {
    color: DefaultTheme.colors.primary,
    fontSize: 14,
    marginBottom: 5,
  },
});
