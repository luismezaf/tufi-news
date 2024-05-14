import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, IconButton } from "react-native-paper";

type EmptyListMessageProps = {
  message?: string;
};

export default function EmptyListMessage(props: EmptyListMessageProps) {
  return (
    <View style={styles.content}>
      <IconButton icon="help-circle" iconColor="tomato" size={50} />
      <View style={styles.textContainer}>
        <Text style={styles.ups}>Ups...</Text>
        <Text style={styles.message}>
          {props.message ||
            "Parece que no hay ningún artículo que mostrar aquí..."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  ups: {
    fontSize: 36,
    color: "#444",
  },
  message: {
    fontSize: 16,
    color: "#444",
    paddingVertical: 8,
    textAlign: "center",
  },
  code: {
    fontSize: 14,
    color: "#d32f2f",
    marginTop: 4,
  },
});
