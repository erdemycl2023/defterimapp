import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import FirmaListesiScreen from './src/screens/FirmaListesiScreen';
import EDefterListesiScreen from './src/screens/EDefterListesiScreen';
import YevmiyeScreen from './src/screens/YevmiyeScreen';
import MizanScreen from './src/screens/MizanScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('Login');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const { sessionToken } = JSON.parse(storedData);
        if (sessionToken) {
          setInitialRoute('Dashboard');
        }
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // veya bir loading ekranı gösterebilirsiniz
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Dashboard" 
              component={DashboardScreen}
              options={{
                headerLeft: null,
                title: 'Dashboard',
              }}
            />
            <Stack.Screen 
              name="FirmaListesi" 
              component={FirmaListesiScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="EDefterListesi" 
              component={EDefterListesiScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Yevmiye" 
              component={YevmiyeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Mizan" 
              component={MizanScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
