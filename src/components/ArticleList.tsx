import { Text } from "react-native-paper";
import { FetchParams, useGetArticles } from "../../queries/article.query";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSearchStore } from "../../stores";
import ArticleListRender from "./ArticleListRender";

type ArticleListProps = {
  defaultParams?: FetchParams;
};

export default function ArticleList(props: ArticleListProps) {
  const {
    articles,
    isLoadingArticles,
    loadArticles,
    loadArticlesNextPage,
    saerchArticles,
    loadingArticlesError,
    hasArticlesNextPage,
  } = useGetArticles({
    defaultParams: props.defaultParams,
    endpoint: "top-headlines",
  });

  const { searchValue } = useSearchStore();

  useEffect(() => {
    saerchArticles(searchValue);
  }, [searchValue]);

  useEffect(() => {
    console.log("# loading articles from...", props.defaultParams?.category);
    loadArticles();
  }, []);

  return (
    <ArticleListRender
      articles={articles}
      errorMessage={loadingArticlesError?.response?.data.message || ""}
      loading={articles.length === 0 && isLoadingArticles}
      onEndReached={loadArticlesNextPage}
      ListFooterComponent={
        <View style={styles.endListMessageContainer}>
          <Text style={styles.endListMessage}>
            {hasArticlesNextPage
              ? "Cargando más noticias..."
              : "Fin del listado"}
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: "100%",
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    marginBottom: 36,
  },
  loadingItemContainer: {
    padding: 16,
  },
  endListMessageContainer: {
    display: "flex",
    alignItems: "center",
  },
  endListMessage: {
    color: "grey",
  },
});
