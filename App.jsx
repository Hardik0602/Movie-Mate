import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home'
import Movie from './src/screens/Movie'
import Person from './src/screens/Person'
import Search from './src/screens/Search'
const Stack = createNativeStackNavigator();
function App() {
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Movie" component={Movie} />
            <Stack.Screen name="Person" component={Person} />
            <Stack.Screen name="Search" component={Search} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
}
export default App;