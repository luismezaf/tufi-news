import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text, Title, Paragraph, IconButton } from "react-native-paper";
import { format } from "date-fns";
import { Article } from "../../models/article.model";
import { es } from "date-fns/locale";
import { useFavoriteStore } from "../../stores/favorite.store";

type ArticleItemProps = {
  article: Article;
  onPress?: () => void;
};

export default function ArticleItem(props: ArticleItemProps) {
  const { toggleFavorite, isFavorite } = useFavoriteStore();

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Title style={styles.title}>{props.article.title}</Title>
          {styles.description && (
            <Paragraph numberOfLines={2} style={styles.description}>
              {props.article.description}
            </Paragraph>
          )}
          {props.article.author && (
            <Text style={styles.author}>{props.article.author}</Text>
          )}
          <Text style={styles.date}>
            {format(props.article.publishedAt, "PPP", { locale: es })}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: props.article.urlToImage }}
            style={styles.image}
          />
          <View style={styles.heartButtonContainer}>
            <IconButton
              icon={isFavorite(props.article) ? "heart" : "heart-outline"}
              iconColor="tomato"
              size={24}
              onPress={() => toggleFavorite(props.article)}
              style={styles.heartButton}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
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
    borderRadius: 8,
    width: 100,
    height: 100,
    backgroundColor: "grey",
  },
  heartButton: {
    marginTop: 8,
  },
  heartButtonContainer: {
    width: 100,
    display: "flex",
    alignItems: "flex-end",
  },
});
