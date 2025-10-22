import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import SetupScreen from './screens/SetupScreen';
import DashboardScreen from './screens/DashboardScreen';
import IncomeOptimizationScreen from './screens/IncomeOptimizationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{title: 'Automated Income Systems'}}
        />
        <Stack.Screen
          name="Setup"
          component={SetupScreen}
          options={{title: 'Einkommens-Setup'}}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{title: 'Dashboard'}}
        />
        <Stack.Screen
          name="Optimization"
          component={IncomeOptimizationScreen}
          options={{title: 'Optimierung'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
