/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabParamList } from '../navigation/types';
import ProfileScreen from './ProfileScreen';
import PizzaMenuScreen from './PizzaMenuScreen';
import CartScreen from './CartScreen';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import FontAwesome from '@react-native-vector-icons/fontawesome';

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen 
        name="Pizza" 
        component={PizzaMenuScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-pizza" size={size} color={color} />
          ),
          headerTitle: 'Pizza Menu',
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-cart" size={size} color={color} />
          ),
          headerTitle: 'Your Cart',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
          headerTitle: 'Your Profile',
        }}
      />
    </Tab.Navigator>
  );
}