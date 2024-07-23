import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, Pressable } from 'react-native';
import MiPerfil from '../views/MiPerfil';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ usuarioDatos, navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.TabBar,
      }}>
      <Tab.Screen
        name="MiPerfil"
        component={MiPerfil}
        initialParams={{ usuarioDatos }}
        options={{
          tabBarButton: ({ accessibilityState, children, onPress }) => (
            <Pressable
              onPress={() => {navigation={navigation}; }}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>🤾 Mi Perfil</Text>
            </Pressable>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  TabBar: {
    height: 50,
    width: '100%',
    marginBottom: 40,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabNavigator;
