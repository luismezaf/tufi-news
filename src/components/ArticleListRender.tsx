import ArticleItem from "./ArticleItem";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import ArticleItemLoading from "./ArticleItemLoading";
import { Article } from "../../models/article.model";
import ErrorMessage from "../generics/ErrorMessage";
import EmptyListMessage from "../generics/EmptyListMessage";
import { useHistoryStore } from "../../stores/history.store";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";

type ArticleListRenderProps = {
  articles: Article[];
  loading?: boolean;
  errorMessage?: string;
  onEndReached?: () => void;
  ListFooterComponent?: React.ReactElement;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ArticleDetail"
>;

export default function ArticleListRender(props: ArticleListRenderProps) {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { addArticleToHistory } = useHistoryStore();

  function handleOpenArticle(article: Article) {
    addArticleToHistory(article);
    navigation.navigate("ArticleDetail", { article });
  }

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      {props.loading ? (
        // Loading
        <>
          {new Array(5).fill(null).map((_, index) => (
            <View style={styles.loadingItemContainer} key={index}>
              <ArticleItemLoading />
            </View>
          ))}
        </>
      ) : props.errorMessage ? (
        // Error message
        <ErrorMessage message={props.errorMessage || ""} />
      ) : props.articles.length === 0 ? (
        <EmptyListMessage />
      ) : (
        // List of articles
        <>
          <FlatList
            data={props.articles}
            renderItem={(article) => (
              <View style={styles.itemContainer}>
                <ArticleItem
                  article={article.item}
                  onPress={() => handleOpenArticle(article.item)}
                />
              </View>
            )}
            contentContainerStyle={styles.listContainer}
            onEndReached={props.onEndReached}
            onEndReachedThreshold={0.7}
            ListFooterComponent={props.ListFooterComponent}
            ListFooterComponentStyle={{ padding: 0, margin: 0 }}
          />
        </>
      )}
    </GestureHandlerRootView>
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
