import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ArticleDetailScreen from "../screens/ArticleDetailScreen";
import TabNavigator from "./TabNavigator";
import { Article } from "../models/article.model";

export type RootStackParamList = {
  Tabs: undefined;
  ArticleDetail: { article: Article };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
