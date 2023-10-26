import React from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import Scanner from "./screens/Scanner";
import Home from "./screens/Home";
import List from "./screens/List";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Redu Logistiikka roskat" component={Home} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="List" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default App;
