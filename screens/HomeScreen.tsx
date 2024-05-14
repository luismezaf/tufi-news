import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ArticleCategory } from "../queries/article.query";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";
import ArticleList from "../src/components/ArticleList";
import { Text, Searchbar } from "react-native-paper";
import { useSearchStore } from "../stores";

const ListArticlesByCategory = (category: ArticleCategory) => (
  <View style={styles.scene}>
    <ArticleList defaultParams={{ category }} />
  </View>
);

const renderScene = SceneMap({
  general: () => ListArticlesByCategory("general"),
  technology: () => ListArticlesByCategory("technology"),
  entertainment: () => ListArticlesByCategory("entertainment"),
  health: () => ListArticlesByCategory("health"),
  science: () => ListArticlesByCategory("science"),
  sports: () => ListArticlesByCategory("sports"),
  business: () => ListArticlesByCategory("business"),
});

export default function HomeScreen() {
  const { searchValue, setSearchValue } = useSearchStore();

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "general", title: "General" },
    { key: "technology", title: "Tecnología" },
    { key: "entertainment", title: "Entretenimiento" },
    { key: "health", title: "Salud" },
    { key: "science", title: "Ciencia" },
    { key: "sports", title: "Deportes" },
    { key: "business", title: "Empresas" },
  ]);

  return (
    <>
      {/* TITLE */}
      <View style={styles.textContainer}>
        <Text variant="displaySmall">
          TuFi <Text style={styles.title}>News</Text>
        </Text>
      </View>

      {/* SEARCHER */}
      <View style={styles.searchBarContainer}>
        <Searchbar
          placeholder="Buscar noticias..."
          onChangeText={setSearchValue}
          value={searchValue}
          style={styles.searchBar}
        />
      </View>

      {/* LIST */}
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={{ backgroundColor: "tomato" }}
            style={{ backgroundColor: "white" }}
            labelStyle={{ color: "black" }}
            tabStyle={{ width: "auto" }}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleHeader: {
    color: "grey",
  },
  title: {
    fontWeight: "bold",
    color: "tomato",
  },
  textContainer: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  searchBar: {
    backgroundColor: "#f0f0f0",
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "white",
  },
});
