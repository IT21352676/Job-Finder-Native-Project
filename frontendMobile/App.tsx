// App.js - Fixed version with TypeScript types
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SeekerLoginScreen from "./app/(tabs)/authentication/loginseeker";
import PosterLoginScreen from "./app/(tabs)/authentication/loginposter";
import HomeScreen from "./app/screens/homescreen";

// Define your navigation stack parameter list
type RootStackParamList = {
  Home: undefined;
  "Job Seeker Login": undefined;
  "Job Poster Login": undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: "Welcome" }}
        />
        <Stack.Screen
          name="Job Seeker Login"
          component={SeekerLoginScreen}
          options={{ headerTitle: "Login as Job Seeker" }}
        />
        <Stack.Screen
          name="Job Poster Login"
          component={PosterLoginScreen}
          options={{ headerTitle: "Login as Job Poster" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
