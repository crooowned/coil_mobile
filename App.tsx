// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage } from './src/pages/auth/LoginPage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { IndexPage } from './src/pages/home/IndexPage';
import { LoginOrRegisterPage } from './src/pages/auth/LoginOrRegisterPage';
import { RegisterPage } from './src/pages/auth/RegisterPage';
import DriveDetailPage from './src/pages/home/drives/DriveDetail';
import SetupAccountPage from './src/pages/home/SetupAccountPage';

const Stack = createNativeStackNavigator();
export const UserContext = React.createContext<FirebaseAuthTypes.User|null>(null);
function App() {

  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);
  
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} >
        {user ? (
            <>
            <Stack.Screen name="Index" component={IndexPage} />
            <Stack.Screen name="DriveDetails" component={DriveDetailPage} />
            <Stack.Screen name="ChargeDetails" component={IndexPage} />
            <Stack.Screen name="SetupAccount" component={SetupAccountPage} />
            </>
          ) : (
            <>
            <Stack.Screen name="LoginOrRegister" component={LoginOrRegisterPage}/>
            <Stack.Screen name="Login" component={LoginPage}/>
            <Stack.Screen name="Register" component={RegisterPage}/>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;