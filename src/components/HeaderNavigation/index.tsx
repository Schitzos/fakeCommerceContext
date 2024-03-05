import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Cart from '../Cart';
import IconBack from '../../../assets/icon/icon-chevron-left.svg';
import {useNavigation} from '@react-navigation/native';

export default function HeaderNavigation({
  backShown = false,
  title,
}: {
  backShown?: boolean;
  title?: string;
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.baseLayout}>
      <SafeAreaView />
      <View style={styles.headerlayout}>
        <View style={styles.title}>
          {backShown && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconBack width={24} height={24} color={'black'} />
            </TouchableOpacity>
          )}
          <Text style={styles.appName}>{title}</Text>
        </View>
        <Cart />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  baseLayout: {
    backgroundColor: 'white',
  },
  headerlayout: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  appName: {
    fontSize: 16,
  },
  title: {
    fontSize: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  floatingCart: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '400',
    width: '100%',
    backgroundColor: 'red',
  },
});
