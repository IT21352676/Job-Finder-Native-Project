// HomeScreen.js - Fixed version with TypeScript types
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define your navigation stack parameter list
type RootStackParamList = {
  Home: undefined;
  "Job Seeker Login": undefined;
  "Job Poster Login": undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Seeker Login"
          onPress={() => navigation.navigate("Job Seeker Login")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Poster Login"
          onPress={() => navigation.navigate("Job Poster Login")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
});

export default HomeScreen;
