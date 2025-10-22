import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SetupSequenceScreen from './screens/SetupSequenceScreen';
import IncomeTrackingScreen from './screens/IncomeTrackingScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Automated Income Systems' }}
        />
        <Stack.Screen 
          name="SetupSequence" 
          component={SetupSequenceScreen}
          options={{ title: 'Income Setup Sequence' }}
        />
        <Stack.Screen 
          name="IncomeTracking" 
          component={IncomeTrackingScreen}
          options={{ title: 'Income Tracking' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
