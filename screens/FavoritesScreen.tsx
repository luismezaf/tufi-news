import React from "react";
import { View, StyleSheet } from "react-native";
import { useFavoriteStore } from "../stores/favorite.store";
import ActicleListRender from "../src/components/ArticleListRender";
import { Searchbar, Text } from "react-native-paper";
import { useSearchStore } from "../stores";

export default function FavoritesScreen() {
  const { favorites } = useFavoriteStore();
  const { searchValue, setSearchValue } = useSearchStore();

  return (
    <>
      {/* TITLE */}
      <View style={styles.textContainer}>
        <Text variant="displaySmall">
          Tus <Text style={styles.title}>Favoritos</Text>
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
      <ActicleListRender articles={favorites} />
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
