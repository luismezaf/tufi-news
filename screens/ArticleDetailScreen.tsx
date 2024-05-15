import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { IconButton, Paragraph, Text, Title } from "react-native-paper";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Image, View, StyleSheet, Linking, Alert } from "react-native";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useFavoriteStore } from "../stores/favorite.store";
import { TouchableOpacity } from "react-native-gesture-handler";

type ArticleDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ArticleDetail"
>;

export default function ArticleDetailScreen() {
  const route = useRoute<ArticleDetailScreenRouteProp>();
  const navigation = useNavigation();
  const { article } = route.params;
  const { isFavorite, toggleFavorite } = useFavoriteStore();

  function handleOpenArticleUrl() {
    const url = article.url;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert(`No se puede abrir la el enlace a la noticia.`);
        }
      })
      .catch((err) =>
        console.error("Error al intentar abrir el enlace a la noticia", err)
      );
  }

  return (
    <>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <IconButton
          icon="arrow-left"
          iconColor="black"
          size={24}
          onPress={() => navigation.goBack()}
          style={[styles.goBackButton]}
        />

        <IconButton
          icon={isFavorite(article) ? "heart" : "heart-outline"}
          iconColor="tomato"
          size={24}
          onPress={() => toggleFavorite(article)}
          style={styles.heartButton}
        />

        <Image source={{ uri: article.urlToImage }} style={styles.image} />

        <View style={styles.textContainer}>
          {/* HEADER INFO */}
          <Title style={styles.title}>{article.title}</Title>
          {styles.description && (
            <Paragraph style={styles.description}>
              {article.description}
            </Paragraph>
          )}
          {article.author && (
            <Text style={styles.author}>{article.author}</Text>
          )}
          <Text style={styles.date}>
            {format(article.publishedAt, "PPP", { locale: es })}
          </Text>

          {/* CONTET */}
          <View style={styles.contentContainer}>
            <Text>{article.content}</Text>
          </View>

          {/* SEE THE FULL CONTENT */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.seeAllBtn}
              onPress={handleOpenArticleUrl}
            >
              <Text variant="titleSmall" style={styles.seeAllBtnLabel}>
                Ver la notica completa{" "}
              </Text>
              {article.source.name && (
                <Text variant="titleSmall" style={styles.seeAllBtnLabel}>
                  en {article.source.name}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 32,
  },
  contentContainer: {
    marginTop: 16,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 22,
  },
  description: {
    marginBottom: 4,
    lineHeight: 16,
  },
  author: {
    color: "#757575",
    fontSize: 14,
  },
  date: {
    color: "#757575",
    fontSize: 14,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    backgroundColor: "grey",
  },
  heartButton: {
    marginTop: 8,
    right: 0,
    position: "absolute",
    zIndex: 2000,
    backgroundColor: "white",
  },
  goBackButton: {
    marginTop: 8,
    position: "absolute",
    zIndex: 2000,
    backgroundColor: "white",
  },
  seeAllBtn: {
    borderRadius: 40,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "tomato",
  },
  seeAllBtnLabel: {
    color: "white",
  },
});
