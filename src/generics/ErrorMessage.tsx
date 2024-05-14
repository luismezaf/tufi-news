import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, IconButton } from "react-native-paper";

type ErrorMessageProps = {
  message: string;
};

const translate = [
  {
    from: "You have made too many requests recently. Developer accounts are limited to 100 requests over a 24 hour period (50 requests available every 12 hours). Please upgrade to a paid plan if you need more requests.",
    to: "Has hecho demasiadas solicitudes recientemente. Las cuentas de desarrollador están limitadas a 100 solicitudes cada 24 horas.",
  },
];

export default function ErrorMessage(props: ErrorMessageProps) {
  const translatedMessage =
    translate.find((t) => t.from === props.message)?.to || props.message;

  return (
    <View style={styles.content}>
      <IconButton icon="alert-circle" iconColor="tomato" size={50} />
      <View style={styles.textContainer}>
        <Text style={styles.ups}>Ups...</Text>
        <Text style={styles.message}>{translatedMessage}</Text>
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
