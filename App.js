import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './src/screens/MapScreen';
import Home from './src/screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

export default function App() {
  return (<>
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Flush Finder') {
                  iconName = focused
                    ? 'home-outline'
                    : 'home-outline';
                } else if (route.name === 'Toilets Near You') {
                  iconName = focused ? 'map-outline' : 'map-outline';
                }
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}>
          <Tab.Screen name="Flush Finder" component={Home} />
          <Tab.Screen name="Toilets Near You" component={MapScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      </>
  )
}